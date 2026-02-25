import { eq } from "drizzle-orm";
import z from "zod";

const taskIndexSchema = z.object({
  filter: z.enum(["all", "completed", "incomplete"]).default("all"),
});

export default defineEventHandler(async (event) => {
  const { filter } = await getValidatedQuery(event, taskIndexSchema.parse);
  let query = db.select().from(schema.tasks);

  if (filter !== "all") {
    query = query.where(
      eq(schema.tasks.completed, filter === "completed" ? 1 : 0),
    );
  }

  const tasks = await query;
  return tasks;
});
