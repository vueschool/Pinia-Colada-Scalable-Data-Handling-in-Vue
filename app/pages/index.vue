<script setup lang="ts">
const router = useRouter();

const routes = [
  {
    label: "3 Queries 101",
    path: "/3-queries-101",
  },
  {
    label: "4 Query Stale While Revalidate",
    path: "/4-query-stale-while-revalidate",
  },
  {
    label: "5 External Properties in Queries",
    path: "/5-external-properties-in-queries",
  },
  {
    label: "6 Mutations 101",
    path: "/6-mutations-101",
  },
  {
    label: "7 Invalidating Queries After Mutation",
    path: "/7-invalidating-queries-after-mutation",
  },
  {
    label: "8 Optimistic Updates",
    path: "/8-optimistic-updates",
  },
  {
    label: "9 Optimistic Update Rollbacks",
    path: "/9-optimistic-update-rollbacks",
  },
];
</script>
<template>
  <div>
    <ul>
      <li>
        <NuxtLink to="/">1. Home</NuxtLink>
      </li>
      <li v-for="route in routes" :key="route.path">
        <NuxtLink :to="route.path">{{ route.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
