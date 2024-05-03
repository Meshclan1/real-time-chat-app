"use client";
import React from "react";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { useForm } from "react-hook-form";
import { useMutationState } from "@/hooks/useMutation";
import { useQuery } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const createGroupFormSchema = z.object({
  name: z.string().min(1, { message: "This field can't be empty" }),
  members: z
    .string()
    .array()
    .min(1, { message: "You must select at least 1 friend" }),
});

const CreateGroupDialog = (props: Props) => {
  const friends = useQuery(api.friends.get);

  const { mutate: createGroup, pending } = useMutationState(
    api.conversation.createGroup
  );

  const form = useForm<z.infer<typeof createGroupFormSchema>>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  return <div>CreateGroupDialog</div>;
};

export default CreateGroupDialog;
