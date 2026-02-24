import { z } from "zod";
const userIndexSchema = z.object({
  page: z.coerce.number().optional(),
});

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

export default defineEventHandler(async (event) => {
  const { page } = await getValidatedQuery(event, userIndexSchema.parse);

  const url = "https://dummyjson.com/users/";

  return await $fetch<{
    users: User[];
    total: number;
    skip: number;
    limit: number;
  }>(url, {
    query: {
      limit: 30,
      skip: page ? (page - 1) * 30 : 0,
    },
  });
});
