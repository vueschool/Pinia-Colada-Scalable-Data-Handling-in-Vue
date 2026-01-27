<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const { state: product, asyncStatus } = useQuery({
  key: () => ["product", id.value],
  query: async () => {
    return $fetch<Product>(`/api/products/${id.value}`);
  },
});

// added this 👇 to update the product
const { mutate: updateProduct, asyncStatus: updateProductAsyncStatus } =
  useMutation({
    mutation: (product: Product) => {
      console.log("Updating product", product);
      return $fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: product,
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
      <!-- added this 👇 to update the product -->
      <ProductForm :product="product.data" @update:product="updateProduct" />
    </div>
  </div>
</template>
