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
import { api } from "~/trpc/react";
import { Textarea } from "./shadcn/textarea";
import type { Card as CardEntity, Task } from "@prisma/client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { DeleteCardButton } from "./delete-card-button";
import { TaskEditor } from "./task-editor";
import { useSession } from "next-auth/react";

export function CreateTaskModal({
  cardData,
  openModal,
  setOpenModal,
}: {
  cardData: CardEntity & { tasks: Task[] };
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [description, setDescription] = useState<string>("");
  const utils = api.useUtils();
  const session = useSession();

  const { data: tasks } = api.task.getByCardId.useQuery(cardData.id, {
    staleTime: 0,
  });

  const cardMutation = api.task.create.useMutation({
    onSuccess() {
      void utils.card.invalidate();
      void utils.task.invalidate();
    },
  });

  const { data: userData } = api.users.getById.useQuery(
    cardData?.ownerId ? cardData.ownerId : "",
  );

  const submitData = async () => {
    if (!(description.trim().length > 0 && cardData?.boardId)) {
      return;
    }

    cardMutation.mutate({ cardId: cardData.id, description });

    setDescription("");
  };

  return (
    <>
      {openModal &&
        session.status !== "unauthenticated" &&
        session.status !== "loading" && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <Card className="relative max-h-[90vh] w-[550px] overflow-hidden rounded-lg bg-black shadow-lg">
              {/* Wrapping Modal Content in a Scrollable Container */}
              <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
                {/* Header Section */}
                <div className="flex items-center justify-between border-b p-4">
                  <CardHeader>
                    <CardTitle>{cardData.title}</CardTitle>
                    <CardDescription>
                      Created by {userData?.name} at{" "}
                      {cardData.createdAt.getUTCDate()}/
                      {cardData.createdAt.getUTCMonth()}/
                      {cardData.createdAt.getUTCFullYear()},{" "}
                      {cardData.createdAt.getHours()}:
                      {cardData.createdAt.getMinutes()}
                    </CardDescription>
                  </CardHeader>
                  <DeleteCardButton key={cardData.id} cardId={cardData.id} />
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto p-4">
                  <CardHeader>
                    <CardTitle>Create task</CardTitle>
                    <CardDescription>
                      Create a task for your board
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await submitData();
                      }}
                    >
                      <div className="grid w-full items-center gap-4">
                        <Textarea
                          id="description"
                          placeholder="The description of your task"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.currentTarget.value);
                          }}
                        />
                      </div>

                      <div className="mt-5">
                        <CardFooter className="m-0 flex justify-between p-0">
                          <Button
                            variant="outline"
                            className="m-0 text-black"
                            onClick={() => {
                              setOpenModal(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={submitData}>Create</Button>
                        </CardFooter>
                      </div>
                    </form>
                  </CardContent>
                  <hr className="w-full" />

                  <CardHeader>
                    {cardData.tasks ? (
                      cardData.tasks.map((t: Task) => (
                        <TaskEditor key={t.id} task={t} />
                      ))
                    ) : (
                      <></>
                    )}
                  </CardHeader>
                </div>
              </div>
            </Card>
          </div>
        )}
    </>
  );
}
