<script setup lang="ts">
import { tasksListQuery, taskByIdQuery } from "~/queries/tasks";
const showNewTaskForm = ref(false);
const { state: tasks, asyncStatus } = useQuery(tasksListQuery);
</script>
<template>
  <div class="page">
    <p class="error" v-if="tasks.status === 'error'">
      Error: {{ tasks.error.message }}
    </p>
    <header class="header">
      <div class="flex items-center justify-between gap-2">
        <h1 class="title">Task Manager</h1>
        <Spinner v-if="asyncStatus === 'loading'" class="size-2" />
      </div>
      <button
        class="btn btn-primary"
        @click="showNewTaskForm = !showNewTaskForm"
      >
        {{ showNewTaskForm ? "Cancel" : "Create New Task" }}
      </button>
    </header>

    <TaskForm v-if="showNewTaskForm" @submitted="showNewTaskForm = false" />

    <TaskList />
  </div>
</template>

<style scoped>
.error {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  margin: 0;
}
.page {
  max-width: 36rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: #1a1a2e;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  border: none;
  white-space: nowrap;
}

.btn-primary {
  background: #1e293b;
  color: #fff;
}

.btn-primary:hover {
  background: #334155;
}
</style>
