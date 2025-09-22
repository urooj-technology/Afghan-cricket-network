import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export const useDelete = (endpoint, options = {}) => {
  const queryClient = useQueryClient()
  const {
    onSuccess,
    onError,
    invalidateQueries = [endpoint],
    ...mutationOptions
  } = options

  return useMutation({
    mutationFn: async (id) => {
      const cleanEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint
      const response = await api.delete(`${cleanEndpoint}/${id}/`)
      return response.data
    },
    onSuccess: (data, variables, context) => {
      if (invalidateQueries) {
        invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] })
        })
      }
      onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context)
    },
    ...mutationOptions
  })
}

export default useDelete