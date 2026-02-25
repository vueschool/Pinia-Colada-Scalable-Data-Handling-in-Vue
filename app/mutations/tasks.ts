import { tasksListQuery, taskByIdQuery } from "~/queries/tasks";

export const useCreateTaskMutation = defineMutation(() => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: createTask,
    onMutate: (task) => {
      const tempTask = { ...task, id: `temp-${Date.now()}` };

      // optimistic update the task in the list
      const key = tasksListQuery.key;
      const oldTaskList = queryCache.getQueryData<Task[]>(key) ?? [];
      queryCache.setQueryData(key, [...oldTaskList, tempTask]);
      queryCache.cancelQueries({ key: key });

      return { oldTaskList };
    },
    onError: (_error, _task, { oldTaskList }) => {
      alert("Error updating the product");
      if (!oldTaskList) return;

      // rollback the optimistic update in the all list if it hasn't changed
      const listInCache = queryCache.getQueryData(tasksListQuery.key);
      const hasntChanged = oldTaskList === listInCache;
      if (hasntChanged) {
        queryCache.setQueryData(tasksListQuery.key, oldTaskList);
      }
    },
    onSettled: () => {
      queryCache.invalidateQueries({
        key: tasksListQuery.key,
      });
    },
  });

  return mutation;
});

export const useDeleteTaskMutationLocal = () => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: async (id: string) => {
      return await deleteTask(id);
    },
    onMutate: (id) => {
      const key = tasksListQuery.key;

      // optimistically remove the task from the list
      const oldTaskList = queryCache.getQueryData(key);
      if (oldTaskList) {
        queryCache.setQueryData(
          key,
          oldTaskList.filter((t) => t.id !== id),
        );
      }
      queryCache.cancelQueries({ key });
      return { oldTaskList };
    },
    onError: (_error, _id, { oldTaskList }) => {
      const key = tasksListQuery.key;
      // rollback the optimistic update if it hasn't changed
      const taskListInCache = queryCache.getQueryData(key);
      const hasntChanged = taskListInCache === oldTaskList;
      if (hasntChanged) {
        queryCache.setQueryData(key, oldTaskList);
      }
    },
    onSettled: () => {
      queryCache.invalidateQueries({
        key: tasksListQuery.key,
      });
    },
  });
  return mutation;
};
export const useDeleteTaskMutation = defineMutation(useDeleteTaskMutationLocal);

export const useUpdateTaskMutationLocal = () => {
  const queryCache = useQueryCache();
  const mutation = useMutation({
    mutation: async (task: { id: string } & Partial<Task>) => {
      const { id, ...data } = task;
      return await updateTask(id, data);
    },
    onMutate: (task) => {
      // optimistically update the task in the list
      const listKey = tasksListQuery.key;
      const oldTaskList = queryCache.getQueryData<Task[]>(listKey);
      if (oldTaskList) {
        queryCache.setQueryData(
          listKey,
          oldTaskList.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
        );
      }
      queryCache.cancelQueries({ key: listKey });

      // optimistically update the task in the by id query
      const byIdKey = taskByIdQuery(task.id).key;
      const oldTask = queryCache.getQueryData(byIdKey);
      if (oldTask) {
        queryCache.setQueryData(byIdKey, { ...oldTask, ...task });
      }

      queryCache.cancelQueries({ key: byIdKey });

      return { oldTaskList, oldTask };
    },
    onError: (_error, task, { oldTaskList, oldTask }) => {
      if (!oldTaskList || !oldTask) return;

      const listKey = tasksListQuery.key;
      const byIdKey = taskByIdQuery(task.id).key;
      // rollback the optimistic update of the list if it hasn't changed
      const listInCache = queryCache.getQueryData(listKey);
      if (listInCache === oldTaskList) {
        queryCache.setQueryData(listKey, oldTaskList);
      }

      // rollback the optimistic update of the by id query if it hasn't changed
      const byIdInCache = queryCache.getQueryData(byIdKey);
      if (byIdInCache === oldTask) {
        queryCache.setQueryData(byIdKey, oldTask);
      }
    },
    onSettled: (_data, _error, task) => {
      queryCache.invalidateQueries({ key: tasksListQuery.key });
      queryCache.invalidateQueries({ key: taskByIdQuery(task.id).key });
    },
  });
  return mutation;
};

export const useUpdateTaskMutation = defineMutation(useUpdateTaskMutationLocal);
