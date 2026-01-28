<script setup lang="ts">
const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: "update:product", value: Product): void;
}>();

const copy = ref(clone(props.product));

function handleUpdateProduct() {
  emit("update:product", clone(copy.value));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

watch(
  () => props.product,
  (newProduct) => {
    copy.value = clone(newProduct);
  },
);
</script>

<template>
  <form @submit.prevent="handleUpdateProduct">
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
      type="text"
      v-model="copy.stock"
    />
    <button class="bg-blue-500 text-white rounded-md p-2" type="submit">
      Update
    </button>
  </form>
</template>
