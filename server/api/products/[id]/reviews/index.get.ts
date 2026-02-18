import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const [product] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, id))
    .limit(1);

  return new Array(3)
    .fill(0)
    .map((_, index) => `${product?.name} review number ${index + 1}`);
});
