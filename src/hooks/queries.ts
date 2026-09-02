import { queryOptions, useQuery } from '@tanstack/react-query'
import { QUERY_TIMINGS } from '../constants'
import {
  fetchConversations,
  fetchMessagesForUser,
  fetchSidebarUsers,
  fetchUserById,
} from '../services/api'

export const queryKeys = {
  sidebarUsers: ['sidebarUsers'] as const,
  conversations: ['conversations'] as const,
  messages: (userId: number) => ['messages', userId] as const,
  userDetails: (userId: number) => ['userDetails', userId] as const,
}

const sidebarUsersQueryOptions = queryOptions({
  queryKey: queryKeys.sidebarUsers,
  queryFn: fetchSidebarUsers,
  staleTime: QUERY_TIMINGS.defaultStaleMs,
  retry: QUERY_TIMINGS.retry,
})

const conversationsQueryOptions = queryOptions({
  queryKey: queryKeys.conversations,
  queryFn: fetchConversations,
  staleTime: QUERY_TIMINGS.defaultStaleMs,
  retry: QUERY_TIMINGS.retry,
})

export function useSidebarUsersQuery() {
  return useQuery(sidebarUsersQueryOptions)
}

export function useConversationsQuery() {
  return useQuery(conversationsQueryOptions)
}

export function useMessagesQuery(userId: number | null) {
  return useQuery({
    queryKey: queryKeys.messages(userId ?? 0),
    queryFn: () => fetchMessagesForUser(userId!),
    enabled: userId !== null,
    staleTime: QUERY_TIMINGS.threadStaleMs,
    retry: QUERY_TIMINGS.retry,
  })
}

export function useUserDetailsQuery(userId: number | null) {
  return useQuery({
    queryKey: queryKeys.userDetails(userId ?? 0),
    queryFn: () => fetchUserById(userId!),
    enabled: userId !== null,
    staleTime: QUERY_TIMINGS.threadStaleMs,
    retry: QUERY_TIMINGS.retry,
  })
}
