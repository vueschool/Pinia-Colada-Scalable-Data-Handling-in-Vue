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
    async onSettled(updatedProduct) {
      if (!updatedProduct) return;
      // trigger the update with the await and without the await
      // to see the difference 👇
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
    <!-- added this 👇 to show the async status of the query 
     and the mutation and how they differ based on the await 👇-->
    <p>Async Status: {{ asyncStatus }}</p>
    <p>Update Product Async Status: {{ updateProductAsyncStatus }}</p>

    <span v-if="product.status === 'error'">
      Error: {{ product.error.message }}
    </span>
    <div v-if="product.data">
      <pre>{{ product.data }}</pre>
      <ProductForm :product="product.data" @update:product="updateProduct" />
    </div>
  </div>
</template>
