'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { useFetchData } from '../../../hooks'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  EyeIcon,
  UserIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon
} from '@heroicons/react/24/solid'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { language, isRTL } = useLanguage()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const { data: article, isLoading, error } = useFetchData(`/news/${slug}/`, {
    queryKey: ['news', slug],
    enabled: !!slug
  })

  const { data: relatedNews } = useFetchData('/news', {
    queryKey: ['news', 'related'],
    params: { page_size: 3, status: 'published' },
    enabled: !!article
  })

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex justify-center items-center py-32">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className={`mt-4 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'common.loading') || 'Loading article...'}
              </p>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  if (error || !article) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-20">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-12 max-w-md mx-auto">
                <h1 className={`text-2xl font-bold text-red-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.articleNotFound') || 'Article Not Found'}
                </h1>
                <p className={`text-red-700 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.articleNotFoundDesc') || 'The article you are looking for does not exist.'}
                </p>
                <Link
                  href="/news"
                  className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                  {getTranslation(language, 'common.backToNews') || 'Back to News'}
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32">
        <Header />
        
        {/* Hero Section */}
        <div className="relative">
          {article.image ? (
            <div className="h-[60vh] md:h-[70vh] relative overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Hero Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 md:p-12">
                  <div className="max-w-4xl mx-auto">
                    <div className={`flex flex-wrap items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg">
                        {article.category_name || 'News'}
                      </span>
                      {article.is_featured && (
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                          <TagIcon className="w-3 h-3 mr-1" />
                          {getTranslation(language, 'common.featured') || 'Featured'}
                        </span>
                      )}
                      <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {getTranslation(language, 'news.readingTime') || '5 min read'}
                      </span>
                    </div>
                    <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {article.title}
                    </h1>
                    {article.excerpt && (
                      <p className={`text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl ${isRTL ? 'font-arabic text-right' : ''}`}>
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 md:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {article.category_name || 'News'}
                  </span>
                  {article.is_featured && (
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                      {getTranslation(language, 'common.featured') || 'Featured'}
                    </span>
                  )}
                </div>
                <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className={`text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    {article.excerpt}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link
                href="/news"
                className={`flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-50 px-3 py-2 rounded-lg ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                <span className="font-semibold">{getTranslation(language, 'common.backToNews') || 'Back to News'}</span>
              </Link>
              
              <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${liked ? 'text-red-600 bg-red-50 shadow-md' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'}`}
                >
                  {liked ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${bookmarked ? 'text-blue-600 bg-blue-50 shadow-md' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  {bookmarked ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                </button>
                <button className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 transform hover:scale-105">
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="xl:col-span-3">
              {/* Author Info Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
                <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <UserIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className={`text-lg font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                        {article.author_name || 'ACN Editorial Team'}
                      </h3>
                      <p className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                        {getTranslation(language, 'news.authorRole') || 'Sports Journalist & Cricket Analyst'}
                      </p>
                      <div className={`flex items-center mt-1 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span>{getTranslation(language, 'news.activeNow') || 'Active now'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex flex-wrap items-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center px-3 py-2 bg-blue-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CalendarIcon className={`w-4 h-4 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className="text-blue-700 font-medium">{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center px-3 py-2 bg-green-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <EyeIcon className={`w-4 h-4 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className="text-green-700 font-medium">{article.views?.toLocaleString() || 0}</span>
                    </div>
                    <div className={`flex items-center px-3 py-2 bg-purple-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <ClockIcon className={`w-4 h-4 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      <span className="text-purple-700 font-medium">5 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-12">
                  <div className={`prose prose-xl max-w-none ${isRTL ? 'font-arabic text-right prose-headings:text-right prose-p:text-right' : ''}`}>
                    {article.content ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: article.content }} 
                        className="leading-relaxed text-gray-800"
                      />
                    ) : (
                      <div className="space-y-8">
                        {article.excerpt && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium italic">
                              "{article.excerpt}"
                            </p>
                          </div>
                        )}
                        <p className="text-lg text-gray-700 leading-relaxed">
                          This comprehensive news article provides in-depth coverage of the latest developments in Afghan cricket. Our editorial team brings you detailed analysis, expert insights, and exclusive coverage of matches, player performances, and team strategies.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          From grassroots cricket development to international competitions, we cover every aspect of Afghanistan's cricket journey. Our commitment to accurate reporting and timely updates ensures you stay informed about all the important happenings in Afghan cricket.
                        </p>
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{getTranslation(language, 'news.keyHighlights') || 'Key Highlights'}</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {getTranslation(language, 'news.highlight1') || 'Latest match results and performance analysis'}
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {getTranslation(language, 'news.highlight2') || 'Player statistics and career milestones'}
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {getTranslation(language, 'news.highlight3') || 'Team strategy and upcoming fixtures'}
                            </li>
                          </ul>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Stay connected with Afghan Cricket Network for the most comprehensive coverage of cricket in Afghanistan. Follow us for real-time updates, exclusive interviews, and expert analysis from the world of Afghan cricket.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="bg-gray-50 px-6 md:px-12 py-8">
                  <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${liked ? 'text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg' : 'text-gray-700 bg-white hover:bg-red-50 hover:text-red-600 shadow-md'} ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        {liked ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                        <span className={isRTL ? 'font-arabic' : ''}>{getTranslation(language, 'news.like') || 'Like'}</span>
                      </button>
                      <button className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-md transition-all duration-200 transform hover:scale-105 ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}>
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>{getTranslation(language, 'news.comment') || 'Comment'}</span>
                      </button>
                      <button className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white hover:bg-green-50 hover:text-green-600 shadow-md transition-all duration-200 transform hover:scale-105 ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}>
                        <ShareIcon className="w-5 h-5" />
                        <span>{getTranslation(language, 'news.share') || 'Share'}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${bookmarked ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg' : 'text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 shadow-md'} ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}
                    >
                      {bookmarked ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                      <span>{getTranslation(language, 'news.saveArticle') || 'Save Article'}</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className={`text-lg font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'font-arabic text-right flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <TagIcon className="w-4 h-4 text-white" />
                  </div>
                  {getTranslation(language, 'news.articleStats') || 'Article Stats'}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.published') || 'Published'}</span>
                      <span className="font-bold text-gray-900">
                        {new Date(article.published_at || article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.category') || 'Category'}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">{article.category_name || 'News'}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.views') || 'Views'}</span>
                      <span className="font-bold text-green-600 text-lg">{article.views?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.readingTime') || 'Reading Time'}</span>
                      <span className="font-bold text-purple-600">5 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className={`text-lg font-bold text-gray-900 mb-6 flex items-center ${isRTL ? 'font-arabic text-right flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                    <ShareIcon className="w-4 h-4 text-white" />
                  </div>
                  {getTranslation(language, 'news.shareArticle') || 'Share Article'}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span className="font-semibold">{getTranslation(language, 'news.twitter') || 'Twitter'}</span>
                  </button>
                  <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 px-6 rounded-2xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-semibold">{getTranslation(language, 'news.facebook') || 'Facebook'}</span>
                  </button>
                  <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="font-semibold">{getTranslation(language, 'news.whatsapp') || 'WhatsApp'}</span>
                  </button>
                  <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">{getTranslation(language, 'news.copyLink') || 'Copy Link'}</span>
                  </button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl p-6 text-white">
                <h3 className={`text-lg font-bold mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.stayUpdated') || 'Stay Updated'}
                </h3>
                <p className={`text-indigo-100 mb-6 text-sm leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.newsletterDesc') || 'Get the latest cricket news and updates delivered to your inbox.'}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder={getTranslation(language, 'news.enterEmail') || 'Enter your email'}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full bg-white text-indigo-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors">
                    {getTranslation(language, 'news.subscribe') || 'Subscribe'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedNews && relatedNews.results && relatedNews.results.length > 0 && (
          <section className="bg-gradient-to-br from-gray-50 to-indigo-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.relatedArticles') || 'Related Articles'}
                </h2>
                <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'news.relatedDesc') || 'Discover more compelling stories and insights from the world of Afghan cricket'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedNews.results.slice(0, 3).map((relatedArticle, index) => (
                  <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                      <div className="relative overflow-hidden">
                        {relatedArticle.image ? (
                          <img 
                            src={relatedArticle.image} 
                            alt={relatedArticle.title}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-56 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center group-hover:from-blue-600 group-hover:via-indigo-700 group-hover:to-purple-800 transition-all duration-500">
                            <div className="text-center text-white">
                              <UserIcon className="w-16 h-16 mx-auto mb-3 opacity-80" />
                              <p className="font-semibold">Cricket News</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {relatedArticle.category_name || 'News'}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className={`text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {relatedArticle.title}
                        </h3>
                        <p className={`text-gray-600 mb-6 line-clamp-3 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {relatedArticle.excerpt}
                        </p>
                        <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className="font-medium">{new Date(relatedArticle.published_at || relatedArticle.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className={`flex items-center text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className="font-medium">{relatedArticle.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-16">
                <Link
                  href="/news"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <span className={isRTL ? 'font-arabic' : ''}>{getTranslation(language, 'news.exploreAll') || 'Explore All Articles'}</span>
                  <ArrowLeftIcon className={`w-5 h-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </RTLWrapper>
  )
}