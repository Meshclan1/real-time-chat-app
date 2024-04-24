// useParams is used to get the dynamic id
// useMemo is used to create a variable that only updates when another variable updates

import { useMemo } from "react";
import { useParams } from "next/navigation";

export const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(
    () => params?.conversationId || ("" as string),
    [params?.conversationId]
  );
  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return {
    isActive,
    conversationId,
  };
};
