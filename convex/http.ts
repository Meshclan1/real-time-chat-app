// HTTP endpoint(s) connects Clerk and Convex. It accepts what is sent from the webhook & will call the 'create' function.

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
// import type { WebhookEvent } from "@clerk/nextjs/server";
import { internal } from "./_generated/api";
import { WebhookEvent } from "@clerk/backend";

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    return event;
  } catch (error) {
    console.error("Clerk webhook request could not be verified");
    return;
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);

  if (!event) {
    return new Response("Could not validate Clerk payload", {
      status: 400,
    });
  }
  switch (event.type) {
    case "user.created":
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id,
      });

      if (user) {
        console.log(`Updating user ${event.data.id} with: ${event.data} `);
      }

    case "user.updated": {
      console.log("Creating/Updating User:", event.data.id);

      await ctx.runMutation(internal.user.create, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageURL: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });

      break;
    }
    default: {
      console.log("Clerk webhook event not supported", event.type);
    }
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

// whenever a user signs up in clerk, it will send a request to this endpoint in convex
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

// Define additional routes

// http.route({
//   path: "/getMessagesByAuthor",
//   method: "GET",
//   handler: getByAuthor,
// });

// Define a route using a path prefix

// http.route({
//   // Will match /getAuthorMessages/User+123 and /getAuthorMessages/User+234 etc.
//   pathPrefix: "/getAuthorMessages/",
//   method: "GET",
//   handler: getByAuthorPathSuffix,
// });

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
