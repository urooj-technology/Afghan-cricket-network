'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../../components/ui/RTLText'
import { RTLFlex } from '../../components/ui/RTLContainer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Link from "next/link"
import { 
  PhotoIcon, 
  VideoCameraIcon,
  DocumentIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { getTextAlign, getFontClass, getFlexDirection, getIconSpacing } from '../../utils/rtl'

export default function Media() {
  const { language, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: media,
    isLoading,
    isLoadingMore,
    error,
    hasMore
  } = useInfiniteScroll('/media', {
    search: searchTerm,
    filters: {},
    ordering: '-created_at',
    pageSize: 12
  })

  // Fetch featured media
  const { data: featuredMedia } = useFetchData('/media/featured', {
    queryKey: ['media', 'featured']
  })

  // Fetch media categories
  const { data: categories } = useFetchData('/media-categories', {
    queryKey: ['media-categories']
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const getMediaIcon = (type) => {
    switch (type) {
      case 'photo':
        return PhotoIcon
      case 'video':
        return VideoCameraIcon
      case 'document':
        return DocumentIcon
      default:
        return PhotoIcon
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'photo':
        return 'bg-blue-100 text-blue-800'
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'gallery':
        return 'bg-green-100 text-green-800'
      case 'document':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'matches':
        return 'bg-blue-100 text-blue-800'
      case 'events':
        return 'bg-green-100 text-green-800'
      case 'training':
        return 'bg-purple-100 text-purple-800'
      case 'awards':
        return 'bg-yellow-100 text-yellow-800'
      case 'behind_scenes':
        return 'bg-pink-100 text-pink-800'
      case 'interviews':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
      
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`text-center ${isRTL ? 'rtl-content' : ''}`}>
              <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'media.title') || 'Media Gallery')}
              </h1>
              <p className={`text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'media.subtitle') || 'Explore photos, videos, and exclusive content from Afghanistan cricket')}
              </p>
              
              {/* Search Field */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-300 ${isRTL ? 'right-4' : 'left-4'}`} />
                  <input
                    type="text"
                    placeholder={String(getTranslation(language, 'media.searchPlaceholder') || 'Search photos, videos, galleries...')}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={`w-full py-4 px-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-lg text-white placeholder-blue-200 ${isRTL ? 'pr-14 pl-6 text-right font-arabic' : 'pl-14 pr-6 text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <PhotoIcon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{String(getTranslation(language, 'media.photos') || 'Photos')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <VideoCameraIcon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-1">100+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{String(getTranslation(language, 'media.videos') || 'Videos')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <StarIcon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-1">50+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{String(getTranslation(language, 'media.featured') || 'Featured')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <EyeIcon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-1">1M+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{String(getTranslation(language, 'common.views') || 'Views')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Featured Media */}
      {featuredMedia && featuredMedia.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <StarIcon className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'media.featuredMedia') || 'Featured Media')}
              </h2>
              <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'media.featuredMediaDesc') || 'Discover the most popular and exclusive content from Afghanistan cricket')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {featuredMedia.slice(0, 3).map((item) => {
                const IconComponent = getMediaIcon(item.media_type)
                return (
                  <div key={item.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col min-h-[500px]" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-black/10"></div>
                      {item.image || item.thumbnail ? (
                        <img 
                          src={item.image || item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white relative z-10">
                          <IconComponent className="w-20 h-20 mb-3" />
                          <span className={`text-lg font-medium capitalize ${isRTL ? 'font-arabic' : ''}`}>
                            {item.media_type}
                          </span>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                        <div className="bg-yellow-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                          <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                            <StarIcon className="w-4 h-4" />
                            {String(getTranslation(language, 'media.featured') || 'Featured')}
                          </span>
                        </div>
                      </div>
                      
                      {/* Media Type Badge */}
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${getTypeColor(item.media_type)} border border-white/30 backdrop-blur-sm`}>
                          {String(getTranslation(language, `media.${item.media_type}`) || item.media_type)}
                        </span>
                      </div>
                      
                      {/* Play Button for Videos */}
                      {item.media_type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/25 backdrop-blur-sm rounded-full p-6">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Views Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                        <div className={`flex items-center text-white text-sm font-medium ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                          <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span>{item.views?.toLocaleString() || 0}</span>
                          <span className={`${isRTL ? 'mr-1 font-arabic' : 'ml-1'}`}>{String(getTranslation(language, 'common.views') || 'views')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h3 className={`font-bold text-lg sm:text-xl mb-4 text-gray-900 line-clamp-2 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {item.title}
                      </h3>
                      
                      {item.description && (
                        <p className={`text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                          {item.description}
                        </p>
                      )}
                      
                      <div className="mt-auto">
                        <Link
                          href={`/media/${item.slug}`}
                          className={`block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${isRTL ? 'font-arabic' : ''}`}
                        >
                          {item.media_type === 'video' ? (
                            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              {String(getTranslation(language, 'media.watchVideo') || 'Watch Video')}
                            </span>
                          ) : (
                            <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                              <EyeIcon className="w-5 h-5" />
                              {String(getTranslation(language, 'common.viewDetails') || 'View Details')}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}



      {/* Media Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-red-600">Error loading media: {error.message}</p>
            </div>
          )}

          {/* Media Grid */}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                {media.map((item) => {
                  const IconComponent = getMediaIcon(item.media_type)
                  return (
                    <div key={item.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col min-h-[450px]" dir={isRTL ? 'rtl' : 'ltr'}>
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-black/10"></div>
                        {item.image || item.thumbnail ? (
                          <img 
                            src={item.image || item.thumbnail} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-white relative z-10">
                            <IconComponent className="w-16 h-16 mb-2" />
                            <span className={`text-sm font-medium capitalize ${isRTL ? 'font-arabic' : ''}`}>
                              {item.media_type}
                            </span>
                          </div>
                        )}
                        
                        {/* Media Type Badge */}
                        <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(item.media_type)} border border-white/30 backdrop-blur-sm`}>
                            {String(getTranslation(language, `media.${item.media_type}`) || item.media_type)}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {item.is_featured && (
                          <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                            <div className="bg-yellow-500/90 backdrop-blur-sm rounded-full p-1.5">
                              <StarIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Views Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3">
                          <div className={`flex items-center text-white text-sm font-medium ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                            <EyeIcon className={`w-4 h-4 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
                            <span>{item.views?.toLocaleString() || 0}</span>
                            <span className={`${isRTL ? 'mr-1 font-arabic' : 'ml-1'}`}>{String(getTranslation(language, 'common.views') || 'views')}</span>
                          </div>
                        </div>
                        
                        {/* Play Button for Videos */}
                        {item.media_type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                        {/* Category and Date */}
                        <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)} border border-current/20`}>
                            {String(getTranslation(language, `media.${item.category}`) || item.category?.replace('_', ' '))}
                          </span>
                          <time className={`text-xs text-gray-500 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {new Date(item.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US')}
                          </time>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`font-bold text-base sm:text-lg mb-3 text-gray-900 line-clamp-2 leading-tight flex-shrink-0 ${isRTL ? 'font-arabic text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                          {item.title}
                        </h3>
                        
                        {/* Description */}
                        {item.description && (
                          <p className={`text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                            {item.description}
                          </p>
                        )}
                        
                        {/* Action Button */}
                        <div className="mt-auto pt-2">
                          <Link
                            href={`/media/${item.slug}`}
                            className={`block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2.5 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base ${isRTL ? 'font-arabic' : ''}`}
                          >
                            {item.media_type === 'video' ? (
                              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                                {String(getTranslation(language, 'media.watchVideo') || 'Watch Video')}
                              </span>
                            ) : (
                              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse gap-2' : 'gap-2'}`}>
                                <EyeIcon className="w-4 h-4" />
                                {String(getTranslation(language, 'common.viewDetails') || 'View Details')}
                              </span>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="flex justify-center mt-12">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                        {String(getTranslation(language, 'common.loading') || 'Loading more...')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* End of Results */}
              {!hasMore && media.length > 0 && (
                <div className="text-center mt-12">
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className={`text-gray-600 font-medium ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {String(getTranslation(language, 'common.endOfResults') || 'You\'ve reached the end of the results')}
                    </p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {media.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-gray-50 rounded-2xl p-12 max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <PhotoIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {String(getTranslation(language, 'media.noMediaFound') || 'No Media Found')}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {String(searchTerm 
                        ? (getTranslation(language, 'media.adjustSearchCriteria') || 'Try adjusting your search criteria.')
                        : (getTranslation(language, 'media.noMediaAvailable') || 'No media files are currently available.'))}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

        <Footer />
      </main>
    </RTLWrapper>
  )
}