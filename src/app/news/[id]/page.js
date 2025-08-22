'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { CalendarIcon, UserIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const newsData = {
  1: {
    id: 1,
    titleKey: 'news.newsTitles.t20WorldCupQualification',
    excerptKey: 'news.newsExcerpts.t20WorldCupQualification',
    contentKey: 'news.newsContent.t20WorldCupQualification',
    category: 'international',
    date: '2024-01-15',
    author: 'ACN Staff',
    image: '/api/placeholder/800/400',
    tags: ['T20 World Cup', 'Qualification', 'International', 'Afghanistan'],
    relatedNews: [2, 3]
  },
  2: {
    id: 2,
    titleKey: 'news.newsTitles.newCricketAcademy',
    excerptKey: 'news.newsExcerpts.newCricketAcademy', 
    contentKey: 'news.newsContent.newCricketAcademy',
    category: 'domestic',
    date: '2024-01-12',
    author: 'ACN Staff',
    image: '/api/placeholder/800/400',
    tags: ['Academy', 'Kabul', 'Development', 'Training'],
    relatedNews: [1, 3]
  },
  3: {
    id: 3,
    titleKey: 'news.newsTitles.rashidKhanCaptain',
    excerptKey: 'news.newsExcerpts.rashidKhanCaptain',
    contentKey: 'news.newsContent.rashidKhanCaptain',
    category: 'teamNews',
    date: '2024-01-10',
    author: 'ACN Staff',
    image: '/api/placeholder/800/400',
    tags: ['Captain', 'Rashid Khan', 'Leadership', 'Team News'],
    relatedNews: [1, 2]
  }
}

export default function NewsDetail() {
  const params = useParams()
  const { language } = useLanguage()
  const article = newsData[params.id]

  if (!article) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {getTranslation(language, `news.categories.${article.category}`)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, article.titleKey)}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, article.excerptKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Article Meta */}
          <div className="flex items-center justify-between mb-8 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString(language === 'ps' ? 'fa-IR' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TagIcon className="w-4 h-4" />
              <span>{getTranslation(language, `news.categories.${article.category}`)}</span>
            </div>
          </div>

          {/* Article Image */}
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-gray-500 text-4xl">📰</span>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {getTranslation(language, article.contentKey)}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {getTranslation(language, 'news.tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {article.relatedNews && article.relatedNews.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {getTranslation(language, 'news.relatedArticles')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.relatedNews.map((relatedId) => {
                  const relatedArticle = newsData[relatedId]
                  if (!relatedArticle) return null
                  
                  return (
                    <Link 
                      key={relatedId}
                      href={`/news/${relatedId}`}
                      className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {getTranslation(language, relatedArticle.titleKey)}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {getTranslation(language, relatedArticle.excerptKey)}
                      </p>
                      <span className="text-sm text-blue-600">
                        {getTranslation(language, 'news.readMore')} →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Back to News */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link 
              href="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {getTranslation(language, 'news.backToNews')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
