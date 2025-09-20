import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export const useFetchData = (endpoint, options = {}) => {
  const {
    queryKey = [endpoint],
    enabled = true,
    staleTime = 5 * 60 * 1000,
    params = {},
    ...queryOptions
  } = options

  // Build query parameters
  const queryParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value)
    }
  })

  const queryString = queryParams.toString()
  const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint
  const fullQueryKey = queryString ? [...queryKey, params] : queryKey

  return useQuery({
    queryKey: fullQueryKey,
    queryFn: async () => {
      const response = await api.get(fullEndpoint)
      return response.data
    },
    enabled,
    staleTime,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...queryOptions
  })
}

export default useFetchData