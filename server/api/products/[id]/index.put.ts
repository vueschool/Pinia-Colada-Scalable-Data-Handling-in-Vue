import { z } from "zod";
import { db, schema } from "@nuxthub/db";
import { eq } from "drizzle-orm";

const productSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  stock: z.number().min(0).optional(),
});

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") as string;

  const body = await readValidatedBody(event, productSchema.parse);
  const [product] = await db
    .update(schema.products)
    .set(body)
    .where(eq(schema.products.id, id))
    .returning();

  return product;
});
