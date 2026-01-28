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

    // added this 👇 to optimistically update the data before the mutation is settled
    onMutate(newProduct) {
      // update the product in the cache
      queryCache.setQueryData(["product", newProduct.id], {
        ...newProduct,
      });
      // we cancel (without refetching) all queries that depend on the contact
      queryCache.cancelQueries({ key: ["product", newProduct.id] });
      return { newProduct };
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
