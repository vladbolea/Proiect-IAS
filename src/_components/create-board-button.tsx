"use client";

import { useEffect, useState } from "react";
import { CreateBoardModal } from "./create-board-modal";
import { useSession } from "next-auth/react";

export const CreateBoardButton = () => {
  const session = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(session.status !== "authenticated" && session.status !== "loading");
  }, [session.status]);

  return (
    <div>
      {session.status !== "unauthenticated" && session.status !== "loading" ? (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create Board
          </button>
          <CreateBoardModal openModal={openModal} setOpenModal={setOpenModal} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
