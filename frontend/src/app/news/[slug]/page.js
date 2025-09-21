'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardBadge } from '../../../components/ui/Card'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { useFetchData } from '../../../hooks'
import { 
  CalendarIcon,
  EyeIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { language, isRTL } = useLanguage()

  const { data: article, isLoading, error } = useFetchData(`/news/${slug}`, {
    queryKey: ['news', slug],
    enabled: !!slug
  })

  const { data: relatedNews } = useFetchData('/news', {
    queryKey: ['news', 'related'],
    params: { page_size: 3 },
    enabled: !!article
  })

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <LoadingSpinner size="lg" />
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
            <Card className="text-center py-16">
              <h1 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                Article not found
              </h1>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/news"
                className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {getTranslation(language, 'common.buttons.back')}
              </Link>
            </Card>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-6">
              <Link
                href="/news"
                className={`inline-flex items-center text-blue-200 hover:text-white transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {getTranslation(language, 'common.buttons.back')}
              </Link>
            </div>
            
            <div className={`flex items-center space-x-4 mb-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <CardBadge variant="primary" className="bg-white/20 text-white border-white/30">
                {article.category_name}
              </CardBadge>
              {article.is_featured && (
                <CardBadge variant="warning" className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                  Featured
                </CardBadge>
              )}
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
              {article.title}
            </h1>
            
            <div className={`flex flex-wrap items-center gap-8 text-blue-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <UserIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className={isRTL ? 'font-arabic' : ''}>
                  By {article.author_name}
                </span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <CalendarIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <EyeIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-3">
              {/* Featured Image */}
              {article.image && (
                <div className="mb-12">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 md:h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Article Body */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                {/* Excerpt */}
                {article.excerpt && (
                  <div className={`text-xl md:text-2xl text-gray-700 mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 font-medium leading-relaxed ${isRTL ? 'font-arabic text-right border-l-0 border-r-4' : ''}`}>
                    {article.excerpt}
                  </div>
                )}

                {/* Content */}
                <div className={`prose prose-xl max-w-none ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {article.content ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: article.content }} 
                      className="leading-relaxed text-gray-800"
                    />
                  ) : (
                    <p className={`text-lg leading-relaxed text-gray-800 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {article.excerpt || 'Content not available.'}
                    </p>
                  )}
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Author Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  About the Author
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{article.author_name}</p>
                    <p className="text-sm text-gray-600">Sports Journalist</p>
                  </div>
                </div>
                <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Experienced cricket journalist covering Afghan cricket for over 5 years.
                </p>
              </div>

              {/* Article Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Article Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-semibold text-blue-600">{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Published</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(article.published_at || article.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-gray-900">{article.category_name}</span>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Share Article
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    <span className="text-sm font-medium">WhatsApp</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    <span className="text-sm font-medium">Copy Link</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles */}
        {relatedNews && relatedNews.results && relatedNews.results.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Related Articles
                </h2>
                <p className={`text-lg text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Discover more stories from Afghan cricket
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedNews.results.slice(0, 3).map((relatedArticle) => (
                  <div key={relatedArticle.id} className="group">
                    <Card hover className="h-full bg-white rounded-2xl shadow-lg overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <CardImage 
                          src={relatedArticle.image || '/api/placeholder/400/250'} 
                          alt={relatedArticle.title}
                          aspectRatio="aspect-video"
                          className="group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardHeader className="p-6">
                        <CardBadge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
                          {relatedArticle.category_name}
                        </CardBadge>
                        <CardTitle className={`mb-3 text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/news/${relatedArticle.slug}`}>
                            {relatedArticle.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {relatedArticle.excerpt}
                        </CardDescription>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{new Date(relatedArticle.published_at || relatedArticle.created_at).toLocaleDateString()}</span>
                            <span className="flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {relatedArticle.views}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/news"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All News
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