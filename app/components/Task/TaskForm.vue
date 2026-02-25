<script setup lang="ts">
const form = defineModel<{ title: string; description: string }>({
  default: () => ({ title: "", description: "" }),
});

withDefaults(
  defineProps<{
    submitText?: string;
  }>(),
  {
    submitText: "Save Changes",
  },
);

const emit = defineEmits<{
  (e: "submit"): void;
  (e: "cancel"): void;
}>();
</script>
<template>
  <div class="form-card">
    <label class="label" for="edit-title">Title</label>
    <input id="edit-title" v-model="form.title" type="text" class="input" />

    <label class="label" for="edit-description">Description</label>
    <input
      id="edit-description"
      v-model="form.description"
      type="text"
      class="input"
    />

    <div class="form-actions">
      <button
        class="btn btn-primary"
        :disabled="!form.title.trim()"
        @click="emit('submit')"
      >
        {{ submitText }}
      </button>
      <button @click="emit('cancel')" class="btn btn-ghost">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
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
