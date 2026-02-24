<script setup lang="ts">
import { useUpdateProductMutation } from "~/mutations/products";
import { productByIdQuery } from "~/queries/products";
const route = useRoute();
const id = computed(() => route.params.id?.toString() || "");

const { state: product, asyncStatus } = useQuery(
  productByIdQuery,
  () => id.value,
);

const { mutate: updateProduct, asyncStatus: updateProductAsyncStatus } =
  useUpdateProductMutation();
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
