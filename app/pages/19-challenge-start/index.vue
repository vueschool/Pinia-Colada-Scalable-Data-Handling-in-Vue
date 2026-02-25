<script setup lang="ts">
const tasks = ref<Task[]>([]);

const newTask = ref<Task>({
  id: "",
  title: "",
  description: "",
  completed: 0,
});
const showNewTaskForm = ref(false);
const tasksFilter = ref<"all" | "completed" | "incomplete">("all");

onMounted(async () => {
  tasks.value = await fetchTasks(tasksFilter.value);
});

async function createNewTask() {
  const task = await createTask(newTask.value);
  showNewTaskForm.value = false;
  newTask.value = { id: "", title: "", description: "", completed: 0 };
  tasks.value = await fetchTasks(tasksFilter.value);
}

watch(tasksFilter, async () => {
  tasks.value = await fetchTasks(tasksFilter.value);
});

async function toggleComplete(task: Task) {
  await updateTask(task.id, {
    title: task.title,
    description: task.description,
    completed: task.completed ? 0 : 1,
  });
  tasks.value = await fetchTasks(tasksFilter.value);
}
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

    <div v-if="showNewTaskForm" class="form-card">
      <h2 class="form-title">New task</h2>
      <input
        type="text"
        v-model="newTask.title"
        placeholder="Title"
        class="input"
      />
      <input
        type="text"
        v-model="newTask.description"
        placeholder="Description"
        class="input"
      />
      <button class="btn btn-primary" @click="createNewTask">
        Create Task
      </button>
    </div>

    <div class="toolbar">
      <label class="filter-label" for="filter">Filter</label>
      <select id="filter" v-model="tasksFilter" class="select">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <div class="task-body">
          <span class="task-title">{{ task.title }}</span>
          <span class="task-description">{{ task.description }}</span>
          <span class="task-status" :class="{ completed: task.completed }">
            {{ task.completed ? "Done" : "To do" }}
          </span>
        </div>
        <div class="task-actions">
          <button
            class="btn btn-ghost"
            :class="{ 'btn-complete': task.completed }"
            @click="toggleComplete(task)"
          >
            {{ task.completed ? "Mark incomplete" : "Mark complete" }}
          </button>
          <button class="btn btn-ghost" @click="deleteTask(task.id)">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <p v-if="tasks.length === 0" class="empty">
      No tasks yet. Create one above.
    </p>
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

.form-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #334155;
}

.input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  background: #fff;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input::placeholder {
  color: #94a3b8;
}

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

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.task-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.task-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.task-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9375rem;
}

.task-description {
  font-size: 0.8125rem;
  color: #64748b;
  line-height: 1.4;
}

.task-status {
  font-size: 0.75rem;
  font-weight: 500;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.task-status.completed {
  color: #059669;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-complete {
  color: #059669;
}

.btn-complete:hover {
  color: #047857;
  background: #ecfdf5;
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

.btn-ghost {
  background: transparent;
  color: #64748b;
  flex-shrink: 0;
}

.btn-ghost:hover {
  color: #dc2626;
  background: #fef2f2;
}

.empty {
  text-align: center;
  color: #94a3b8;
  font-size: 0.9375rem;
  padding: 2rem;
  margin: 0;
}
</style>
