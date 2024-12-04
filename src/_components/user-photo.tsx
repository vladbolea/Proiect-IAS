import { auth } from "~/server/auth";
import userIcon from "../../public/icons/user-icon.svg";

import Image from "next/image";

export default async function UserIcon() {
  const session = await auth();

  return (
    <div className="">
      {session?.user.image ? (
          <Image
            src={session?.user.image ?? userIcon as string}
            alt="user image"
            width={45}
            height={45}
          />
      ) : (
        <Image src={userIcon as string} alt="user image" width={45} height={45} />
      )}
    </div>
  );
}
