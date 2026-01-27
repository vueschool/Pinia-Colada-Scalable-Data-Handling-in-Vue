import { eq } from "drizzle-orm";
import { db, schema } from "@nuxthub/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const products = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, id))
    .limit(1);

  if (!products.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  return products[0] as Product;
});
