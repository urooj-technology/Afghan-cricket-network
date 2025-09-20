'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import { 
  CalendarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function NewsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const filters = useMemo(() => ({
    status: 'published',
    ...(filterCategory && { category: filterCategory }),
  }), [filterCategory])

  const {
    data: news,
    pagination,
    isLoading,
    error,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination('/news', {
    search: searchTerm,
    filters,
    ordering: '-published_at',
    pageSize: 12
  })

  // Fetch featured news
  const { data: featuredNews } = useFetchData('/news/featured', {
    queryKey: ['news', 'featured']
  })

  // Fetch categories for filter
  const { data: categories } = useFetchData('/news-categories', {
    queryKey: ['news-categories']
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleCategoryChange = (value) => {
    setFilterCategory(value)
    resetPage()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {getTranslation(language, 'news.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getTranslation(language, 'news.subtitle')}
            </p>
          </div>

          {/* Featured News */}
          {featuredNews && featuredNews.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredNews.slice(0, 3).map((article) => (
                  <div key={article.id} className="glass rounded-2xl overflow-hidden hover-glow group">
                    {article.image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-yellow-600 font-medium">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="form-input pl-10 bg-white/50"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-input bg-white/50 min-w-[150px]"
                >
                  <option value="">All Categories</option>
                  {categories?.results?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-red-600">Error loading news: {error.message}</p>
            </div>
          )}

          {/* News Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {news.map((article) => (
                <article key={article.id} className="glass rounded-2xl overflow-hidden hover-glow group">
                  {article.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {article.category_name}
                      </span>
                      {article.is_featured && (
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <span className="text-xs">By {article.author_name}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
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
          {!isLoading && !error && news.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterCategory ? 'No news found' : 'No news available'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Check back later for the latest cricket news.'}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}