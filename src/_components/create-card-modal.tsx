"use client";

import * as React from "react";

import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { Input } from "./shadcn/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function CreateCardModal({
  openModal,
  setOpenModal,
  boardId,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
}) {
  const [title, setTitle] = React.useState<string>("");
  const utils = api.useUtils();

  const { mutate, isPending } = api.card.create.useMutation({
    onSuccess() {
      void utils.card.invalidate();
      setOpenModal(false);
    },
  });

  const submitData = () => {
    if (!(title.trim().length > 0)) {
      return;
    }

    mutate({
      title,
      boardId,
    });

    setTitle("");
  };

  return (
    <>
      {openModal && (
        <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-[95%] align-middle">
          <Card className="h-[270px] w-[350px]">
            <CardHeader>
              <CardTitle>Create card</CardTitle>
              <CardDescription>Create a card for your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  submitData();
                }}
              >
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      placeholder="The title of your card"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5"></div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-black"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  submitData();
                }}
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
