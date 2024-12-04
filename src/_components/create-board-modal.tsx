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

export function CreateBoardModal({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const utils = api.useUtils();

  const { mutate, isPending: isPendingBoardCreation } =
    api.board.create.useMutation({
      onSuccess() {
        void utils.board.invalidate();
        setOpenModal(false);
        setTitle("");
        setDescription("");
      },
    });

  const submitData = () => {
    if (!(title.trim().length > 0 && description.trim().length > 0)) {
      return;
    }

    mutate({
      title,
      description,
    });


  };

  return (
    <>
      {openModal && (
        <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-95 align-middle">
          <Card className="h-[270px] w-[350px]">
            <CardHeader>
              <CardTitle>Create board</CardTitle>
              <CardDescription>Create a board for your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      placeholder="The title of your board"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.currentTarget.value);
                      }}
                    />
                    <Input
                      id="name"
                      placeholder="The description of your board"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.currentTarget.value);
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
              <Button onClick={submitData} disabled={isPendingBoardCreation}>
                {isPendingBoardCreation ? "Creating..." : "Create"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
