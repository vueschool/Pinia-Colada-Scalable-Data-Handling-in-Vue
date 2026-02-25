<script setup lang="ts">
import { tasksFilteredQuery } from "~/queries/tasks";

const filter = ref<"all" | "completed" | "incomplete">("all");
const { state: tasks, asyncStatus } = useQuery(
  tasksFilteredQuery,
  () => filter.value,
);

const isLoading = computed(() => asyncStatus.value === "loading");
const taskList = computed(() => tasks.value.data ?? []);
</script>
<template>
  <div class="toolbar">
    <label class="filter-label" for="filter">Filter</label>
    <select id="filter" v-model="filter" class="select" :disabled="isLoading">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
  </div>

  <p v-if="isLoading" class="loading">Loading tasks…</p>
  <template v-else>
    <ul class="task-list">
      <TaskItem v-for="task in taskList" :key="task.id" :task="task" />
    </ul>

    <p v-if="taskList.length === 0" class="empty">
      No tasks yet. Create one above.
    </p>
  </template>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

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

.loading,
.empty {
  text-align: center;
  color: #94a3b8;
  font-size: 0.9375rem;
  padding: 2rem;
  margin: 0;
}
</style>
