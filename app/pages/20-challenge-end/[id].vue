<script setup lang="ts">
import { taskByIdQuery } from "~/queries/tasks";
import { useUpdateTaskMutation } from "~/mutations/tasks";

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id?.toString() || "");

const { state: taskState, asyncStatus } = useQuery(
  taskByIdQuery,
  () => id.value,
);

const isLoading = computed(() => asyncStatus.value === "loading");
const task = computed(() => taskState.value.data);
const fetchError = computed(() => taskState.value.error);

const form = ref({ title: "", description: "" });

watch(
  task,
  (t) => {
    if (t) {
      form.value = { title: t.title, description: t.description };
    }
  },
  { immediate: true },
);

const {
  mutate: updateTask,
  asyncStatus: updateStatus,
  error: updateError,
} = useUpdateTaskMutation();

const isSaving = computed(() => updateStatus.value === "loading");

async function handleSave() {
  updateTask({ id: id.value, ...form.value });
  router.push("/20-challenge-end");
}
</script>
<template>
  <div class="page">
    <header class="header">
      <NuxtLink to="/20-challenge-end" class="back-link">
        &larr; Back to tasks
      </NuxtLink>
      <div class="flex items-center gap-2">
        <h1 class="title">Edit Task</h1>
        <Spinner v-if="isLoading" class="size-2" />
      </div>
    </header>

    <p v-if="fetchError" class="error">Error: {{ fetchError.message }}</p>

    <div class="form-card">
      <label class="label" for="edit-title">Title</label>
      <input
        id="edit-title"
        v-model="form.title"
        type="text"
        class="input"
        :disabled="isSaving"
      />

      <label class="label" for="edit-description">Description</label>
      <input
        id="edit-description"
        v-model="form.description"
        type="text"
        class="input"
        :disabled="isSaving"
      />

      <p v-if="updateError" class="error">
        Failed to save: {{ updateError.message }}
      </p>

      <div class="form-actions">
        <button
          class="btn btn-primary"
          :disabled="isSaving || !form.title.trim()"
          @click="handleSave"
        >
          {{ isSaving ? "Saving…" : "Save Changes" }}
        </button>
        <NuxtLink to="/20-challenge-end" class="btn btn-ghost">
          Cancel
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 36rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  margin-bottom: 2rem;
}

.back-link {
  font-size: 0.875rem;
  color: #64748b;
  text-decoration: none;
}

.back-link:hover {
  color: #334155;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0.5rem 0 0;
  color: #1a1a2e;
}

.center {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.form-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
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

.form-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
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
  text-decoration: none;
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
}

.btn-ghost:hover {
  background: #f1f5f9;
  color: #334155;
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
