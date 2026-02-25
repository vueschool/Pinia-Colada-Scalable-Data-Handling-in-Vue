<script setup lang="ts">
// TODO: replace with actual task list from query
const taskList = computed(() => [
  { id: "1", title: "Task 1", description: "Description 1", completed: 0 },
  { id: "2", title: "Task 2", description: "Description 2", completed: 0 },
  { id: "3", title: "Task 3", description: "Description 3", completed: 0 },
]);

// TODO: replace with actual error and status from query
const error = computed((): Error | null => null);
const isLoading = computed(() => false);
</script>
<template>
  <p v-if="error" class="error">Failed to load tasks: {{ error.message }}</p>

  <p v-else-if="!isLoading && taskList.length === 0" class="empty">
    No tasks yet. Create one above.
  </p>
  <ul v-else class="task-list">
    <TaskItem v-for="task in taskList" :key="task.id" :task="task" />
  </ul>
</template>

<style scoped>
.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.select {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #fff;
  color: #334155;
  cursor: pointer;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty {
  text-align: center;
  font-size: 0.9375rem;
  padding: 2rem;
  margin: 0;
}

.loading {
  color: #94a3b8;
  font-size: 0.9375rem;
}

.error {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  margin: 0;
}
</style>
