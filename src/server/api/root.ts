import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { boardRouter } from "./routers/board-router";
import { cardRouter } from "./routers/card-router";
import { taskRouter } from "./routers/list-router";
import { userRouter } from "./routers/user-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  board: boardRouter,
  card: cardRouter,
  task: taskRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
