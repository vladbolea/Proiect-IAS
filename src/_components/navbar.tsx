import Link from "next/link";
import { SignInButton } from "~/_components/sign-in-button";
import { SignOutButton } from "~/_components/sign-out-button";
import { auth } from "~/server/auth";
import UserIcon from "./user-photo";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex h-24 w-full items-center justify-between">
      <Link href={"/"}>
        <div className="text-3xl font-bold text-white">Trello</div>
      </Link>
      <div className="flex">
        {!session?.user ? (
          <SignInButton />
        ) : (
          <SignOutButton />
        )}
        <UserIcon />
      </div>
    </nav>
  );
}
