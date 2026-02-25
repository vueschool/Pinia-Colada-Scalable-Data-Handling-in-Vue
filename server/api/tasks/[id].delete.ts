import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  await db.delete(schema.tasks).where(eq(schema.tasks.id, id));
  return { success: true };
});
