'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import { 
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  TrophyIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  TicketIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolidIcon,
  TrophyIcon as TrophySolidIcon
} from '@heroicons/react/24/solid'

export default function EventsPage() {
  const { language, isRTL } = useLanguage()
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')

  const { data: featuredEvents } = useFetchData('/events', {
    queryKey: ['events', 'featured'],
    params: { is_featured: true, page_size: 3 }
  })

  const { data: categories } = useFetchData('/event-categories', {
    queryKey: ['event-categories']
  })

  const loadEvents = useCallback(async (pageNum = 1, reset = false) => {
    if (isLoading) return
    
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        page_size: '12',
        is_published: 'true',
        ordering: '-date'
      })
      
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus) params.append('status', filterStatus)
      if (filterType) params.append('event_type', filterType)

      const response = await fetch(`http://localhost:8000/api/v1/events/?${params}`)
      const data = await response.json()
      
      if (reset) {
        setEvents(data.results || [])
      } else {
        setEvents(prev => [...prev, ...(data.results || [])])
      }
      
      setHasMore(!!data.next)
      setPage(pageNum)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, filterStatus, filterType, isLoading])

  useEffect(() => {
    loadEvents(1, true)
  }, [searchTerm, filterStatus, filterType])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMore && !isLoading) {
          loadEvents(page + 1, false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, isLoading, page, loadEvents])

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'international': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'domestic': return 'bg-green-100 text-green-800 border-green-200'
      case 'training': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'friendly': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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
      <main className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center ${isRTL ? 'rtl-content' : ''}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
                <TrophySolidIcon className="w-10 h-10 text-yellow-400" />
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight hero-title ${isRTL ? 'font-arabic' : ''}`}>
                {String(getTranslation(language, 'events.title') || 'Cricket Events')}
              </h1>
              <p className={`text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8 hero-subtitle ${isRTL ? 'font-arabic' : ''}`}>
                {String(getTranslation(language, 'events.subtitle') || 'Discover upcoming cricket matches, tournaments, and training sessions')}
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/90 z-10 ${isRTL ? 'right-4' : 'left-4'}`} />
                  <input
                    type="text"
                    placeholder={getTranslation(language, 'events.searchPlaceholder') || 'Search events...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full py-4 px-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white placeholder-white/70 ${isRTL ? 'text-right font-arabic' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
          {/* Featured Events */}
          {featuredEvents?.results && featuredEvents.results.length > 0 && (
            <section className="mb-20">
              <div className={`flex items-center mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <StarIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'events.featuredEvents') || 'Featured Events'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredEvents.results.slice(0, 3).map((event) => {
                  const StatusIcon = getStatusIcon(event.status)
                  return (
                    <div key={event.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative">
                        {event.image ? (
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-64 object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrophyIcon className="w-10 h-10" />
                              </div>
                              <p className={`text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>
                              {getTranslation(language, 'events.featuredEvent') || 'Featured Event'}
                            </p>
                            </div>
                          </div>
                        )}
                        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                          <span className={`bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {getTranslation(language, 'events.featured') || 'Featured'}
                          </span>
                        </div>
                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                            <StatusIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                            <span>{getTranslation(language, `events.${event.status}`) || event.status}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.event_type)}`}>
                            {event.event_type}
                          </span>
                          <span className={`text-lg font-bold ${event.is_free ? 'text-green-600' : 'text-blue-600'} ${isRTL ? 'font-arabic' : ''}`}>
                            {event.is_free ? (getTranslation(language, 'events.free') || 'Free') : `$${event.ticket_price}`}
                          </span>
                        </div>
                        
                        <h3 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/events/${event.id}`}>
                            {event.title}
                          </Link>
                        </h3>
                        
                        <div className="space-y-2 mb-6">
                          <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPinIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span>{event.venue_name}, {event.venue_city}</span>
                          </div>
                        </div>
                        
                        <Link
                          href={`/events/${event.id}`}
                          className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <span className={isRTL ? 'font-arabic' : ''}>{getTranslation(language, 'events.viewDetails') || 'View Details'}</span>
                          <TrophyIcon className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}



          {/* Events Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => {
                const StatusIcon = getStatusIcon(event.status)
                return (
                  <div key={event.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                              <CalendarIcon className="w-8 h-8" />
                            </div>
                            <p className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                              Cricket Event
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-3 right-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)} ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <StatusIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <span>{event.status}</span>
                        </div>
                      </div>
                      
                      {event.is_featured && (
                        <div className="absolute top-3 left-3">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                            <StarIcon className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.event_type)} ${isRTL ? 'font-arabic' : ''}`}>
                          {getTranslation(language, `events.${event.event_type}`) || event.event_type}
                        </span>
                        <span className={`text-sm font-bold ${event.is_free ? 'text-green-600' : 'text-blue-600'}`}>
                          {event.is_free ? 'Free' : `$${event.ticket_price}`}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                        <Link href={`/events/${event.id}`}>
                          {event.title}
                        </Link>
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <MapPinIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span className="truncate">{event.venue_name}, {event.venue_city}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/events/${event.id}`}
                        className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className={`text-sm ${isRTL ? 'font-arabic' : ''}`}>View Details</span>
                        <TrophyIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Loading More */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className={`mt-4 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                    {getTranslation(language, 'events.loadingMoreEvents') || 'Loading more events...'}
                  </p>
                </div>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && events.length > 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto">
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic text-center' : ''}`}>
                    {getTranslation(language, 'events.allEventsLoaded') || 'All Events Loaded'}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? 'font-arabic text-center' : ''}`}>
                    {getTranslation(language, 'events.allEventsLoadedDesc') || "You've seen all available events"}
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {events.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg mx-auto">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CalendarIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : ''}`}>
                    {getTranslation(language, 'events.noEventsFound') || 'No Events Found'}
                  </h3>
                  <p className={`text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-center' : ''}`}>
                    {getTranslation(language, 'events.tryAdjustingFilters') || 'No events match your current search criteria. Try adjusting your filters.'}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <Footer />
      </main>
    </RTLWrapper>
  )
}