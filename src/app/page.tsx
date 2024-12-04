import BoardList from "~/_components/board-list";
import { CreateBoardButton } from "~/_components/create-board-button";

export default function Home() {
  return (
    <section className="mt-10">
      <CreateBoardButton />
      <BoardList />
    </section>
  );
}
