"use client";

import { useState } from "react";
import { CreateCardModal } from "./create-card-modal";
import { useSession } from "next-auth/react";

export const CreateCardButton = ({ boardId }: { boardId: string }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const session = useSession();

  return (
    <>
      {session.status !== "unauthenticated" && session.status !== "loading" ? (
        <div>
          <button
            className="rounded-full bg-white/10 px-10 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create Card
          </button>
          <CreateCardModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            boardId={boardId}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
