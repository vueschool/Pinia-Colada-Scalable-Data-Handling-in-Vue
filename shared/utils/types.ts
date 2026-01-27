import { products } from "@nuxthub/db/schema";

// Select types (for reading data)
export type Product = typeof products.$inferSelect;
