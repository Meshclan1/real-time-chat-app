"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useConversation } from "@/hooks/useConversation";
import { Id } from "@/convex/_generated/dataModel";

type Props = {};

const Body = (props: Props) => {
  const { conversationId } = useConversation();

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });

  return (
    <div className="flex-1 w-full flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      Chat Body
    </div>
  );
};

export default Body;
