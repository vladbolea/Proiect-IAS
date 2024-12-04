"use client";

import { api } from "~/trpc/react";
import { CardItem } from "./card";

export default function CardList({ boardId }: { boardId: string }) {
  const { data: cards } = api.card.getAllByBoardId.useQuery(boardId, {
    staleTime: 0,
  });

  return (
    <>
      <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 items-start">
        {cards ? cards.map((c) => (
          <CardItem key={c.id} card={c} />
        )): <></>}
      </div>
    </>
  );
}
