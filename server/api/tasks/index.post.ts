import z from "zod";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  completed: z.number().min(0).default(0),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, taskSchema.parse);
  const task = await db.insert(schema.tasks).values(body).returning();
  return task;
});
