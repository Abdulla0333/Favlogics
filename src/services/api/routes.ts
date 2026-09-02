type UsersQuery = {
  limit?: number
  select?: string
}

type PostsQuery = {
  userId?: number
  limit?: number
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }

  const query = search.toString()
  return query ? `?${query}` : ''
}

export const dummyJsonRoutes = {
  users: (params: UsersQuery = {}) =>
    `/users${buildQuery({
      limit: params.limit,
      select: params.select,
    })}`,
  userById: (userId: number) => `/users/${userId}`,
} as const

export const jsonPlaceholderRoutes = {
  posts: (params: PostsQuery = {}) =>
    `/posts${buildQuery({
      userId: params.userId,
      _limit: params.limit,
    })}`,
  createPost: () => '/posts',
} as const
