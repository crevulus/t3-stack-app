import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React from "react";

export const CreatePostWizard = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full gap-3">
      <Image
        className="rounded-full"
        width={64}
        height={64}
        src={user.user_metadata.avatar_url}
        alt={`${user.user_metadata.user_name}'s profile image`}
      />
      <input
        className="grow bg-transparent outline-none"
        placeholder="Type some emojis"
      />
    </div>
  );
};
