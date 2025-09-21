'use client'

import { useParams } from 'next/navigation'
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
  PlayIcon,
  PhotoIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon,
  DocumentIcon,
  UserIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline'

export default function MediaDetailPage() {
  const { slug } = useParams()
  const { language, isRTL } = useLanguage()

  const { data: media, isLoading, error } = useFetchData(`/media/${slug}`, {
    queryKey: ['media', slug],
    enabled: !!slug
  })

  const { data: relatedMedia } = useFetchData('/media', {
    queryKey: ['media', 'related'],
    params: { page_size: 6 },
    enabled: !!media
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

  if (error || !media) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-20">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PhotoIcon className="w-10 h-10 text-red-600" />
                </div>
                <h1 className={`text-2xl font-bold text-red-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {String(getTranslation(language, 'media.mediaNotFound') || 'Media not found')}
                </h1>
                <p className={`text-red-700 mb-6 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {String(getTranslation(language, 'media.mediaNotFoundDesc') || 'The requested media file could not be found.')}
                </p>
                <Link 
                  href="/media" 
                  className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  {isRTL ? (
                    <ArrowLeftIcon className="w-5 h-5 ml-2 rotate-180" />
                  ) : (
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  )}
                  Back to Media
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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Link 
              href="/media" 
              className={`inline-flex items-center text-purple-200 hover:text-white mb-8 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? (
                <ArrowLeftIcon className="w-5 h-5 ml-2 rotate-180" />
              ) : (
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
              )}
              <span className={isRTL ? 'font-arabic' : ''}>
                {String(getTranslation(language, 'common.backToMedia') || 'Back to Media')}
              </span>
            </Link>
            
            <div className={`flex flex-wrap items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse justify-center' : 'justify-center'}`}>
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg capitalize">
                {String(getTranslation(language, `media.${media.media_type}`) || media.media_type)}
              </span>
              <span className="bg-white/20 text-purple-200 px-6 py-3 rounded-full text-lg font-medium border-2 border-purple-400/30">
                {String(getTranslation(language, `media.${media.category}`) || media.category_name)}
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-8 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {media.title}
            </h1>
            
            <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-purple-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <CalendarIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span className={isRTL ? 'font-arabic' : ''}>
                  {new Date(media.created_at).toLocaleDateString(isRTL ? (language === 'fa' ? 'fa-IR' : 'ps-AF') : 'en-US')}
                </span>
              </div>
              <div className={`flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <EyeIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                <span>{media.views?.toLocaleString() || 0} {String(getTranslation(language, 'common.views') || 'views')}</span>
              </div>
              {media.author && (
                <div className={`flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <UserIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className={isRTL ? 'font-arabic' : ''}>{media.author}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 ${isRTL ? 'xl:grid-flow-col-dense' : ''}`}>
              {/* Media Content */}
              <div className={`xl:col-span-3 ${isRTL ? 'xl:order-2' : ''}`}>
                {/* Media Player/Viewer */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden mb-6 sm:mb-8 hover:shadow-3xl transition-shadow duration-300">
                  {media.media_type === 'video' ? (
                    <div className="relative aspect-video bg-black">
                      {media.file_url ? (
                        <video
                          controls
                          className="w-full h-full"
                          poster={media.thumbnail || media.image || '/api/placeholder/800/450'}
                        >
                          <source src={media.file_url} type="video/mp4" />
                          <source src={media.file_url} type="video/webm" />
                          <source src={media.file_url} type="video/ogg" />
                          {String(getTranslation(language, 'media.videoNotSupported') || 'Your browser does not support the video tag.')}
                        </video>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <div className="text-center text-white p-6">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                              <PlayIcon className="w-10 h-10 sm:w-12 sm:h-12 opacity-70" />
                            </div>
                            <p className={`text-base sm:text-lg ${isRTL ? 'font-arabic' : ''}`}>
                              {String(getTranslation(language, 'media.videoNotAvailable') || 'Video not available')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : media.media_type === 'document' ? (
                    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:p-12 text-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <DocumentIcon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                        {String(getTranslation(language, 'media.document') || 'Document')}
                      </h3>
                      <p className={`text-gray-600 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                        {media.description || media.title}
                      </p>
                      {media.file_url && (
                        <a
                          href={media.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                        >
                          <DocumentIcon className="w-5 h-5" />
                          {String(getTranslation(language, 'common.viewDocument') || 'View Document')}
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="relative group">
                      <img
                        src={media.file_url || media.image || '/api/placeholder/800/600'}
                        alt={media.title}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className={`absolute top-4 sm:top-6 ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}`}>
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3">
                          <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 hover:shadow-2xl transition-shadow duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className={`flex items-center mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center ${isRTL ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`}>
                      <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                      {String(getTranslation(language, 'common.description') || 'Description')}
                    </h2>
                  </div>
                  <div className="prose prose-base sm:prose-lg max-w-none">
                    <p className={`text-gray-700 leading-relaxed text-base sm:text-lg ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                      {media.description || `${media.title} - ${String(getTranslation(language, 'media.defaultDescription') || 'A captivating piece from our media collection showcasing the best of Afghan cricket.')}`}
                    </p>
                  </div>

                  {/* Media Stats */}
                  <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
                    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                          <EyeIcon className={`w-4 h-4 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={`text-xs sm:text-sm text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {String(getTranslation(language, 'common.views') || 'Views')}
                          </span>
                        </div>
                        <div className={`text-lg sm:text-xl font-bold text-blue-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                          {media.views?.toLocaleString() || 0}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                          <CalendarIcon className={`w-4 h-4 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={`text-xs sm:text-sm text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {String(getTranslation(language, 'common.published') || 'Published')}
                          </span>
                        </div>
                        <div className={`text-sm sm:text-base font-semibold text-green-600 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                          {new Date(media.created_at).toLocaleDateString(isRTL ? (language === 'fa' ? 'fa-IR' : 'ps-AF') : 'en-US')}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                          <TagIcon className={`w-4 h-4 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={`text-xs sm:text-sm text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {String(getTranslation(language, 'common.type') || 'Type')}
                          </span>
                        </div>
                        <div className={`text-sm sm:text-base font-semibold text-purple-600 capitalize ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                          {String(getTranslation(language, `media.${media.media_type}`) || media.media_type)}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                          <ClockIcon className={`w-4 h-4 text-orange-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className={`text-xs sm:text-sm text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {String(getTranslation(language, 'common.category') || 'Category')}
                          </span>
                        </div>
                        <div className={`text-sm sm:text-base font-semibold text-orange-600 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                          {String(getTranslation(language, `media.${media.category}`) || media.category_name)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {media.tags && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        Tags
                      </h3>
                      <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        {media.tags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className={`bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:from-purple-200 hover:to-purple-300 transition-all duration-200 ${isRTL ? 'font-arabic' : ''}`}
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button className={`flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all duration-200 transform hover:scale-105 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                          <HeartIcon className="w-5 h-5" />
                          <span>Like</span>
                        </button>
                        <button className={`flex items-center gap-2 text-gray-600 hover:text-green-500 transition-all duration-200 transform hover:scale-105 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                          <ShareIcon className="w-5 h-5" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className={`flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-all duration-200 transform hover:scale-105 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                        <BookmarkIcon className="w-5 h-5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className={`xl:col-span-1 space-y-4 sm:space-y-6 ${isRTL ? 'xl:order-1' : ''}`}>
                {/* Media Info */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className={`text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                    {String(getTranslation(language, 'media.mediaInformation') || 'Media Information')}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, 'common.type') || 'Type')}
                      </div>
                      <div className={`font-semibold capitalize text-purple-600 text-sm sm:text-base ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, `media.${media.media_type}`) || media.media_type)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, 'common.category') || 'Category')}
                      </div>
                      <div className={`font-semibold text-blue-600 text-sm sm:text-base ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, `media.${media.category}`) || media.category_name)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, 'common.published') || 'Published')}
                      </div>
                      <div className={`font-semibold text-sm sm:text-base ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {new Date(media.created_at).toLocaleDateString(isRTL ? (language === 'fa' ? 'fa-IR' : 'ps-AF') : 'en-US')}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                        {String(getTranslation(language, 'common.views') || 'Views')}
                      </div>
                      <div className={`font-semibold text-green-600 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                        {media.views?.toLocaleString() || 0}
                      </div>
                    </div>
                    {media.file_size && (
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          {String(getTranslation(language, 'common.fileSize') || 'File Size')}
                        </div>
                        <div className={`font-semibold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                          {media.file_size}
                        </div>
                      </div>
                    )}
                    {media.duration && (
                      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                        <div className={`text-xs sm:text-sm text-gray-600 mb-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          {String(getTranslation(language, 'common.duration') || 'Duration')}
                        </div>
                        <div className={`font-semibold text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                          {media.duration}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Download/Share */}
                <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className={`text-lg font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                    Actions
                  </h3>
                  <div className="space-y-4">
                    {media.file_url && (
                      <a
                        href={media.file_url}
                        download
                        className={`block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 font-semibold ${isRTL ? 'font-arabic' : ''}`}
                      >
                        Download
                      </a>
                    )}
                    <button className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 font-semibold ${isRTL ? 'font-arabic' : ''}`}>
                      Share
                    </button>
                    <button className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 font-semibold ${isRTL ? 'font-arabic' : ''}`}>
                      Add to Collection
                    </button>
                  </div>
                </div>

                {/* Related Media */}
                {relatedMedia && relatedMedia.results && relatedMedia.results.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
                    <h3 className={`text-lg font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                      Related Media
                    </h3>
                    <div className="space-y-4">
                      {relatedMedia.results.slice(0, 3).map((item) => (
                        <Link
                          key={item.id}
                          href={`/media/${item.slug}`}
                          className="block group"
                        >
                          <div className={`flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-20 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={item.thumbnail || item.file_url || '/api/placeholder/100/75'}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                              <h4 className={`text-sm font-semibold text-gray-900 group-hover:text-purple-600 line-clamp-2 transition-colors duration-200 ${isRTL ? 'font-arabic' : ''}`}>
                                {item.title}
                              </h4>
                              <p className={`text-xs text-gray-500 mt-2 ${isRTL ? 'font-arabic' : ''}`}>
                                {item.media_type} • {item.views || 0} views
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </RTLWrapper>
  )
}