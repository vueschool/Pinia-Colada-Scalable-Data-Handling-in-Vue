<script setup lang="ts">
const { state: productList, asyncStatus } = useQuery({
  key: ["products-list"],

  query: async () => {
    return $fetch<Product[]>("/api/products");
  },
});
</script>

<template>
  <div>
    <h1 class="font-bold">Products</h1>
    <span v-if="asyncStatus === 'loading'">Loading...</span>
    <span v-if="productList.status === 'error'">
      Error: {{ productList.error.message }}
    </span>
    <span v-if="productList.status === 'success'">
      Success: {{ productList.data.length }} products
    </span>
    <ul v-for="product in productList.data" :key="product.id">
      <li>
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>
