import ItemList from "@/components/shared/item-list/ItemList";
import React from "react";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";

type Props = {};

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title="Friends">Friends Page</ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
