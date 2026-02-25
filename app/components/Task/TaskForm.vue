<script setup lang="ts">
import { useCreateTaskMutation } from "~/mutations/tasks";

const newTask = ref<Task>({
  id: "",
  title: "",
  description: "",
  completed: 0,
});

const emit = defineEmits<{
  submitted: [];
}>();

const { mutate: createTask, asyncStatus: createTaskAsyncStatus } =
  useCreateTaskMutation();

const isCreating = computed(() => createTaskAsyncStatus.value === "loading");

function handleSubmit() {
  createTask({ ...newTask.value });
  newTask.value = { id: "", title: "", description: "", completed: 0 };
  emit("submitted");
}
</script>
<template>
  <div class="form-card">
    <h2 class="form-title">New task</h2>
    <input
      type="text"
      v-model="newTask.title"
      placeholder="Title"
      class="input"
      :disabled="isCreating"
    />
    <input
      type="text"
      v-model="newTask.description"
      placeholder="Description"
      class="input"
      :disabled="isCreating"
    />
    <button
      class="btn btn-primary"
      :disabled="isCreating"
      @click="handleSubmit"
    >
      {{ isCreating ? "Creating…" : "Create Task" }}
    </button>
  </div>
</template>

<style scoped>
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
