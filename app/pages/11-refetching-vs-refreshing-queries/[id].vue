<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const {
  state: product,
  asyncStatus,
  refetch,
  refresh,
} = useQuery({
  key: () => ["product", id.value],
  query: async () => {
    return $fetch<Product>(`/api/products/${id.value}`);
  },
});
</script>

<template>
  <div>
    <div class="flex gap-2">
      <AppButton @click="refetch()">refetch</AppButton>
      <AppButton @click="refresh()">refresh</AppButton>
    </div>
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
