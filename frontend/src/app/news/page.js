'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardBadge } from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import { 
  CalendarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function NewsPage() {
  const { language, isRTL } = useLanguage()
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

  const { data: featuredNews } = useFetchData('/news/featured', {
    queryKey: ['news', 'featured']
  })

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
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'news.title')}
              </h1>
              <p className={`text-xl text-blue-100 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'news.subtitle')}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured News */}
          {featuredNews && featuredNews.length > 0 && (
            <section className="mb-16">
              <div className={`flex items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <StarIcon className={`w-6 h-6 text-yellow-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.featuredNews')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Featured Article */}
                <Card className="lg:row-span-2" hover>
                  <CardImage 
                    src={featuredNews[0]?.image || '/api/placeholder/600/400'} 
                    alt={featuredNews[0]?.title}
                    aspectRatio="aspect-[4/3]"
                  />
                  <CardHeader>
                    <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CardBadge variant="warning">
                        {getTranslation(language, 'news.featuredNews')}
                      </CardBadge>
                      <CardBadge variant="primary">{featuredNews[0]?.category_name}</CardBadge>
                    </div>
                    <CardTitle size="text-2xl" className={`mb-3 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                      <Link href={`/news/${featuredNews[0]?.slug}`}>
                        {featuredNews[0]?.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className={`text-base leading-relaxed mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {featuredNews[0]?.excerpt}
                    </CardDescription>
                    <div className={`flex items-center space-x-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                        {new Date(featuredNews[0]?.published_at).toLocaleDateString()}
                      </div>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                        {featuredNews[0]?.views}
                      </div>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <UserIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                        {featuredNews[0]?.author_name}
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Secondary Featured Articles */}
                <div className="space-y-6">
                  {featuredNews.slice(1, 3).map((article) => (
                    <Card key={article.id} hover>
                      <div className={`flex space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className="w-32 h-24 flex-shrink-0">
                          <img 
                            src={article.image || '/api/placeholder/200/150'} 
                            alt={article.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`flex items-center space-x-2 mb-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <CardBadge variant="secondary" className="text-xs">{article.category_name}</CardBadge>
                            <StarIcon className="w-3 h-3 text-yellow-500" />
                          </div>
                          <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                            <Link href={`/news/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          <div className={`flex items-center space-x-3 text-xs text-gray-500 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <ClockIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                              {new Date(article.published_at).toLocaleDateString()}
                            </div>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <EyeIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                              {article.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Search and Filters */}
          <section className="mb-12">
            <Card padding="p-6">
              <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6 ${isRTL ? 'lg:flex-row-reverse lg:space-x-reverse' : ''}`}>
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      placeholder={getTranslation(language, 'common.buttons.search')}
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${isRTL ? 'pr-10 pl-4 text-right font-arabic' : 'pl-10 pr-4'}`}
                    />
                  </div>
                </div>
                <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <FunnelIcon className="w-5 h-5 text-gray-500" />
                    <select
                      value={filterCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className={`border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px] ${isRTL ? 'text-right font-arabic' : ''}`}
                    >
                      <option value="">{getTranslation(language, 'common.categories.all')}</option>
                      {categories?.results?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(searchTerm || filterCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setFilterCategory('')
                        resetPage()
                      }}
                      className={`px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {getTranslation(language, 'common.buttons.clear')}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          </section>

          {/* Loading State */}
          {isLoading && <LoadingSpinner size="lg" />}

          {/* Error State */}
          {error && (
            <Card background="bg-red-50" border="border-red-200" className="mb-8">
              <div className="text-center py-8">
                <p className={`text-red-600 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'common.status.error')}: {error.message}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                >
                  {getTranslation(language, 'common.buttons.tryAgain')}
                </button>
              </div>
            </Card>
          )}

          {/* News Grid */}
          {!isLoading && !error && (
            <>
              <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {news.map((article) => (
                    <Card key={article.id} hover>
                      <CardImage 
                        src={article.image || '/api/placeholder/400/250'} 
                        alt={article.title}
                      />
                      <CardHeader>
                        <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CardBadge variant="primary">{article.category_name}</CardBadge>
                          {article.is_featured && <StarIcon className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <CardTitle className={`mb-3 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className={`mb-4 line-clamp-3 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {article.excerpt}
                        </CardDescription>
                        <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                              {new Date(article.published_at || article.created_at).toLocaleDateString()}
                            </div>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                              {article.views}
                            </div>
                          </div>
                          <span className={`text-xs font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {getTranslation(language, 'home.news.by')} {article.author_name}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <section className="flex justify-center">
                  <Card padding="p-4">
                    <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <button
                        onClick={previousPage}
                        disabled={!pagination.hasPrevious}
                        className={`px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {getTranslation(language, 'common.buttons.previous')}
                      </button>
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
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
                        className={`px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {getTranslation(language, 'common.buttons.next')}
                      </button>
                    </div>
                    <div className={`text-center mt-4 text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                      {getTranslation(language, 'common.status.showing')} {((pagination.currentPage - 1) * 12) + 1} {getTranslation(language, 'common.time.to')} {Math.min(pagination.currentPage * 12, pagination.count)} {getTranslation(language, 'common.time.of')} {pagination.count}
                    </div>
                  </Card>
                </section>
              )}

              {/* Empty State */}
              {news.length === 0 && (
                <Card className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {searchTerm || filterCategory ? getTranslation(language, 'common.status.notFound') : getTranslation(language, 'common.status.noData')}
                    </h3>
                    <p className={`text-gray-600 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                      {searchTerm || filterCategory 
                        ? getTranslation(language, 'news.tryAdjusting')
                        : getTranslation(language, 'news.checkBackLater')}
                    </p>
                    {(searchTerm || filterCategory) && (
                      <button
                        onClick={() => {
                          setSearchTerm('')
                          setFilterCategory('')
                          resetPage()
                        }}
                        className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {getTranslation(language, 'common.buttons.clearFilters')}
                      </button>
                    )}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
        
        <Footer />
      </main>
    </RTLWrapper>
  )
}