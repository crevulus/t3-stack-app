import Image from "next/image";
import React, { useMemo } from "react";
import formatDistance from "date-fns/formatDistance";

import type { RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const Post = ({ item }: { item: PostWithUser }) => {
  const relativeDate = useMemo(() => {
    return formatDistance(item.post.createdAt, new Date(), {
      addSuffix: true,
    });
  }, [item.post.createdAt]);

  console.log(relativeDate);

  return (
    <div
      key={item.post.id}
      className=" flex gap-3 border-b border-slate-400 p-4"
    >
      <Image
        className="rounded-full"
        width={64}
        height={64}
        src={item.author.avatar_url}
        alt={`${item.author.user_name}'s profile image`}
      />
      <div className="flex flex-col text-black">
        <div className="flex">
          <span>{`@${item.author.user_name}`}</span>
          <span className="font-thin">• {relativeDate}</span>
        </div>
        <span className="text-xl">{item.post.content}</span>
      </div>
    </div>
  );
};
