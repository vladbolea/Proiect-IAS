import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
  // Public: Get all boards
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.board.findMany({
      include: { cards: true, owner: true },
    });
  }),

  // Public: Get a single board by ID
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.board.findUnique({
      where: { id: input },
      include: { cards: true, owner: true },
    });
  }),

  // Protected: Create a new board
  create: protectedProcedure
    .input(
      z.object({ title: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.create({
        data: {
          title: input.title,
          ownerId: ctx.session.user.id,
          description: input.description,
        },
      });
    }),

  // Protected: Update a board
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.update({
        where: { id: input.id },
        data: { title: input.title },
      });
    }),

  // Protected: Delete a board
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.delete({
        where: { id: input },
      });
    }),
});
