"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = React.PropsWithChildren<{}>;

const addFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field cannot be empty" })
    .email("Please enter a valid email"),
});

const AddFriendDialog = (props: Props) => {
  const form = useForm<z.infer<typeof addFriendFormSchema>>({
    resolver: zodResolver(addFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger>
              <UserPlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </Dialog>
  );
};

export default AddFriendDialog;
