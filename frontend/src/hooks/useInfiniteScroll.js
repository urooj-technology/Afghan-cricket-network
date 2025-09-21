import { useState, useEffect, useCallback, useMemo } from 'react'
import { useFetchData } from './useFetchData'

export const useInfiniteScroll = (endpoint, options = {}) => {
  const {
    pageSize = 12,
    search = '',
    filters = {},
    ordering = '',
    threshold = 100,
    ...fetchOptions
  } = options

  const [page, setPage] = useState(1)
  const [allData, setAllData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const params = useMemo(() => ({
    page,
    page_size: pageSize,
    ...(search && { search }),
    ...(ordering && { ordering }),
    ...filters
  }), [page, pageSize, search, ordering, filters])

  const queryKey = [endpoint, 'infinite', page, JSON.stringify(params)]
  
  const { data, isLoading, error, refetch } = useFetchData(endpoint, {
    queryKey,
    params,
    enabled: hasMore,
    ...fetchOptions
  })

  // Reset when search or filters change
  useEffect(() => {
    setPage(1)
    setAllData([])
    setHasMore(true)
    setIsLoadingMore(false)
  }, [search, JSON.stringify(filters), ordering])

  // Handle new data
  useEffect(() => {
    if (data && data.results) {
      if (page === 1) {
        setAllData(data.results)
      } else {
        setAllData(prev => [...prev, ...data.results])
      }
      setHasMore(!!data.next)
      setIsLoadingMore(false)
    }
  }, [data, page])

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoadingMore || !hasMore || isLoading) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }, [isLoadingMore, hasMore, isLoading, threshold])

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && !isLoading) {
      setIsLoadingMore(true)
      setPage(prev => prev + 1)
    }
  }, [isLoadingMore, hasMore, isLoading])

  const reset = useCallback(() => {
    setPage(1)
    setAllData([])
    setHasMore(true)
    setIsLoadingMore(false)
  }, [])

  return {
    data: allData,
    isLoading: isLoading && page === 1,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    reset,
    refetch,
    totalCount: data?.count || 0
  }
}

export default useInfiniteScroll