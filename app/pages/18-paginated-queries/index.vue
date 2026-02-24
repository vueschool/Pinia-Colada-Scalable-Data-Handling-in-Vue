<script setup lang="ts">
import { usersPaginatedQuery } from "~/queries/users";

const page = ref(1);

const { state: usersList, asyncStatus } = useQuery(
  usersPaginatedQuery,
  () => page.value,
);
</script>

<template>
  <div>
    <h1 class="font-bold">
      Users <span v-if="asyncStatus === 'loading'">...</span>
    </h1>
    <div v-if="usersList.status === 'error'">
      Error: {{ usersList.error.message }}
    </div>
    <div v-if="usersList.status === 'success'">
      Success: {{ usersList.data.total }} users
    </div>
    <ul v-for="user in usersList.data?.users" :key="user.id">
      <li>{{ user.id }} {{ user.firstName }} {{ user.lastName }}</li>
    </ul>
    <div>
      <AppButton :disabled="page === 1" @click="page--">Previous</AppButton>
      <AppButton
        :disabled="page * 30 >= (usersList.data?.total || 0)"
        @click="page++"
        >Next</AppButton
      >
    </div>
  </div>
</template>
