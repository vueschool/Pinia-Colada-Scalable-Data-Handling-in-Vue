import { productByIdQuery } from "~/queries/products";

export const useUpdateProductMutation = defineMutation(() => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: (product: Product) =>
      $fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: product,
      }),
    async onSettled(updatedProduct) {
      if (!updatedProduct) return;
      await queryCache.invalidateQueries({
        key: productByIdQuery(updatedProduct.id).key,
      });
    },
  });

  return mutation;
});
