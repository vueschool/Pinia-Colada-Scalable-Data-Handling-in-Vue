<script setup lang="ts">
import { useUpdateProductMutation } from "~/mutations/products";
import { productByIdQuery } from "~/queries/products";

const product1Id = "Aadyap7mk3W84UwnQpayR";
const product2Id = "C--e9_jH8K7bd-ABGWoAi";

const { state: product1 } = useQuery(productByIdQuery, () => product1Id);
const { state: product2 } = useQuery(productByIdQuery, () => product2Id);

const { mutate: updateProduct1, asyncStatus: updateProduct1AsyncStatus } =
  useUpdateProductMutation();

const { mutate: updateProduct2, asyncStatus: updateProduct2AsyncStatus } =
  useUpdateProductMutation();
</script>

<template>
  <div class="flex gap-4">
    <div v-if="product1.data">
      {{ updateProduct1AsyncStatus }}
      <ProductForm :product="product1.data" @update:product="updateProduct1" />
    </div>
    <div v-if="product2.data">
      {{ updateProduct2AsyncStatus }}
      <ProductForm :product="product2.data" @update:product="updateProduct2" />
    </div>
  </div>
</template>
