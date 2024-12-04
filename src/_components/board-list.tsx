"use client"

import { api } from "~/trpc/react";
import { Board } from "../_components/board";

export default   function BoardList() {
  const { data } = api.board.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false, // Prevent automatic refetch on focus
    staleTime: 0, // Data is always considered stale
  });

  if (data?.length) {
    return (
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((b) => (
          <Board
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
          />
        ))}
      </div>
    );
  }
}
