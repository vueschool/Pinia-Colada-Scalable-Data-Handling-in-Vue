<script setup lang="ts">
const showNewTaskForm = ref(false);
</script>
<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Challenge Start</h1>
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
