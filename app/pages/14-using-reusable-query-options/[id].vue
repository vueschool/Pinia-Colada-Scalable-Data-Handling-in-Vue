<script setup lang="ts">
import { productByIdQuery, productReviewsQuery } from "~/queries/products";
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

// const { state: product, asyncStatus } = useQuery(productByIdQuery(id.value));

const { state: product, asyncStatus } = useQuery(
  productByIdQuery,
  () => id.value,
);

const { state: productReviews } = useQuery(productReviewsQuery, () => id.value);
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
