// organize queries for users
export const USERS_QUERY_KEYS = {
  root: ["users"] as const,
  paginated: (page: number) =>
    [...USERS_QUERY_KEYS.root, "paginated", page] as const,
};

export const usersPaginatedQuery = defineQueryOptions((page: number) => {
  return {
    key: USERS_QUERY_KEYS.paginated(page),
    placeholderData: (previousData) => previousData,
    query: async () => {
      return $fetch(`/api/users`, {
        query: {
          page,
        },
      });
    },
  };
});
