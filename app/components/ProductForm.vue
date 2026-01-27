<script setup lang="ts">
const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: "update:product", value: Product): void;
}>();

const copy = ref(structuredClone(props.product));
</script>

<template>
  <form @submit.prevent="emit('update:product', copy)">
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="text"
      v-model="copy.name"
    />
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="text"
      v-model="copy.price"
    />
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="text"
      v-model="copy.description"
    />
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="text"
      v-model="copy.category"
    />
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="text"
      v-model="copy.image"
    />
    <input
      class="border border-gray-300 block rounded-md p-2"
      type="number"
      v-model="copy.stock"
    />

    <button class="bg-blue-500 text-white rounded-md p-2" type="submit">
      Update
    </button>
  </form>
</template>
