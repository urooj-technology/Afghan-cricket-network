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
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'news.title') || 'Latest Cricket News'}
              </h1>
              <p className={`text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'news.subtitle') || 'Stay updated with the latest news and insights from Afghan cricket'}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured News */}
          {featuredNews && featuredNews.length > 0 && (
            <section className="mb-20">
              <div className={`flex items-center mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <StarIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.featuredNews') || 'Featured News'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Featured Article */}
                <div className="lg:col-span-2">
                  <Card className="h-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      {featuredNews[0]?.image ? (
                        <img 
                          src={featuredNews[0].image} 
                          alt={featuredNews[0].title}
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className={`text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>
                              {getTranslation(language, 'news.featuredNews') || 'Featured News'}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {getTranslation(language, 'news.featuredNews') || 'Featured'}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {featuredNews[0]?.category_name}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                        <Link href={`/news/${featuredNews[0]?.slug}`}>
                          {featuredNews[0]?.title}
                        </Link>
                      </h3>
                      <p className={`text-gray-600 text-lg leading-relaxed mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {featuredNews[0]?.excerpt}
                      </p>
                      <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center space-x-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CalendarIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>
                              {new Date(featuredNews[0]?.published_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <EyeIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span>{featuredNews[0]?.views}</span>
                          </div>
                        </div>
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <UserIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {featuredNews[0]?.author_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Secondary Featured Articles */}
                <div className="space-y-6">
                  {featuredNews.slice(1, 3).map((article) => (
                    <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative">
                        {article.image ? (
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {getTranslation(language, 'news.noImage')}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {article.category_name}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <StarIcon className="w-5 h-5 text-yellow-400" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className={`text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                        <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <ClockIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>
                              {new Date(article.published_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                            <span>{article.views}</span>
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
          <section className="mb-16">
            <Card className="shadow-lg border-0 bg-white">
              <div className="p-8">
                <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8 ${isRTL ? 'lg:flex-row-reverse lg:space-x-reverse' : ''}`}>
                  <div className="flex-1 max-w-lg">
                    <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right font-arabic' : ''}`}>
                      {getTranslation(language, 'common.buttons.search') || 'Search'}
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
                      <input
                        type="text"
                        placeholder={getTranslation(language, 'news.searchPlaceholder') || 'Search news articles...'}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={`w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4'}`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 min-w-64">
                    <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right font-arabic' : ''}`}>
                      {getTranslation(language, 'common.categories.all') || 'Categories'}
                    </label>
                    <div className="relative">
                      <FunnelIcon className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
                      <select
                        value={filterCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className={`w-full appearance-none py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-lg ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4'}`}
                      >
                        <option value="">{getTranslation(language, 'news.categories.all') || 'All Categories'}</option>
                        {Array.isArray(categories) && categories.map((category) => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* News Grid */}
          <section>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className={`mt-4 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                    {getTranslation(language, 'common.status.loading')}
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <Card className="max-w-md mx-auto p-8 border-red-200 bg-red-50">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold text-red-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                    {getTranslation(language, 'common.error.title')}
                  </h3>
                  <p className={`text-red-700 mb-6 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                    {getTranslation(language, 'common.error.message')}
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className={`bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                  >
                    {getTranslation(language, 'common.error.retry')}
                  </button>
                </Card>
              </div>
            ) : news && news.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {news.map((article) => (
                    <Card key={article.id} className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0">
                      <div className="relative">
                        {article.image ? (
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-56 object-cover"
                          />
                        ) : (
                          <div className="w-full h-56 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className={`text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {getTranslation(language, 'news.noImage')}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            {article.category_name}
                          </span>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        
                        <p className={`text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {article.excerpt}
                        </p>
                        
                        <div className={`flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CalendarIcon className={`w-4 h-4 text-blue-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {new Date(article.published_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <EyeIcon className={`w-4 h-4 text-green-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              <span className="font-medium">{article.views}</span>
                            </div>
                          </div>
                          
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <UserIcon className={`w-4 h-4 text-purple-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                              {article.author_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="flex justify-center mt-16">
                    <Card className="p-4 shadow-lg border-0">
                      <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <button
                          onClick={previousPage}
                          disabled={!pagination.has_previous}
                          className={`px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium ${isRTL ? 'font-arabic' : ''}`}
                        >
                          {getTranslation(language, 'common.pagination.previous')}
                        </button>
                        
                        <div className={`flex items-center space-x-2 mx-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                            const page = i + 1
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
                                  pagination.current_page === page
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                                    : 'border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          })}
                        </div>
                        
                        <button
                          onClick={nextPage}
                          disabled={!pagination.has_next}
                          className={`px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium ${isRTL ? 'font-arabic' : ''}`}
                        >
                          {getTranslation(language, 'common.pagination.next')}
                        </button>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Card className="max-w-lg mx-auto p-12 shadow-lg border-0">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                    {getTranslation(language, 'news.noNews.title')}
                  </h3>
                  <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    {getTranslation(language, 'news.noNews.description')}
                  </p>
                </Card>
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </RTLWrapper>
  )
}