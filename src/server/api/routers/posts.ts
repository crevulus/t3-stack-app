// routers are arbitrary ways to break things up; could all be in one router
// runs on our servers, not on client
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// publicProcedure = accessible w/o auth
export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
});
