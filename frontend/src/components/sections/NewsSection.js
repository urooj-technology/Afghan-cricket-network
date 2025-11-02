'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const { language } = useLanguage()

  // Fetch featured news
  const { data: featuredNews, isLoading: featuredLoading } = useFetchData('/news/featured', {
    queryKey: ['news', 'featured']
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
            {featuredNews && featuredNews.length > 0 && (
              <div className="mb-12">
                <Link href={`/news/${featuredNews[0].slug || featuredNews[0].id}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        {featuredNews[0].image ? (
                          <img 
                            src={featuredNews[0].image} 
                            alt={featuredNews[0].title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%234F46E5" width="400" height="300"/%3E%3Ctext fill="white" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EFeatured News%3C/text%3E%3C/svg%3E'
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                            <span className="text-white text-xl font-semibold">Featured News</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                            ⭐ Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-800">
                            {featuredNews[0].category_name || 'News'}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {formatDate(featuredNews[0].published_at || featuredNews[0].created_at)}
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {featuredNews[0].title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {featuredNews[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 font-medium">
                              By {featuredNews[0].author_name || 'Admin'}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {featuredNews[0].views || 0}
                            </span>
                          </div>
                          <span className="text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                            Read More
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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