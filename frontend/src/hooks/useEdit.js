import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

export const useEdit = (endpoint, options = {}) => {
  const queryClient = useQueryClient()
  const {
    onSuccess,
    onError,
    invalidateQueries = [endpoint],
    method = 'PATCH',
    ...mutationOptions
  } = options

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const cleanEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint
      const url = `${cleanEndpoint}/${id}/`
      const config = {}
      if (data instanceof FormData) {
        config.headers = {
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = method === 'PATCH' 
        ? await api.patch(url, data, config)
        : await api.put(url, data, config)
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