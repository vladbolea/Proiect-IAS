import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  // Public: Get all lists
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany({
      include: { card: true, owner: true },
    });
  }),

  // Public: Get a single list by ID
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.task.findUnique({
      where: { id: input },
      include: { card: true, owner: true },
    });
  }),

  // Protected: Create a new list
  create: protectedProcedure
    .input(
      z.object({
        description: z.string().min(1),
        cardId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          description: input.description,
          cardId: input.cardId,
          ownerId: ctx.session.user.id,
        },
      });
    }),

  // Protected: Update a list
  update: protectedProcedure
    .input(z.object({ id: z.string(), description: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: { description: input.description },
      });
    }),

  // Protected: Delete a list
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({
        where: { id: input },
      });
    }),

  getByCardId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: { cardId: input },
        include: { card: true, owner: true },
      });
    }),
});
