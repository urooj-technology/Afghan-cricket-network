'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import Link from "next/link"
import { 
  PhotoIcon, 
  VideoCameraIcon,
  DocumentIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function Media() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const filters = useMemo(() => ({
    ...(filterType && { media_type: filterType }),
    ...(filterCategory && { category: filterCategory }),
  }), [filterType, filterCategory])

  const {
    data: media,
    pagination,
    isLoading,
    error,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination('/media', {
    search: searchTerm,
    filters,
    ordering: '-created_at',
    pageSize: 12
  })

  // Fetch featured media
  const { data: featuredMedia } = useFetchData('/media/featured', {
    queryKey: ['media', 'featured']
  })

  // Fetch media categories
  const { data: categories } = useFetchData('/media-categories', {
    queryKey: ['media-categories']
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleTypeFilter = (value) => {
    setFilterType(value)
    resetPage()
  }

  const handleCategoryFilter = (value) => {
    setFilterCategory(value)
    resetPage()
  }

  const getMediaIcon = (type) => {
    switch (type) {
      case 'photo':
        return PhotoIcon
      case 'video':
        return VideoCameraIcon
      case 'document':
        return DocumentIcon
      default:
        return PhotoIcon
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'photo':
        return 'bg-blue-100 text-blue-800'
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'gallery':
        return 'bg-green-100 text-green-800'
      case 'document':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'matches':
        return 'bg-blue-100 text-blue-800'
      case 'events':
        return 'bg-green-100 text-green-800'
      case 'training':
        return 'bg-purple-100 text-purple-800'
      case 'awards':
        return 'bg-yellow-100 text-yellow-800'
      case 'behind_scenes':
        return 'bg-pink-100 text-pink-800'
      case 'interviews':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Media Gallery
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore photos, videos, and documents from Afghanistan Cricket Network
            </p>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      {featuredMedia && featuredMedia.length > 0 && (
        <section className="py-8 bg-blue-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
              Featured Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMedia.slice(0, 3).map((item) => {
                const IconComponent = getMediaIcon(item.media_type)
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      {item.image || item.thumbnail ? (
                        <img 
                          src={item.image || item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <IconComponent className="w-16 h-16 text-white" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.media_type)}`}>
                          {item.media_type}
                        </span>
                        <span className="text-xs text-yellow-600 font-medium">Featured</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {item.views} views
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search media..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => handleTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="photo">Photos</option>
                    <option value="video">Videos</option>
                    <option value="gallery">Galleries</option>
                    <option value="document">Documents</option>
                  </select>
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="matches">Matches</option>
                  <option value="events">Events</option>
                  <option value="training">Training</option>
                  <option value="awards">Awards</option>
                  <option value="behind_scenes">Behind the Scenes</option>
                  <option value="interviews">Interviews</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-red-600">Error loading media: {error.message}</p>
            </div>
          )}

          {/* Media Grid */}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {media.map((item) => {
                  const IconComponent = getMediaIcon(item.media_type)
                  return (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                        {item.image || item.thumbnail ? (
                          <img 
                            src={item.image || item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconComponent className="w-12 h-12 text-gray-400" />
                        )}
                        <div className="absolute top-2 right-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.media_type)}`}>
                            {item.media_type}
                          </span>
                        </div>
                        {item.is_featured && (
                          <div className="absolute top-2 left-2">
                            <StarIcon className="w-5 h-5 text-yellow-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                            {item.category?.replace('_', ' ')}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <EyeIcon className="w-3 h-3 mr-1" />
                            {item.views}
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                          <Link
                            href={`/media/${item.slug}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 space-x-2">
                  <button
                    onClick={previousPage}
                    disabled={!pagination.hasPrevious}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 text-sm border rounded-lg ${
                          page === pagination.currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  <button
                    onClick={nextPage}
                    disabled={!pagination.hasNext}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Empty State */}
              {media.length === 0 && (
                <div className="text-center py-16">
                  <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Media Found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterType || filterCategory 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'No media files are currently available.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}