<!-- added this page 👇 to demo external properties in queries -->
<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const { state: product, asyncStatus } = useQuery({
  key: () => ["product", id.value],
  query: async () => {
    return $fetch<Product>(`/api/products/${id.value}`);
  },
});
</script>

<template>
  <div>
    <h1>
      Product
      <span v-if="asyncStatus === 'loading'"><Spinner class="size-3" /></span>
    </h1>
    <span v-if="product.status === 'error'">
      Error: {{ product.error.message }}
    </span>
    <div v-if="product.data">
      <pre>{{ product.data }}</pre>
    </div>
  </div>
</template>
