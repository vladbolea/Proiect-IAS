import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { z } from "zod";

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input },
      });
    }),
  
  });
  