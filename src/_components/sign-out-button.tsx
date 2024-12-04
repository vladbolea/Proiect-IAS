"use client"

import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <button
      className="rounded-full bg-white/10 px-10 py-2 mx-6 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};
