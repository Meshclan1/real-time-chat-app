import { Id } from "@/convex/_generated/dataModel";
import React from "react";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
  return <div>Request</div>;
};

export default Request;
