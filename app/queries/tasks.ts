export const TASKS_QUERY_KEYS = {
  root: ["tasks"] as const,
  byId: (id: string) => [...TASKS_QUERY_KEYS.root, id] as const,
};

export const tasksListQuery = defineQueryOptions({
  key: TASKS_QUERY_KEYS.root,
  query: () => fetchTasks("all"),
});

export const taskByIdQuery = defineQueryOptions((id: string) => ({
  key: TASKS_QUERY_KEYS.byId(id),
  query: async () => {
    return fetchTask(id);
  },
}));
