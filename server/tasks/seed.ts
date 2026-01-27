import { seedProducts } from "../db/seeds/products.seed";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed database with initial data",
  },
  async run() {
    console.log("Seeding database...");
    await seedProducts();

    return { result: "Database seeded successfully" };
  },
});
