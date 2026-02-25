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

async function handleSave() {
  updateTask({ id: id.value, ...form.value });
  router.push("/20-challenge");
}
</script>
<template>
  <div class="page">
    <header class="header">
      <NuxtLink to="/20-challenge" class="back-link">
        &larr; Back to tasks
      </NuxtLink>
      <div class="flex items-center gap-2">
        <h1 class="title">Edit Task</h1>
        <Spinner v-if="isLoading" class="size-2" />
      </div>
    </header>

    <p v-if="fetchError" class="error">Error: {{ fetchError.message }}</p>
    <p v-if="updateError" class="error">Error: {{ updateError.message }}</p>

    <TaskForm
      v-model="form"
      @submit="handleSave"
      @cancel="navigateTo('/20-challenge')"
    />
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
