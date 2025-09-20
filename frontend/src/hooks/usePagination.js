import { useState, useMemo } from 'react'
import { useFetchData } from './useFetchData'

export const usePagination = (endpoint, options = {}) => {
  const {
    pageSize = 20,
    search = '',
    filters = {},
    ordering = '',
    ...fetchOptions
  } = options

  const [page, setPage] = useState(1)

  const params = useMemo(() => ({
    page,
    page_size: pageSize,
    ...(search && { search }),
    ...(ordering && { ordering }),
    ...filters
  }), [page, pageSize, search, ordering, filters])

  const queryKey = [endpoint, 'paginated']
  
  const { data, isLoading, error, refetch } = useFetchData(endpoint, {
    queryKey,
    params,
    ...fetchOptions
  })

  const paginationInfo = useMemo(() => {
    if (!data) return null
    
    return {
      count: data.count || 0,
      totalPages: Math.ceil((data.count || 0) / pageSize),
      currentPage: page,
      hasNext: !!data.next,
      hasPrevious: !!data.previous,
      results: data.results || data
    }
  }, [data, page, pageSize])

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= (paginationInfo?.totalPages || 1)) {
      setPage(newPage)
    }
  }

  const nextPage = () => {
    if (paginationInfo?.hasNext) {
      setPage(prev => prev + 1)
    }
  }

  const previousPage = () => {
    if (paginationInfo?.hasPrevious) {
      setPage(prev => prev - 1)
    }
  }

  const resetPage = () => setPage(1)

  return {
    data: paginationInfo?.results || [],
    pagination: paginationInfo,
    isLoading,
    error,
    refetch,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
    currentPage: page
  }
}

export default usePagination