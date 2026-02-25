import { tasksListQuery } from "~/queries/tasks";

export const useCreateTaskMutation = defineMutation(() => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: async (task: Task) => {
      return await createTask(task);
    },
    onSettled: () => {
      queryCache.invalidateQueries({
        key: tasksListQuery.key,
      });
    },
  });

  return mutation;
});

export const useToggleCompleteTaskMutationLocal = () => {
  const mutation = useMutation({
    mutation: async (task: Task) => {
      return await updateTask(task.id, {
        completed: task.completed ? 0 : 1,
      });
    },
    onSettled: () => {
      useQueryCache().invalidateQueries({
        key: tasksListQuery.key,
      });
    },
  });
  return mutation;
};

export const useDeleteTaskMutation = defineMutation(() => {
  const mutation = useMutation({
    mutation: async (id: string) => {
      return await deleteTask(id);
    },
    onSettled: () => {
      useQueryCache().invalidateQueries({
        key: tasksListQuery.key,
      });
    },
  });
  return mutation;
});
