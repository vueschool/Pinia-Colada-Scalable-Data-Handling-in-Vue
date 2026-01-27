import { db, schema } from "hub:db";
export default defineEventHandler(async (event) => {
  return await db.select().from(schema.products);
});
