import { db, schema } from "hub:db";

const products: Omit<Product, "id">[] = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description:
      "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones/400/300",
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description:
      "Soft, breathable t-shirt made from 100% organic cotton. Available in multiple colors.",
    category: "Clothing",
    image: "https://picsum.photos/seed/tshirt/400/300",
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description:
      "Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/bottle/400/300",
  },
  {
    name: "Yoga Mat Pro",
    price: 49.99,
    description:
      "Extra thick 6mm mat with non-slip surface. Perfect for yoga, pilates, and stretching.",
    category: "Sports & Fitness",
    image: "https://picsum.photos/seed/yogamat/400/300",
  },
  {
    name: "Smart Watch Series X",
    price: 299.99,
    description:
      "Advanced fitness tracking, heart rate monitoring, GPS, and smartphone notifications.",
    category: "Electronics",
    image: "https://picsum.photos/seed/smartwatch/400/300",
  },
  {
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    description:
      "Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe.",
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/mugs/400/300",
  },
  {
    name: "Running Shoes Ultra",
    price: 129.99,
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
    category: "Sports & Fitness",
    image: "https://picsum.photos/seed/shoes/400/300",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    description:
      "Waterproof speaker with 360-degree sound and 20-hour playtime.",
    category: "Electronics",
    image: "https://picsum.photos/seed/speaker/400/300",
  },
  {
    name: "Leather Messenger Bag",
    price: 89.99,
    description:
      "Genuine leather bag with padded laptop compartment. Fits up to 15-inch laptops.",
    category: "Accessories",
    image: "https://picsum.photos/seed/bag/400/300",
  },
  {
    name: "Indoor Plant Collection",
    price: 44.99,
    description:
      "Set of 3 low-maintenance indoor plants in decorative pots. Perfect for beginners.",
    category: "Home & Garden",
    image: "https://picsum.photos/seed/plants/400/300",
  },
  {
    name: "Wireless Charging Pad",
    price: 29.99,
    description:
      "Fast wireless charger compatible with all Qi-enabled devices. Sleek minimalist design.",
    category: "Electronics",
    image: "https://picsum.photos/seed/charger/400/300",
  },
  {
    name: "Bamboo Cutting Board Set",
    price: 39.99,
    description:
      "Set of 3 eco-friendly bamboo cutting boards in different sizes. Knife-friendly surface.",
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/cuttingboard/400/300",
  },
  {
    name: "Polarized Sunglasses",
    price: 54.99,
    description:
      "Classic aviator style with UV400 protection and scratch-resistant lenses.",
    category: "Accessories",
    image: "https://picsum.photos/seed/sunglasses/400/300",
  },
  {
    name: "Resistance Bands Set",
    price: 19.99,
    description:
      "Set of 5 resistance bands with different tension levels. Includes carrying bag.",
    category: "Sports & Fitness",
    image: "https://picsum.photos/seed/bands/400/300",
  },
  {
    name: "Scented Candle Collection",
    price: 32.99,
    description:
      "Set of 4 soy wax candles with natural essential oils. 40-hour burn time each.",
    category: "Home & Garden",
    image: "https://picsum.photos/seed/candles/400/300",
  },
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    description:
      "RGB backlit mechanical keyboard with customizable switches and programmable keys.",
    category: "Electronics",
    image: "https://picsum.photos/seed/keyboard/400/300",
  },
  {
    name: "Wool Blend Sweater",
    price: 69.99,
    description:
      "Cozy crew neck sweater made from premium wool blend. Machine washable.",
    category: "Clothing",
    image: "https://picsum.photos/seed/sweater/400/300",
  },
  {
    name: "French Press Coffee Maker",
    price: 27.99,
    description:
      "34oz borosilicate glass French press with stainless steel filter and frame.",
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/frenchpress/400/300",
  },
  {
    name: "Fitness Tracker Band",
    price: 49.99,
    description:
      "Slim fitness band with step counting, sleep tracking, and 7-day battery life.",
    category: "Electronics",
    image: "https://picsum.photos/seed/fitnesstracker/400/300",
  },
  {
    name: "Canvas Backpack",
    price: 59.99,
    description:
      "Durable canvas backpack with leather accents. Multiple compartments and laptop sleeve.",
    category: "Accessories",
    image: "https://picsum.photos/seed/backpack/400/300",
  },
];

export const seedProducts = async () => {
  const existingProducts = await db.select().from(schema.products);
  if (existingProducts.length > 0) {
    return;
  }
  await db.insert(schema.products).values(products);
};
