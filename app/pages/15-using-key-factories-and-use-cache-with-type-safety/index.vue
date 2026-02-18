<script setup lang="ts">
import {
  productByIdQuery,
  productReviewsQuery,
  productsListQuery,
  PRODUCTS_QUERY_KEYS,
} from "~/queries/products";

// const productsListFromCache = useQueryCache().getQueryData(
//   PRODUCTS_QUERY_KEYS.root,
// );

const productsListFromCache = useQueryCache().getQueryData(
  productsListQuery.key,
);

const id = "1";
const productFromCache = useQueryCache().getQueryData(productByIdQuery(id).key);
</script>
<template>
  <p>Nothing to see here...</p>
  <p>Just a syntax demo of using key factories with useCache</p>
</template>
