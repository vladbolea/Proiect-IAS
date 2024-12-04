"use client"

import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./shadcn/card";

export function Board({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {

  const router = useRouter();

  return (
    <Card
      className="min-w-36 transition-all hover:cursor-pointer hover:border-gray-700 hover:bg-gray-950"
      onClick={() => {
        router.push(`/boards/${id}`)
      }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ?? ""}</CardDescription>
      </CardHeader>
    </Card>
  );
}
