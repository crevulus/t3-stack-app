// routers are arbitrary ways to break things up; could all be in one router
// runs on our servers, not on client
import { createClient, type User } from "@supabase/supabase-js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.user_metadata.user_name,
    avatar_url: user.user_metadata.avatar_url,
  };
};

// publicProcedure = accessible w/o auth
export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const usersData = await supabase.auth.admin.listUsers();
    const users = usersData.data.users.map(filterUserForClient);

    const postsWithUsers = posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));

    return postsWithUsers;
  }),
});
