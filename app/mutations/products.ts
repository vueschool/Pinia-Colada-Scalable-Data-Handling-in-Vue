import { productByIdQuery } from "~/queries/products";

export const useUpdateProductMutation = defineMutation(() => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: (product: Product) =>
      $fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: product,
      }),
    onMutate(newProduct) {
      const key = productByIdQuery(newProduct.id).key;
      const oldProduct = queryCache.getQueryData(key);
      queryCache.setQueryData(key, newProduct);
      queryCache.cancelQueries({ key });
      return { oldProduct, newProduct };
    },
    onError(err, productInfo, { oldProduct, newProduct }) {
      // Notify the user that the update failed
      alert("Error updating the product");
      const key = productByIdQuery(productInfo.id).key;
      const productInCache = queryCache.getQueryData(key);
      const hasntChanged = newProduct === productInCache && oldProduct;
      if (hasntChanged) {
        queryCache.setQueryData(key, oldProduct);
      }
    },
    async onSettled(updatedProduct) {
      if (!updatedProduct) return;
      await queryCache.invalidateQueries({
        key: productByIdQuery(updatedProduct.id).key,
      });
    },
  });

  return mutation;
});
