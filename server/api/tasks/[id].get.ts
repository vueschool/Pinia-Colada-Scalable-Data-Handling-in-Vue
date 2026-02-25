import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const task = await db
    .select()
    .from(schema.tasks)
    .where(eq(schema.tasks.id, id))
    .get();

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }

  return task;
});
