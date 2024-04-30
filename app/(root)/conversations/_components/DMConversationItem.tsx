import { Id } from "@/convex/_generated/dataModel";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutationState } from "@/hooks/useMutation";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
};

const DMConversationItem = ({ id, imageUrl, username }: Props) => {
  return (
    <Link href={`/conversations/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flec-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="text-sm text-muted-foreground truncate">
              Start the conversation!
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DMConversationItem;
