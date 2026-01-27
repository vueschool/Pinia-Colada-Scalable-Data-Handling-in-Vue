import { eq } from "drizzle-orm";
import { db, schema } from "@nuxthub/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;
  const product = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, parseInt(id)));

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  return product;
});
