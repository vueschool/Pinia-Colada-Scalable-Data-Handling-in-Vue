<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const { state: product, asyncStatus } = useQuery({
  key: () => ["product", id.value],
  query: async () => {
    return $fetch<Product>(`/api/products/${id.value}`);
  },
});

const { state: productReviews } = useQuery({
  key: () => ["product", id.value, "reviews"],
  query: async () => {
    return $fetch(`/api/products/${id.value}/reviews`);
  },
});

const queryCache = useQueryCache();
function reload() {
  queryCache.invalidateQueries({
    key: ["product", id.value],
  });
}
</script>

<template>
  <div>
    <AppButton @click="reload">Reload</AppButton>
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
    <div v-if="productReviews.data">
      <h2>Reviews</h2>
      <ul>
        <li v-for="review in productReviews.data" :key="review">
          {{ review }}
        </li>
      </ul>
    </div>
  </div>
</template>
