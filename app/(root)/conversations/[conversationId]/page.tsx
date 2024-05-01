"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import Header from "./_components/Header";
import Body from "./_components/_body/Body";
import ChatInput from "./_components/_input/ChatInput";
import { useState } from "react";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember.imageURL
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
                {
                  label: "Remove friend",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
            : []
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
