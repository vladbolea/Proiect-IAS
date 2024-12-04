import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const cardRouter = createTRPCRouter({
  // Public: Get all cards
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.card.findMany({
      include: { owner: true, board: true },
    });
  }),

  // Public: Get a single card by ID
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.card.findUnique({
      where: { id: input },
      include: { owner: true, board: true },
    });
  }),

  // Protected: Create a new card
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        boardId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.create({
        data: {
          title: input.title,
          boardId: input.boardId,
          ownerId: ctx.session.user.id,
        },
      });
    }),

  // Protected: Update a card
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: { id: input.id },
        data: { title: input.title },
      });
    }),

  // Protected: Delete a card
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.delete({
        where: { id: input },
      });
    }),

  getAllByBoardId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.card.findMany({
        where: { boardId: input },
        include: {
          tasks: true,
        },
      });
    }),
});
