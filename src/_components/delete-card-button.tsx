"use client";

import { api } from "~/trpc/react";

export const DeleteCardButton = ({ cardId }: { cardId: string }) => {
  const utils = api.useUtils();

  const { mutate, isPending } = api.card.delete.useMutation({
    onSuccess: () => {
      void utils.card.invalidate();
    },
  });

  const deleteCard = () => {
    mutate(cardId);
  };

  return (
    <div>
      <button
        className="mr-5 rounded-full bg-red-500 px-4 py-2 font-semibold text-white no-underline transition-all hover:bg-red-600"
        onClick={deleteCard}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete card"}
      </button>
    </div>
  );
};
