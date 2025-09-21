'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useFetchData } from '../../../hooks'
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  TicketIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'

export default function EventDetailPage() {
  const { id } = useParams()
  const { language, isRTL } = useLanguage()

  const { data: event, isLoading, error } = useFetchData(`/events/${id}`, {
    queryKey: ['event', id],
    enabled: !!id
  })

  const { data: relatedEvents } = useFetchData('/events', {
    queryKey: ['events', 'related'],
    params: { page_size: 3 },
    enabled: !!event
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

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" />
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  if (error || !event) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExclamationCircleIcon className="w-10 h-10 text-red-600" />
              </div>
              <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                Event Not Found
              </h1>
              <p className={`text-lg text-gray-600 mb-8 ${isRTL ? 'font-arabic' : ''}`}>
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/events"
                className={`inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-3 rotate-180' : 'mr-3'}`} />
                Back to Events
              </Link>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  const StatusIcon = getStatusIcon(event.status)

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Header />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-0"></div>
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 z-5">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border border-white/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-white/30 rounded-full animate-pulse delay-2000"></div>
          </div>
          
          <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mb-8">
              <Link
                href="/events"
                className={`inline-flex items-center text-white/80 hover:text-white transition-colors group ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 group-hover:transform group-hover:scale-110 transition-transform ${isRTL ? 'ml-3 rotate-180' : 'mr-3'}`} />
                <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.backToEvents')}</span>
              </Link>
            </div>
            
            <div className={`flex flex-wrap items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/10 text-white ${getTypeColor(event.event_type)} ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                <TrophyIcon className={`w-4 h-4 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`} />
                {event.event_type}
              </span>
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/10 text-white ${getStatusColor(event.status)} ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                <StatusIcon className={`w-4 h-4 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`} />
                {event.status}
              </span>
              {event.is_featured && (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white border border-yellow-300/50 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                  <StarIcon className={`w-4 h-4 ${isRTL ? 'ml-3 order-2' : 'mr-3 order-1'}`} />
                  {getTranslation(language, 'events.featured')}
                </span>
              )}
            </div>
            
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              {event.title}
            </h1>
            
            <p className={`text-xl sm:text-2xl text-white/90 max-w-4xl mb-12 leading-relaxed ${isRTL ? 'font-arabic text-right ml-auto mr-0' : 'mx-auto text-left'}`}>
              {event.description}
            </p>
            
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {new Date(event.date).getDate()}
                </div>
                <div className="text-white/80 font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2 truncate">
                  {event.venue_name?.split(' ')[0] || 'TBD'}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.venue')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {event.registered_count || 0}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.registered')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {event.is_free ? 'Free' : `$${event.ticket_price}`}
                </div>
                <div className={`text-white/80 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.price')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`grid grid-cols-1 xl:grid-cols-4 gap-12 ${isRTL ? 'xl:grid-flow-col-dense' : ''}`}>
            
            {/* Event Content */}
            <div className={`xl:col-span-3 space-y-8 ${isRTL ? 'xl:order-2' : ''}`}>
              
              {/* Event Image */}
              <div className="relative group">
                {event.image ? (
                  <div className="overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-green-100 via-emerald-100 to-green-200">
                    <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                      <div className="text-center">
                        <TrophyIcon className="w-20 h-20 md:w-32 md:h-32 text-green-600 mx-auto mb-4" />
                        <h3 className={`text-2xl md:text-4xl font-bold text-green-700 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          {event.title}
                        </h3>
                        <p className={`text-green-600 text-lg ${isRTL ? 'font-arabic' : ''}`}>
                          {event.event_type}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Information Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                    Event Information
                  </h2>
                </div>
                
                <div className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <CalendarIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          Date & Time
                        </h3>
                        <p className={`text-xl font-bold text-gray-800 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-600">
                          {new Date(event.date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <MapPinIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          Venue
                        </h3>
                        <p className={`text-xl font-bold text-gray-800 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                          {event.venue_name}
                        </p>
                        <p className="text-gray-600">{event.venue_city}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <UserGroupIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          Capacity
                        </h3>
                        <p className={`text-xl font-bold text-gray-800 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                          {event.max_capacity?.toLocaleString() || 'Unlimited'}
                        </p>
                        <p className="text-gray-600">
                          {event.registered_count || 0} registered
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <TicketIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                          Price
                        </h3>
                        <p className={`text-xl font-bold text-gray-800 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                          {event.is_free ? 'Free Entry' : `$${event.ticket_price}`}
                        </p>
                        <p className="text-gray-600">
                          {event.is_free ? 'No registration fee' : 'Per person'}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                    About This Event
                  </h2>
                </div>
                
                <div className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className={`prose prose-lg max-w-none ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {event.description || `Join us for ${event.title}, an exciting cricket event that brings together players and fans from across Afghanistan. This event promises to be an unforgettable experience with world-class facilities and top-tier competition.`}
                    </p>
                  </div>

                  {/* Event Highlights */}
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      Event Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className={`flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TrophyIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          Professional cricket event
                        </span>
                      </div>
                      <div className={`flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <StarIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          Top-level competition
                        </span>
                      </div>
                      <div className={`flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <UserGroupIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          Fan engagement activities
                        </span>
                      </div>
                      <div className={`flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPinIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className={`text-gray-800 font-medium ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          Premium venue facilities
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <div className={`flex flex-wrap items-center gap-4 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                      <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <ShareIcon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <span className={isRTL ? 'font-arabic' : ''}>Share Event</span>
                      </button>
                      <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <BookmarkIcon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <span className={isRTL ? 'font-arabic' : ''}>Save Event</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className={`xl:col-span-1 space-y-8 ${isRTL ? 'xl:order-1' : ''}`}>
              
              {/* Registration Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-8 z-30">
                <div className={`bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className={`text-xl font-bold ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                    Event Registration
                  </h3>
                </div>
                
                <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="space-y-4 mb-6">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 font-medium">Price</span>
                      <span className="font-bold text-xl text-gray-900">
                        {event.is_free ? 'Free' : `$${event.ticket_price}`}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-gray-600 font-medium">Registered</span>
                      <span className="font-semibold text-gray-900">{event.registered_count || 0}</span>
                    </div>
                    {event.max_capacity && (
                      <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-600 font-medium">Available</span>
                        <span className="font-semibold text-gray-900">
                          {event.max_capacity - (event.registered_count || 0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {event.status === 'upcoming' && (
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl">
                      Register Now
                    </button>
                  )}
                  
                  {event.status === 'ongoing' && (
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl">
                      Join Live
                    </button>
                  )}
                  
                  {event.status === 'completed' && (
                    <button className="w-full bg-gray-400 text-white py-4 px-6 rounded-2xl cursor-not-allowed font-bold text-lg" disabled>
                      Event Completed
                    </button>
                  )}
                </div>
              </div>

              {/* Event Stats */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className={`text-xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                    Event Details
                  </h3>
                </div>
                
                <div className={`p-6 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600 font-medium">Type</span>
                    <span className="font-semibold capitalize text-gray-900">{event.event_type}</span>
                  </div>
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600 font-medium">Date</span>
                    <span className="font-semibold text-gray-900">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600 font-medium">Venue</span>
                    <span className="font-semibold text-gray-900 text-right">{event.venue_name}</span>
                  </div>
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-gray-600 font-medium">City</span>
                    <span className="font-semibold text-gray-900">{event.venue_city}</span>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className={`text-xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                    Share Event
                  </h3>
                </div>
                
                <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold transform hover:scale-105">
                      Facebook
                    </button>
                    <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 text-sm font-semibold transform hover:scale-105">
                      Twitter
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm font-semibold transform hover:scale-105">
                      WhatsApp
                    </button>
                    <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-semibold transform hover:scale-105">
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents && relatedEvents.results && relatedEvents.results.length > 0 && (
          <section className="bg-gradient-to-br from-gray-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className={`mb-16 ${isRTL ? 'text-right' : 'text-center'}`}>
                <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic text-right' : 'text-center'}`}>
                  Related Events
                </h2>
                <p className={`text-xl text-gray-600 max-w-3xl ${isRTL ? 'font-arabic text-right mr-0 ml-auto' : 'text-center mx-auto'}`}>
                  Discover more exciting cricket events happening soon
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedEvents.results.slice(0, 3).map((relatedEvent) => (
                  <div key={relatedEvent.id} className="group">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 border border-gray-100">
                      <div className="relative overflow-hidden">
                        <img 
                          src={relatedEvent.image || '/api/placeholder/400/250'} 
                          alt={relatedEvent.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 ${getStatusColor(relatedEvent.status)}`}>
                            {relatedEvent.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(relatedEvent.event_type)} ${isRTL ? 'font-arabic' : ''}`}>
                            {relatedEvent.event_type}
                          </span>
                        </div>
                        
                        <h3 className={`text-xl font-bold leading-tight group-hover:text-indigo-600 transition-colors mb-4 ${isRTL ? 'font-arabic text-right' : 'text-left'}`}>
                          <Link href={`/events/${relatedEvent.id}`}>
                            {relatedEvent.title}
                          </Link>
                        </h3>
                        
                        <div className={`flex items-center justify-between text-sm text-gray-500 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>{new Date(relatedEvent.date).toLocaleDateString()}</span>
                          </div>
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPinIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>{relatedEvent.venue_name}</span>
                          </div>
                        </div>
                        
                        <Link
                          href={`/events/${relatedEvent.id}`}
                          className={`inline-flex items-center w-full justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <span className={isRTL ? 'font-arabic' : ''}>View Details</span>
                          <ArrowLeftIcon className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link
                  href="/events"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  View All Events
                  <ArrowLeftIcon className={`w-5 h-5 ml-3 ${isRTL ? 'rotate-180' : ''}`} />
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