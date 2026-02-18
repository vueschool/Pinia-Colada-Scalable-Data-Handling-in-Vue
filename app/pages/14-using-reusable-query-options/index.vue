<script setup lang="ts">
import { productsListQuery } from "~/queries/products";

const { state: productList, asyncStatus } = useQuery(productsListQuery);
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
        <NuxtLink :to="`${$route.path}/${product.id}`">{{
          product.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
