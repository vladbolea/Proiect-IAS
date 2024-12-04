"use client";

import { Card, CardHeader, CardTitle } from "./shadcn/card";
import { Dispatch, SetStateAction, useState } from "react";
import type { Card as CardEntity, Task } from "@prisma/client";
import { api } from "~/trpc/react";
import { TaskItem } from "./task";
import { CreateTaskModal } from "./create-task-modal";

export function CardItem({ card }: { card: CardEntity }) {
  const { data: tasks } = api.task.getByCardId.useQuery(card.id, {
    staleTime: 0,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Card className="flex min-w-36 flex-col">
        <Card
          className="w-full transition-all hover:cursor-pointer hover:border-gray-700 hover:bg-gray-950"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
        </Card>
        <div className="mt-5">
          {tasks ? tasks.map((t) => <TaskItem key={t.id} task={t} />) : <></>}
        </div>
      </Card>
      <CreateTaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        cardData={card as CardEntity & { tasks: Task[] }}
      />
    </>
  );
}
