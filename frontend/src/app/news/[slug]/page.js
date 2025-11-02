'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
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
  const [copied, setCopied] = useState(false)

  const { data: article, isLoading, error } = useFetchData(`/news/${slug}/`, {
    queryKey: ['news', slug],
    enabled: !!slug
  })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = article?.title || ''
  const shareText = article?.excerpt || shareTitle

  useEffect(() => {
    if (article && typeof window !== 'undefined') {
      document.title = article.title
      
      const updateMetaTag = (property, content, isName = false) => {
        const attr = isName ? 'name' : 'property'
        let element = document.querySelector(`meta[${attr}="${property}"]`)
        if (!element) {
          element = document.createElement('meta')
          element.setAttribute(attr, property)
          document.head.appendChild(element)
        }
        element.setAttribute('content', content)
      }

      const imageUrl = article.image ? (article.image.startsWith('http') ? article.image : `${window.location.origin}${article.image}`) : `${window.location.origin}/logo.jpg`
      
      updateMetaTag('og:title', article.title)
      updateMetaTag('og:description', article.excerpt || article.title)
      updateMetaTag('og:image', imageUrl)
      updateMetaTag('og:image:width', '1200')
      updateMetaTag('og:image:height', '630')
      updateMetaTag('og:url', shareUrl)
      updateMetaTag('og:type', 'article')
      updateMetaTag('og:site_name', 'Afghan Cricket Network')
      updateMetaTag('twitter:card', 'summary_large_image', true)
      updateMetaTag('twitter:title', article.title, true)
      updateMetaTag('twitter:description', article.excerpt || article.title, true)
      updateMetaTag('twitter:image', imageUrl, true)
      updateMetaTag('description', article.excerpt || article.title, true)
    }
  }, [article, shareUrl])

  const handleShare = async (platform) => {
    const fullUrl = window.location.href
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank', 'width=600,height=500')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'width=600,height=500')
        break
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`, '_blank')
        break
      case 'instagram':
        await navigator.clipboard.writeText(fullUrl)
        alert('✅ Link copied! Open Instagram and paste it.')
        break
      case 'tiktok':
        await navigator.clipboard.writeText(fullUrl)
        alert('✅ Link copied! Open TikTok and paste it.')
        break
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
      {article && (
        <>
          <Script id="og-meta" strategy="beforeInteractive">
            {`
              if (typeof window !== 'undefined') {
                const meta = [
                  { property: 'og:title', content: ${JSON.stringify(article.title)} },
                  { property: 'og:description', content: ${JSON.stringify(article.excerpt || article.title)} },
                  { property: 'og:image', content: ${JSON.stringify(article.image || '/logo.jpg')} },
                  { property: 'og:url', content: window.location.href },
                  { property: 'og:type', content: 'article' },
                  { name: 'twitter:card', content: 'summary_large_image' },
                  { name: 'twitter:title', content: ${JSON.stringify(article.title)} },
                  { name: 'twitter:description', content: ${JSON.stringify(article.excerpt || article.title)} },
                  { name: 'twitter:image', content: ${JSON.stringify(article.image || '/logo.jpg')} }
                ];
                meta.forEach(m => {
                  const tag = document.createElement('meta');
                  if (m.property) tag.setAttribute('property', m.property);
                  if (m.name) tag.setAttribute('name', m.name);
                  tag.setAttribute('content', m.content);
                  document.head.appendChild(tag);
                });
              }
            `}
          </Script>
        </>
      )}
      <main className="min-h-screen bg-white pt-32">
        <Header />
        
        {/* Hero Section */}
        <div className="border-b border-gray-200">
          {article.image && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover border border-gray-200"
              />
            </div>
          )}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium">
                {article.category_name || 'News'}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(article.published_at || article.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight ${isRTL ? 'font-arabic text-right' : ''}`}>
              {article.title}
            </h1>
            {article.excerpt && (
              <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {article.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between h-14 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link
                href="/news"
                className={`flex items-center text-gray-600 hover:text-gray-900 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                <span className="text-sm font-medium">{getTranslation(language, 'common.backToNews') || 'Back to News'}</span>
              </Link>
              
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2 border transition-colors ${liked ? 'text-red-600 border-red-600 bg-red-50' : 'text-gray-600 border-gray-300 hover:border-red-600 hover:text-red-600'}`}
                >
                  {liked ? <HeartSolidIcon className="w-4 h-4" /> : <HeartIcon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 border transition-colors ${bookmarked ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-gray-300 hover:border-blue-600 hover:text-blue-600'}`}
                >
                  {bookmarked ? <BookmarkSolidIcon className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Author Info */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-blue-600 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className={`text-sm font-semibold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                      {article.author_name || 'ACN Editorial Team'}
                    </h3>
                    <div className={`flex items-center gap-3 text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{article.views?.toLocaleString() || 0} views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <article className="border-b border-gray-200 pb-12 mb-8">
                <div>
                  <div className={`prose prose-lg max-w-none ${isRTL ? 'font-arabic text-right prose-headings:text-right prose-p:text-right' : ''}`}>
                    {article.content ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: article.content }} 
                        className="leading-relaxed text-gray-800"
                      />
                    ) : (
                      <div className="space-y-8">
                        {article.excerpt && (
                          <div className="border-l-4 border-blue-600 pl-6 mb-6">
                            <p className="text-lg text-gray-700 leading-relaxed italic">
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
                        <div className="border border-gray-200 p-6 my-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">{getTranslation(language, 'news.keyHighlights') || 'Key Highlights'}</h3>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {getTranslation(language, 'news.highlight1') || 'Latest match results and performance analysis'}
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {getTranslation(language, 'news.highlight2') || 'Player statistics and career milestones'}
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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

              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Stats */}
              <div className="border border-gray-200 p-6">
                <h3 className={`text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.articleStats') || 'Article Stats'}
                </h3>
                <div className="space-y-3">
                  <div className="border-b border-gray-200 pb-3">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.published') || 'Published'}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {new Date(article.published_at || article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.category') || 'Category'}</span>
                      <span className="text-sm font-semibold text-blue-600">{article.category_name || 'News'}</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.views') || 'Views'}</span>
                      <span className="text-sm font-semibold text-gray-900">{article.views?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                  <div>
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'news.readingTime') || 'Reading Time'}</span>
                      <span className="text-sm font-semibold text-gray-900">5 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="border border-gray-200 p-6">
                <h3 className={`text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.shareArticle') || 'Share Article'}
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 border border-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 border border-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 border border-green-600 hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('instagram')}
                    className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-3 px-4 border border-pink-600 hover:bg-pink-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm font-medium">Instagram</span>
                  </button>
                  <button 
                    onClick={() => handleShare('tiktok')}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-4 border border-gray-900 hover:bg-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span className="text-sm font-medium">TikTok</span>
                  </button>
                  <button 
                    onClick={handleCopyLink}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 border transition-colors ${
                      copied 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-600 border border-blue-600 p-6 text-white">
                <h3 className={`text-sm font-bold mb-3 uppercase tracking-wide ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.stayUpdated') || 'Stay Updated'}
                </h3>
                <p className={`text-blue-100 mb-4 text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {getTranslation(language, 'news.newsletterDesc') || 'Get the latest cricket news.'}
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder={getTranslation(language, 'news.enterEmail') || 'Enter your email'}
                    className="w-full px-3 py-2 border border-white bg-transparent text-white placeholder-blue-200 focus:outline-none focus:border-white text-sm"
                  />
                  <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 hover:bg-gray-100 transition-colors text-sm">
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