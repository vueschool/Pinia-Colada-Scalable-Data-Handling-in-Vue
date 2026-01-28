<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const { state: product, asyncStatus } = useQuery({
  key: () => ["product", id.value],
  query: async () => {
    return $fetch<Product>(`/api/products/${id.value}`);
  },
});

const queryCache = useQueryCache();
const { mutate: updateProduct, asyncStatus: updateProductAsyncStatus } =
  useMutation({
    mutation: (product: Product) =>
      $fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: product,
      }),
    onMutate(newProduct) {
      // added this 👇 to get the old product from the cache
      const oldProduct = queryCache.getQueryData(["product", newProduct.id]);

      // update the product in the cache
      queryCache.setQueryData(["product", newProduct.id], newProduct);

      // we cancel (without refetching) all queries that depend on the product
      queryCache.cancelQueries({ key: ["product", newProduct.id] });

      // and return it for use in other hooks👇
      return { oldProduct, newProduct };
    },
    // added this 👇 to rollback the optimistic update
    // (set "Offline" in network tab to test this)
    onError(err, productInfo, { oldProduct, newProduct }) {
      console.log("onError", oldProduct);
      // Notify the user that the update failed
      alert("Error updating the product");
      // before applying the rollback, we need to check if the value in the cache
      // is the same because the cache could have been updated by another mutation
      // or query
      const productInCache = queryCache.getQueryData([
        "product",
        productInfo.id,
      ]);

      // before applying the rollback, we need to check if the value in the cache
      // is the same because the cache could have been updated by another mutation
      // or query
      const hasntChanged = newProduct === productInCache;
      if (hasntChanged) {
        queryCache.setQueryData(["product", productInfo.id], oldProduct);
      }
    },
    async onSettled(updatedProduct) {
      if (!updatedProduct) return;
      await queryCache.invalidateQueries({
        key: ["product", updatedProduct.id],
      });
    },
  });
</script>

<template>
  <div>
    <h1>
      Product
      <span
        v-if="
          asyncStatus === 'loading' || updateProductAsyncStatus === 'loading'
        "
        ><Spinner class="size-3"
      /></span>
    </h1>
    <span v-if="product.status === 'error'">
      Error: {{ product.error.message }}
    </span>
    <div v-if="product.data">
      <pre>{{ product.data }}</pre>
      <ProductForm :product="product.data" @update:product="updateProduct" />
    </div>
  </div>
</template>
