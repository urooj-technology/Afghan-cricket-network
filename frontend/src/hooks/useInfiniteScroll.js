import { useState, useEffect, useCallback } from 'react'
import { useFetchData } from './index'

export default function useInfiniteScroll(endpoint, options = {}) {
  const [allData, setAllData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { search = '', filters = {}, ordering = '-created_at', pageSize = 12 } = options

  const { data, isLoading, error } = useFetchData(endpoint, {
    queryKey: [endpoint, 'infinite', currentPage, search, filters, ordering],
    params: {
      page: currentPage,
      page_size: pageSize,
      search,
      ordering,
      ...filters
    }
  })

  // Reset data when search or filters change
  useEffect(() => {
    setAllData([])
    setCurrentPage(1)
    setHasMore(true)
  }, [search, JSON.stringify(filters), ordering])

  // Update data when new page loads
  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setAllData(data.results || [])
      } else {
        setAllData(prev => [...prev, ...(data.results || [])])
        setIsLoadingMore(false)
      }
      
      setHasMore(!!data.next)
    }
  }, [data, currentPage])

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading && !isLoadingMore) {
      setIsLoadingMore(true)
      setCurrentPage(prev => prev + 1)
    }
  }, [hasMore, isLoading, isLoadingMore])

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])

  return {
    data: allData,
    isLoading: isLoading && currentPage === 1,
    isLoadingMore,
    error,
    hasMore,
    loadMore
  }
}