import { api } from "~/trpc/react";
import { useState } from "react";
import { Textarea } from "./shadcn/textarea";
import { Button } from "./shadcn/button";
import { type Task } from "@prisma/client";

export function TaskEditor({ task }: { task: Task }) {
  const utils = api.useUtils();

  const [newDescription, setNewDescription] = useState<string>(
    task.description,
  );

  const { mutate: taskSaveMutation, isPending: isSavePending } =
    api.task.update.useMutation({
      onSuccess: () => {
        void utils.card.invalidate();
        void utils.task.getByCardId.invalidate();
      },
    });

  const { mutate: taskDeleteMutation, isPending: isDeletePending } =
    api.task.delete.useMutation({
      onSuccess: () => {
        void utils.card.invalidate();
        void utils.task.getByCardId.invalidate();
      },
    });

  const updateTask = () => {
    if (newDescription.trim().length === 0) return;

    taskSaveMutation({ description: newDescription, id: task.id });
  };

  const deleteTask = () => {
    if (newDescription.trim().length === 0) return;

    taskDeleteMutation(task.id);
  };

  return (
    <div
      className="flex w-full justify-between"
      key={task.id}
      style={{ marginBottom: "20px" }}
    >
      <Textarea
        placeholder={task.description}
        value={newDescription}
        onChange={(e) => {
          setNewDescription(e.target.value);
        }}
      />
      <div className="ml-5 w-[85px]">
        <Button
          disabled={isSavePending}
          className="mb-2 w-[85px]"
          onClick={updateTask}
        >
          {isSavePending ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={deleteTask}
          disabled={isDeletePending}
          className="w-[85px] bg-red-500 hover:bg-red-700"
        >
          {isDeletePending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
