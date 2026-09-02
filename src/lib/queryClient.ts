import { QUERY_TIMINGS } from '../constants'

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_TIMINGS.defaultStaleMs,
      retry: QUERY_TIMINGS.retry,
      refetchOnWindowFocus: false,
    },
  },
})
