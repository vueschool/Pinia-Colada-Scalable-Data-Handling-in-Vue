<script setup lang="ts">
defineProps<{
  task: Task;
}>();

// TODO: replace with actual status from mutation
const isToggling = computed(() => false);
const isDeleting = computed(() => false);
const error = computed((): Error | null => null);

// TODO: replace with mutation
function updateTask(task: Partial<Task>) {}

// TODO: replace with mutation
function removeTask(id: string) {}
</script>
<template>
  <li class="task-item">
    <NuxtLink :to="`/20-challenge/${task.id}`" class="task-body">
      <span class="task-title">{{ task.title }}</span>
      <span class="task-description">{{ task.description }}</span>
      <span class="task-status" :class="{ completed: task.completed }">
        {{ task.completed ? "Done" : "To do" }}
      </span>
    </NuxtLink>
    <div class="task-actions">
      <button
        class="btn btn-ghost"
        :class="{ 'btn-complete': task.completed }"
        :disabled="isToggling || isDeleting"
        @click="
          updateTask(
            task.completed
              ? { id: task.id, completed: 0 }
              : { id: task.id, completed: 1 },
          )
        "
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
        class="btn btn-ghost btn-danger"
        :disabled="isToggling || isDeleting"
        @click="removeTask(task.id)"
      >
        {{ isDeleting ? "…" : "Delete" }}
      </button>
    </div>
    <p v-if="error" class="error">
      {{ error.message }}
    </p>
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
  flex-wrap: wrap;
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
  text-decoration: none;
  color: inherit;
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
  background: #f1f5f9;
}

.btn-danger:hover {
  color: #dc2626;
  background: #fef2f2;
}

.error {
  width: 100%;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  margin: 0;
}
</style>
