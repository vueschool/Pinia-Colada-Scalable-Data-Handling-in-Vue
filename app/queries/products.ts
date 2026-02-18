// managing query keys in one place with key factories
export const PRODUCTS_QUERY_KEYS = {
  root: ["products"] as const,
  byId: (id: string) => [...PRODUCTS_QUERY_KEYS.root, id] as const,
  byIdWithReviews: (id: string) =>
    [...PRODUCTS_QUERY_KEYS.root, id, "reviews"] as const,
};

// query options for a list of products
// simple query options
export const productsListQuery = defineQueryOptions({
  key: PRODUCTS_QUERY_KEYS.root,
  query: async () => {
    return $fetch("/api/products");
  },
});

// query options for a single product
// query options with arguments
export const productByIdQuery = defineQueryOptions((id: string) => ({
  key: PRODUCTS_QUERY_KEYS.byId(id),
  query: async () => {
    return $fetch(`/api/products/${id}`);
  },
}));

// query options for reviews of a single product
export const productReviewsQuery = defineQueryOptions((id: string) => ({
  key: PRODUCTS_QUERY_KEYS.byIdWithReviews(id),
  query: async () => {
    return $fetch(`/api/products/${id}/reviews`);
  },
}));
