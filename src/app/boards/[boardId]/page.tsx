import CardList from "~/_components/card-list";
import { CreateCardButton } from "~/_components/create-card-button";
import { DeleteBoard } from "~/_components/delete-board-button";
import { api } from "~/trpc/server";

export default async function BoardId({
  params,
}: {
  params: { boardId: string };
}) {
  const { boardId } = params;

  const data = await api.board.getById(boardId);

  if (!data) {
    return <></>;
  }

  const user = await api.users.getById(data.ownerId);

  return (
    <div className="pb-10 text-white">
      <div className="mb-6 flex w-full items-center justify-between border-b-2 pb-6">
        <div className="">
          <h2 className="font-bold">{data?.title}</h2>
          <h3>{data?.description}</h3>
          <p className="text-gray-400">Created by {user?.name}</p>
        </div>
        <DeleteBoard boardId={boardId} />
      </div>
      <CreateCardButton boardId={boardId} />
      <CardList boardId={boardId} />
    </div>
  );
}
