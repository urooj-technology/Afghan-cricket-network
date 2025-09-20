import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export const useAdd = (endpoint, options = {}) => {
  const queryClient = useQueryClient()
  const {
    onSuccess,
    onError,
    invalidateQueries = [endpoint],
    ...mutationOptions
  } = options

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(endpoint, data)
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

export default useAdd