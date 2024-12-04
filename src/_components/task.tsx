"use client";

import { Card, CardDescription, CardHeader } from "./shadcn/card";
import { type Task } from "@prisma/client";

export function TaskItem({ task }: { task: Task }) {
  return (
    <Card className="w-full transition-all hover:cursor-pointer hover:border-gray-700 hover:bg-gray-950">
      <CardHeader>
        <CardDescription>{task.description ?? ""}</CardDescription>
      </CardHeader>
    </Card>
  );
}
