"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export const DeleteBoard = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const session = useSession();

  const { mutate, isPending } = api.board.delete.useMutation({
    onSuccess: () => {
      void utils.board.invalidate();
      router.push("/");
    },
  });

  const deleteBoard = () => {
    mutate(boardId);
  };

  return (
    <>
      {session.status !== "unauthenticated" && session.status !== "loading" ? (
        <div>
          <button
            className="rounded-full bg-red-400 px-10 py-2 font-semibold text-white no-underline transition-all hover:bg-red-600"
            onClick={deleteBoard}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete Board"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
