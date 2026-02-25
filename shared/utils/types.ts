import { products, tasks } from "@nuxthub/db/schema";

// Select types (for reading data)
export type Product = typeof products.$inferSelect;
export type Task = typeof tasks.$inferSelect;
