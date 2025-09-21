'use client'

import { useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardBadge } from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import Link from 'next/link'
import { 
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  TrophyIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export default function EventsPage() {
  const { language, isRTL } = useLanguage()
  const filters = useMemo(() => ({
    is_published: true,
  }), [])

  const {
    data: events,
    pagination,
    isLoading,
    error,
    goToPage,
    nextPage,
    previousPage
  } = usePagination('/events', {
    filters,
    ordering: '-date',
    pageSize: 16
  })

  const { data: featuredEvents } = useFetchData('/events/featured', {
    queryKey: ['events', 'featured']
  })

  const { data: upcomingEvents } = useFetchData('/events/upcoming', {
    queryKey: ['events', 'upcoming']
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'ongoing': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'international': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'domestic': return 'bg-green-50 text-green-700 border-green-200'
      case 'training': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'tournament': return 'bg-orange-50 text-orange-700 border-orange-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return CheckCircleIcon
      case 'ongoing': return PlayCircleIcon
      case 'completed': return ExclamationCircleIcon
      default: return CheckCircleIcon
    }
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={isRTL ? 'text-right' : 'text-center'}>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, 'events.title')}
              </h1>
              <p className={`text-lg sm:text-xl md:text-2xl text-green-100 max-w-4xl mb-12 leading-relaxed ${isRTL ? 'font-arabic ml-0 mr-auto' : 'mx-auto'}`}>
                {getTranslation(language, 'events.subtitle')}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isRTL ? 'text-right' : 'text-center'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {upcomingEvents?.length || 0}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.upcoming')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {featuredEvents?.length || 0}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.featured')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {events?.filter(e => e.event_type === 'international').length || 0}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.international')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {events?.reduce((sum, e) => sum + (e.registered_count || 0), 0) || 0}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.totalRegistrations')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* Featured Events */}
          {featuredEvents && featuredEvents.length > 0 && (
            <section className="mb-12 md:mb-20">
              <div className={`flex items-center justify-center mb-8 md:mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <StarIcon className={`w-6 h-6 md:w-8 md:h-8 text-yellow-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.featuredEvents')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Main Featured Event */}
                <Card className="lg:row-span-2 bg-gradient-to-br from-white to-gray-50 h-full flex flex-col" hover>
                  {featuredEvents[0]?.image ? (
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img 
                        src={featuredEvents[0]?.image} 
                        alt={featuredEvents[0]?.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center border-2 border-dashed border-yellow-300">
                        <div className="text-center p-8">
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <TrophyIcon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className={`text-orange-800 font-bold text-xl mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                            {getTranslation(language, 'events.featuredEvent')}
                          </h3>
                          <p className={`text-orange-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {featuredEvents[0]?.event_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={`p-8 flex-1 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CardBadge variant="warning" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                        <StarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {getTranslation(language, 'events.featured')}
                      </CardBadge>
                      <CardBadge variant="primary" className={getTypeColor(featuredEvents[0]?.event_type)}>
                        {featuredEvents[0]?.event_type}
                      </CardBadge>
                    </div>
                    <CardTitle size="text-2xl" className={`mb-4 hover:text-green-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                      <Link href={`/events/${featuredEvents[0]?.id}`}>
                        {featuredEvents[0]?.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className={`text-base leading-relaxed mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {featuredEvents[0]?.description}
                    </CardDescription>
                    
                    <div className="space-y-4 mb-6">
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CalendarIcon className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <span className={`text-gray-700 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                          {new Date(featuredEvents[0]?.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPinIcon className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <span className={`text-gray-700 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                          {featuredEvents[0]?.venue_name}, {featuredEvents[0]?.venue_city}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/events/${featuredEvents[0]?.id}`}
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <span className={isRTL ? 'font-arabic' : ''}>{getTranslation(language, 'events.viewDetails')}</span>
                      <TrophyIcon className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                    </Link>
                  </div>
                </Card>

                {/* Secondary Featured Events */}
                <div className="space-y-4">
                  {featuredEvents.slice(1, 3).map((event) => {
                    const StatusIcon = getStatusIcon(event.status)
                    return (
                      <Card key={event.id} hover className="bg-white border border-gray-200 h-full">
                        <div className={`flex p-5 h-full ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                          {event.image ? (
                            <div className="w-20 h-16 flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-16 flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center border border-blue-300 shadow-sm">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <CalendarIcon className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                          <div className={`flex-1 min-w-0 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <StatusIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                <span className={isRTL ? 'font-arabic' : ''}>{event.status}</span>
                              </div>
                            </div>
                            <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors flex-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                              <Link href={`/events/${event.id}`}>
                                {event.title}
                              </Link>
                            </h3>
                            <div className={`flex items-center text-xs text-gray-500 mt-auto ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <CalendarIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                <span className={isRTL ? 'font-arabic' : ''}>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card background="bg-red-50" border="border-red-200" className="mb-8">
              <div className={`text-center py-12 ${isRTL ? 'text-right' : ''}`}>
                <p className={`text-red-600 mb-6 text-lg ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'common.status.error')}: {error.message}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className={`px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                >
                  {getTranslation(language, 'common.buttons.tryAgain')}
                </button>
              </div>
            </Card>
          )}

          {/* Events Grid */}
          {!isLoading && !error && (
            <>
              <section className="mb-12 md:mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {events.map((event) => {
                    const StatusIcon = getStatusIcon(event.status)
                    return (
                      <div key={event.id} className="group h-full">
                        <Card hover className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full flex flex-col">
                          <div className="relative">
                            {event.image ? (
                              <div className="relative overflow-hidden rounded-t-2xl">
                                <img 
                                  src={event.image} 
                                  alt={event.title}
                                  className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                              </div>
                            ) : (
                              <div className="relative overflow-hidden rounded-t-2xl">
                                <div className="aspect-video bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center border-2 border-dashed border-green-200">
                                  <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                      <CalendarIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className={`text-green-800 font-bold text-lg mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                                      {getTranslation(language, 'events.cricketEvent')}
                                    </h4>
                                    <p className={`text-green-600 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                                      {event.event_type}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 ${getStatusColor(event.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <StatusIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                <span className={isRTL ? 'font-arabic' : ''}>{event.status}</span>
                              </div>
                            </div>
                            {event.is_featured && (
                              <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                                  <StarIcon className="w-3 h-3" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className={`p-5 flex-1 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.event_type)} ${isRTL ? 'font-arabic' : ''}`}>
                                {event.event_type}
                              </div>
                              <span className={`text-sm font-bold ${event.is_free ? 'text-green-600' : 'text-blue-600'} ${isRTL ? 'font-arabic' : ''}`}>
                                {event.is_free ? getTranslation(language, 'events.free') : `$${event.ticket_price}`}
                              </span>
                            </div>
                            
                            <h3 className={`text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors leading-tight ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                              <Link href={`/events/${event.id}`}>
                                {event.title}
                              </Link>
                            </h3>
                            
                            <p className={`text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                              {event.description}
                            </p>
                            
                            <div className="space-y-2 mb-5">
                              <div className={`flex items-center text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <CalendarIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                <span className={`truncate ${isRTL ? 'font-arabic' : ''}`}>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className={`flex items-center text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <MapPinIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                <span className={`truncate ${isRTL ? 'font-arabic' : ''}`}>{event.venue_name}, {event.venue_city}</span>
                              </div>
                              <div className={`flex items-center text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <UserGroupIcon className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                <span className={isRTL ? 'font-arabic' : ''}>{event.registered_count || 0} {getTranslation(language, 'events.registered')}</span>
                              </div>
                            </div>
                            
                            <Link
                              href={`/events/${event.id}`}
                              className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg mt-auto ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <span className={`text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.viewDetails')}</span>
                              <TrophyIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                            </Link>
                          </div>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <section className="flex justify-center mt-12 md:mt-20">
                  <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                    <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <button
                        onClick={previousPage}
                        disabled={!pagination.hasPrevious}
                        className={`px-4 md:px-6 py-3 text-sm font-semibold border-2 border-gray-200 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {getTranslation(language, 'common.buttons.previous')}
                      </button>
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 md:w-12 md:h-12 text-sm font-bold rounded-2xl transition-all duration-300 ${
                              page === pagination.currentPage
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-110'
                                : 'border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                      <button
                        onClick={nextPage}
                        disabled={!pagination.hasNext}
                        className={`px-4 md:px-6 py-3 text-sm font-semibold border-2 border-gray-200 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {getTranslation(language, 'common.buttons.next')}
                      </button>
                    </div>
                    <div className={`mt-6 text-sm text-gray-600 text-center ${isRTL ? 'font-arabic' : ''}`}>
                      {getTranslation(language, 'common.status.showing')} {((pagination.currentPage - 1) * 16) + 1} {getTranslation(language, 'common.time.to')} {Math.min(pagination.currentPage * 16, pagination.count)} {getTranslation(language, 'common.time.of')} {pagination.count}
                    </div>
                  </div>
                </section>
              )}

              {/* Empty State */}
              {events.length === 0 && (
                <div className="col-span-full">
                  <div className={`bg-white rounded-3xl shadow-xl p-12 md:p-20 ${isRTL ? 'text-right' : 'text-center'}`}>
                    <div className={`max-w-md ${isRTL ? 'mr-0 ml-auto' : 'mx-auto'}`}>
                      <div className={`w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 ${isRTL ? 'mr-0 ml-auto' : 'mx-auto'}`}>
                        <CalendarIcon className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                        {getTranslation(language, 'events.noEventsAvailable')}
                      </h3>
                      <p className={`text-gray-600 text-lg leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                        {getTranslation(language, 'events.checkBackLater')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <Footer />
      </main>
    </RTLWrapper>
  )
}