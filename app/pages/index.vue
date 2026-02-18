<script setup lang="ts">
const router = useRouter();

const routes = [
  {
    label: "1. Home",
    path: "/",
  },
  {
    label: "2. About The Codebase",
    path: "/2-about-the-codebase",
  },
  {
    label: "3. Queries 101",
    path: "/3-queries-101",
  },
  {
    label: "4. Query Stale While Revalidate",
    path: "/4-query-stale-while-revalidate",
  },
  {
    label: "5. External Properties in Queries",
    path: "/5-external-properties-in-queries",
  },
  {
    label: "6. Mutations 101",
    path: "/6-mutations-101",
  },
  {
    label: "7. Invalidating Queries After Mutation",
    path: "/7-invalidating-queries-after-mutation",
  },
  {
    label: "8. Should You Await or Not Await Invalidate Queries",
    path: "/8-should-you-await-or-not-await-invalidate-queries",
  },
  {
    label: "9. Optimistic Updates",
    path: "/9-optimistic-updates",
  },
  {
    label: "10. Optimistic Update Rollbacks",
    path: "/10-optimistic-update-rollbacks",
  },
  {
    label: "11. Refetching vs Refreshing Queries",
    path: "/11-refetching-vs-refreshing-queries",
  },
  {
    label: "12. Hiearchacal Query Keys",
    path: "/12-hiearchacal-query-keys",
  },
  {
    label: "13. Organizing Queries and Key Factories",
    path: "/13-organizing-queries-and-key-factories",
  },
  {
    label: "14. Using Reusable Query Options",
    path: "/14-using-reusable-query-options",
  },
];
</script>
<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <NuxtLink :to="route.path">{{ route.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
