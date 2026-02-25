import z from "zod";
import { eq } from "drizzle-orm";

const taskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  completed: z.number().min(0).default(0).optional(),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const body = await readValidatedBody(event, taskSchema.parse);
  const task = await db
    .update(schema.tasks)
    .set(body)
    .where(eq(schema.tasks.id, id))
    .returning();
  return task;
});
