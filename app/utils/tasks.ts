export function fetchTasks(
  filter: "all" | "completed" | "incomplete",
): Promise<Task[]> {
  return $fetch("/api/tasks", {
    query: {
      filter,
    },
  });
}
export function createTask(task: Omit<Task, "id">) {
  return $fetch("/api/tasks", {
    method: "POST",
    body: task,
  });
}

export function updateTask(id: string, data: Partial<Task>) {
  return $fetch(`/api/tasks/${id}`, {
    method: "PUT",
    body: data,
  });
}

export function deleteTask(id: string) {
  return $fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}
