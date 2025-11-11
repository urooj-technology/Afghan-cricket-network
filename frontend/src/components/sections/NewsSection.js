'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const { language, isRTL } = useLanguage()

  // Fetch featured news
  const { data: featuredNews, isLoading: featuredLoading } = useFetchData('/news', {
    queryKey: ['news', 'featured'],
    params: {
      is_featured: true,
      status: 'published',
      ordering: '-published_at'
    }
  })

  // Fetch latest news
  const { data: latestNews, isLoading: latestLoading } = useFetchData('/news', {
    queryKey: ['news', 'latest'],
    params: {
      page_size: 6,
      status: 'published',
      ordering: '-published_at'
    }
  })

  // Fetch categories
  const { data: categories } = useFetchData('/news-categories', {
    queryKey: ['news-categories']
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isLoading = featuredLoading || latestLoading

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'home.news.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslation(language, 'home.news.description')}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Featured News */}
            {featuredNews?.results && featuredNews.results.length > 0 && (
              <div className="mb-16">
                {featuredNews.results.length === 1 ? (
                  // Single featured news - full width
                  featuredNews.results.map((featured) => (
                    <Link key={featured.id} href={`/news/${featured.slug || featured.id}`}>
                      <article className="group relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                          <img 
                            src={featured.image} 
                            alt={featured.title}
                            className="h-full w-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%234F46E5" width="800" height="600"/%3E%3C/svg%3E'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className={`relative p-8 md:p-12 flex flex-col justify-end min-h-[500px] ${isRTL ? 'text-right' : 'text-left'}`}>
                          {/* Featured Badge */}
                          <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'}`}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {getTranslation(language, 'common.featured') || 'Featured'}
                            </span>
                          </div>

                          {/* Category & Date */}
                          <div className={`flex items-center gap-3 mb-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                              {featured.category_name || 'News'}
                            </span>
                            <span className={`text-sm text-white/80 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(featured.published_at || featured.created_at)}</span>
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className={`text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-2 group-hover:text-yellow-300 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                            {featured.title}
                          </h3>

                          {/* Excerpt */}
                          <p className={`text-lg text-white/90 mb-6 leading-relaxed line-clamp-3 max-w-4xl ${isRTL ? 'font-arabic' : ''}`}>
                            {featured.excerpt}
                          </p>

                          {/* Footer */}
                          <div className={`flex items-center justify-between pt-4 border-t border-white/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className={`text-sm text-white/70 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {featured.author_name || 'Admin'}
                              </span>
                              <span className={`text-sm text-white/70 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <EyeIcon className="w-4 h-4" />
                                <span>{featured.views || 0}</span>
                              </span>
                            </div>
                            <span className={`text-yellow-300 font-bold group-hover:gap-3 transition-all inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                              <span>{getTranslation(language, 'common.buttons.readMore') || 'Read More'}</span>
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  // Multiple featured news - grid layout
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredNews.results.map((featured, index) => (
                    <Link key={featured.id} href={`/news/${featured.slug || featured.id}`}>
                      <article className="group relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 h-full">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                          <img 
                            src={featured.image} 
                            alt={featured.title}
                            className="h-full w-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%234F46E5" width="800" height="600"/%3E%3C/svg%3E'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className={`relative p-8 h-full flex flex-col justify-end min-h-[400px] ${isRTL ? 'text-right' : 'text-left'}`}>
                          {/* Featured Badge */}
                          <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'}`}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {getTranslation(language, 'common.featured') || 'Featured'}
                            </span>
                          </div>

                          {/* Category & Date */}
                          <div className={`flex items-center gap-3 mb-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                              {featured.category_name || 'News'}
                            </span>
                            <span className={`text-sm text-white/80 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(featured.published_at || featured.created_at)}</span>
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                            {featured.title}
                          </h3>

                          {/* Excerpt */}
                          <p className={`text-white/90 mb-6 leading-relaxed line-clamp-2 ${isRTL ? 'font-arabic' : ''}`}>
                            {featured.excerpt}
                          </p>

                          {/* Footer */}
                          <div className={`flex items-center justify-between pt-4 border-t border-white/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className={`text-sm text-white/70 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                                {featured.author_name || 'Admin'}
                              </span>
                              <span className={`text-sm text-white/70 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <EyeIcon className="w-4 h-4" />
                                <span>{featured.views || 0}</span>
                              </span>
                            </div>
                            <span className={`text-yellow-300 font-bold group-hover:gap-3 transition-all inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                              <span>{getTranslation(language, 'common.buttons.readMore') || 'Read More'}</span>
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Latest News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestNews?.results?.slice(0, 6).map((news) => (
                <Link key={news.id} href={`/news/${news.slug || news.id}`}>
                  <article className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      {news.image ? (
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%236366F1" width="400" height="300"/%3E%3Ctext fill="white" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENews Image%3C/text%3E%3C/svg%3E'
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">News Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-800">
                          {news.category_name || 'News'}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                          {formatDate(news.published_at || news.created_at)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>By {news.author_name || 'Admin'}</span>
                          <span className="flex items-center">
                            <EyeIcon className="w-3.5 h-3.5 mr-1" />
                            {news.views || 0}
                          </span>
                        </div>
                        <span className="text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                          Read
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* View All News Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {getTranslation(language, 'home.news.viewAllNews')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}