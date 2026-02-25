export const TASKS_QUERY_KEYS = {
  root: ["tasks"] as const,
  filtered: (filter: "all" | "completed" | "incomplete") =>
    [...TASKS_QUERY_KEYS.root, filter] as const,
};

export const tasksListQuery = defineQueryOptions({
  key: TASKS_QUERY_KEYS.root,
  query: async () => {
    return $fetch("/api/tasks");
  },
});

export const tasksFilteredQuery = defineQueryOptions(
  (filter: "all" | "completed" | "incomplete") => ({
    key: TASKS_QUERY_KEYS.filtered(filter),
    query: async () => {
      return $fetch("/api/tasks", {
        query: { filter },
      });
    },
  }),
);
