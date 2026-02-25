<script setup lang="ts">
import {
  useToggleCompleteTaskMutationLocal,
  useDeleteTaskMutation,
} from "~/mutations/tasks";

defineProps<{
  task: Task;
}>();

const { mutate: toggleComplete, asyncStatus: toggleCompleteAsyncStatus } =
  useToggleCompleteTaskMutationLocal();

const { mutate: removeTask, asyncStatus: deleteTaskAsyncStatus } =
  useDeleteTaskMutation();

const isToggling = computed(
  () => toggleCompleteAsyncStatus.value === "loading",
);
const isDeleting = computed(() => deleteTaskAsyncStatus.value === "loading");
</script>
<template>
  <li class="task-item">
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
        :disabled="isToggling || isDeleting"
        @click="toggleComplete(task)"
      >
        {{
          isToggling
            ? "…"
            : task.completed
              ? "Mark incomplete"
              : "Mark complete"
        }}
      </button>
      <button
        class="btn btn-ghost"
        :disabled="isToggling || isDeleting"
        @click="removeTask(task.id)"
      >
        {{ isDeleting ? "…" : "Delete" }}
      </button>
    </div>
  </li>
</template>

<style scoped>
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

.btn-ghost {
  background: transparent;
  color: #64748b;
  flex-shrink: 0;
}

.btn-ghost:hover {
  color: #dc2626;
  background: #fef2f2;
}
</style>
