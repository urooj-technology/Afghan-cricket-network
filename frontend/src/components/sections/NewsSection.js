'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const newsData = [
  {
    id: 1,
    title: 'Afghanistan Cricket Team Qualifies for T20 World Cup 2024',
    excerpt: 'Historic qualification marks a new era for Afghan cricket on the global stage. The team showed exceptional performance throughout the qualifying tournament.',
    category: 'International',
    date: '2024-01-15',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: true,
  },
  {
    id: 2,
    title: 'New Cricket Academy Opens in Kabul',
    excerpt: 'State-of-the-art facility to train the next generation of Afghan cricketers. The academy features modern training equipment and experienced coaches.',
    category: 'Domestic',
    date: '2024-01-12',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: false,
  },
  {
    id: 3,
    title: 'Rashid Khan Named Captain for Upcoming Series',
    excerpt: 'Star spinner to lead Afghanistan in crucial international fixtures. Rashid Khan brings experience and leadership to the team.',
    category: 'Team News',
    date: '2024-01-10',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: false,
  },
  {
    id: 4,
    title: 'Youth Cricket Development Program Launched',
    excerpt: 'New initiative to identify and nurture young cricket talent across Afghanistan. The program will focus on grassroots development.',
    category: 'Development',
    date: '2024-01-08',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: false,
  },
  {
    id: 5,
    title: 'Afghanistan vs Pakistan Series Announced',
    excerpt: 'Exciting bilateral series between Afghanistan and Pakistan scheduled for next month. Both teams will play T20 and ODI matches.',
    category: 'International',
    date: '2024-01-05',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: false,
  },
  {
    id: 6,
    title: 'Cricket Equipment Donation Drive',
    excerpt: 'Community initiative to provide cricket equipment to underprivileged players. Donations are being collected across major cities.',
    category: 'Community',
    date: '2024-01-03',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
    featured: false,
  },
]

const categories = [
                { key: 'All', translationKey: 'home.news.categories.all' },
  { key: 'International', translationKey: 'home.news.categories.international' },
  { key: 'Domestic', translationKey: 'home.news.categories.domestic' },
  { key: 'Team News', translationKey: 'home.news.categories.teamNews' },
  { key: 'Development', translationKey: 'home.news.categories.development' },
  { key: 'Community', translationKey: 'home.news.categories.community' }
]

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { language } = useLanguage()

  const filteredNews = selectedCategory === 'All' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory)

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = filteredNews.slice(startIndex, endIndex)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => {
                setSelectedCategory(category.key)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {getTranslation(language, category.translationKey)}
            </button>
          ))}
        </div>

        {/* Featured News */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            {newsData.filter(news => news.featured).map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <div className="h-48 w-full md:w-80 bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        {getTranslation(language, 'home.news.featuredNews')}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {getTranslation(language, `home.news.categories.${news.category.toLowerCase().replace(' ', '')}`)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(news.date)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{news.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{news.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {getTranslation(language, 'home.news.by')} {news.author}
                      </span>
                      <Link
                        href={`/news/${news.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        {getTranslation(language, 'home.news.readMore')}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentNews.filter(news => !news.featured).map((news) => (
            <article key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-medium">News Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getTranslation(language, `home.news.categories.${news.category.toLowerCase().replace(' ', '')}`)}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {formatDate(news.date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {getTranslation(language, 'home.news.by')} {news.author}
                  </span>
                  <Link
                    href={`/news/${news.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {getTranslation(language, 'home.news.readMore')} &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getTranslation(language, 'common.common.previous')}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getTranslation(language, 'common.common.next')}
              </button>
            </nav>
          </div>
        )}

        {/* View All News Button */}
        <div className="text-center mt-12">
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
