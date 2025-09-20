import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export const useEdit = (endpoint, options = {}) => {
  const queryClient = useQueryClient()
  const {
    onSuccess,
    onError,
    invalidateQueries = [endpoint],
    method = 'PUT',
    ...mutationOptions
  } = options

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const url = `${endpoint}/${id}/`
      const response = method === 'PATCH' 
        ? await api.patch(url, data)
        : await api.put(url, data)
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

export default useEdit