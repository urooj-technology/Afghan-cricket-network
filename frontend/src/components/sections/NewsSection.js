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
    <section className="py-16 bg-gray-50">
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
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-48 w-full md:w-80 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        {featuredNews[0].image ? (
                          <img 
                            src={featuredNews[0].image} 
                            alt={featuredNews[0].title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-medium">Featured News</span>
                        )}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {featuredNews[0].category_name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {formatDate(featuredNews[0].published_at || featuredNews[0].created_at)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredNews[0].title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{featuredNews[0].excerpt}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          By {featuredNews[0].author_name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {featuredNews[0].views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Latest News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestNews?.results?.slice(0, 6).map((news) => (
                <article key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    {news.image ? (
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-lg font-medium">News Image</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {news.category_name}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(news.published_at || news.created_at)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">By {news.author_name}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {news.views}
                        </span>
                      </div>
                      <Link
                        href={`/news/${news.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* View All News Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {getTranslation(language, 'home.news.viewAllNews')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}