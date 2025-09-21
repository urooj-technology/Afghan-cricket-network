'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
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
  UserIcon,
  FireIcon,
  ChartBarIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolidIcon,
  FireIcon as FireSolidIcon
} from '@heroicons/react/24/solid'

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
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center ${isRTL ? 'rtl-content' : ''}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
                <NewspaperIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'news.title') || 'Latest Cricket News')}
              </h1>
              <p className={`text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'news.subtitle') || 'Stay updated with the latest news and insights from Afghan cricket')}
              </p>
              
              {/* Search in Hero */}
              <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                  <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 ${isRTL ? 'right-4' : 'left-4'}`} />
                  <input
                    type="text"
                    placeholder={getTranslation(language, 'news.searchPlaceholder') || 'Search news articles...'}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`w-full py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-full focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-200 text-white placeholder-white/60 ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4'}`}
                  />
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <FireSolidIcon className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold mb-1">{news?.length || 0}</div>
                  <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Latest News</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <StarSolidIcon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold mb-1">{featuredNews?.length || 0}</div>
                  <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Featured</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <ChartBarIcon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold mb-1">{categories?.length || 0}</div>
                  <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <EyeIcon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold mb-1">10K+</div>
                  <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Daily Views</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

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
                <div className="max-w-md mx-auto p-8 border-red-200 bg-red-50 rounded-3xl shadow-xl">
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
                </div>
              </div>
            ) : news && news.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {news.map((article) => (
                    <div key={article.id} className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 rounded-3xl">
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
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="p-4 shadow-lg border-0 bg-white rounded-3xl">
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
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-lg mx-auto p-12 shadow-lg border-0 bg-white rounded-3xl">
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
                </div>
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </RTLWrapper>
  )
}