import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().$defaultFn(nanoid).notNull(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});
