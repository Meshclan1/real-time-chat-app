import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import { Card } from "@/components/ui/card";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

// truncate reduces any words longer than the div into '...'

const Request = ({ id, imageUrl, username, email }: Props) => {
  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate"></div>
    </Card>
  );
};

export default Request;
