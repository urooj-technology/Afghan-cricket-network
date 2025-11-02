'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { useFetchData } from '../../../hooks'
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
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolidIcon,
  TrophyIcon as TrophySolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid'

export default function EventDetailPage() {
  const { id } = useParams()
  const { language, isRTL } = useLanguage()
  const [copied, setCopied] = useState(false)

  const { data: event, isLoading, error } = useFetchData(`/events/${id}/`, {
    queryKey: ['event', id],
    enabled: !!id
  })

  const { data: relatedEvents } = useFetchData('/events', {
    queryKey: ['events', 'related'],
    params: { page_size: 3, is_published: true },
    enabled: !!event
  })

  // Function to handle sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = event?.title || 'Cricket Event';
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${url}`)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  // Function to handle native share (for mobile devices)
  const handleNativeShare = () => {
    const url = window.location.href;
    const title = event?.title || 'Cricket Event';
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(console.error);
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

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

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex justify-center items-center py-20">
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
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <h1 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {String(getTranslation(language, 'events.eventNotFound') || 'Event not found')}
              </h1>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {String(getTranslation(language, 'events.eventNotFoundDesc') || "The event you're looking for doesn't exist or has been removed.")}
              </p>
              <Link
                href="/events"
                className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {String(getTranslation(language, 'events.backToEvents') || 'Back to Events')}
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
      <main className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link
                href="/events"
                className={`inline-flex items-center text-purple-200 hover:text-white transition-colors ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {String(getTranslation(language, 'events.backToEvents') || 'Back to Events')}
              </Link>
            </div>
            
            <div className={`flex items-center flex-wrap gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, `events.${event.event_type}`) || event.event_type}
              </div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                <StatusIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {getTranslation(language, `events.${event.status}`) || event.status}
              </div>
              {event.is_featured && (
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 backdrop-blur-sm text-yellow-200 border border-yellow-400/30 ${isRTL ? 'font-arabic' : ''}`}>
                  <StarSolidIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {getTranslation(language, 'events.featured') || 'Featured'}
                </div>
              )}
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight hero-title ${isRTL ? 'font-arabic' : ''}`}>
              {event.title}
            </h1>
            
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className={`text-lg font-bold mb-1 ${isRTL ? 'font-arabic' : ''}`}>{new Date(event.date).toLocaleDateString()}</div>
                <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.date') || 'Date'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <MapPinIcon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className={`text-lg font-bold mb-1 ${isRTL ? 'font-arabic' : ''}`}>{event.venue?.name || event.venue_name}</div>
                <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.venue') || 'Venue'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <TicketIcon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className={`text-lg font-bold mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {event.is_free ? (getTranslation(language, 'events.free') || 'Free') : `$${event.ticket_price}`}
                </div>
                <div className={`text-purple-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.price') || 'Price'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Event Content */}
            <article className="lg:col-span-3">
              {/* Featured Image */}
              {event.image && (
                <div className="mb-12">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 md:h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Event Details */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
                <div className={`flex items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <TrophySolidIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {String(getTranslation(language, 'events.aboutEvent') || 'About This Event')}
                  </h2>
                </div>

                {/* Event Description */}
                <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
                  <p className={`text-xl leading-relaxed text-gray-700 ${isRTL ? 'font-arabic' : ''}`}>
                    {event.description || 'Join us for an exciting cricket event featuring top-level competition and entertainment for the whole family.'}
                  </p>
                </div>

                {/* Event Highlights */}
                <div className="mb-12">
                  <h3 className={`text-2xl font-bold text-gray-900 mb-8 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {String(getTranslation(language, 'events.eventHighlights') || 'Event Highlights')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrophySolidIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-gray-900 text-lg mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.professionalEvent') || 'Professional Event'}
                        </h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.highQualityCricket') || 'High-quality cricket competition'}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <UsersIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-gray-900 text-lg mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.fanEngagement') || 'Fan Engagement'}
                        </h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.interactiveActivities') || 'Interactive activities for fans'}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-gray-900 text-lg mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.premiumVenue') || 'Premium Venue'}
                        </h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.worldClassFacilities') || 'World-class facilities'}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <StarSolidIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-gray-900 text-lg mb-1 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.topCompetition') || 'Top Competition'}
                        </h4>
                        <p className={`text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {getTranslation(language, 'events.eliteLevelCricket') || 'Elite level cricket'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex items-center justify-center space-x-6 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <button className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <HeartIcon className="w-5 h-5" />
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.like') || 'Like'}</span>
                  </button>
                  <button 
                    onClick={handleNativeShare}
                    className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <ShareIcon className="w-5 h-5" />
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.share') || 'Share'}</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <BookmarkIcon className="w-5 h-5" />
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.save') || 'Save'}</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Event Info Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 mb-8">
                <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {String(getTranslation(language, 'events.eventInformation') || 'Event Information')}
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.date') || 'Date'}</span>
                    <span className={`font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.status') || 'Status'}</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(event.status)} ${isRTL ? 'font-arabic' : ''}`}>
                      {getTranslation(language, `events.${event.status}`) || event.status}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.type') || 'Type'}</span>
                    <span className={`font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, `events.${event.event_type}`) || event.event_type}</span>
                  </div>
                  <div className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.price') || 'Price'}</span>
                    <span className={`font-bold text-xl ${event.is_free ? 'text-green-600' : 'text-blue-600'} ${isRTL ? 'font-arabic' : ''}`}>
                      {event.is_free ? (getTranslation(language, 'events.free') || 'Free') : `$${event.ticket_price}`}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between p-4 bg-white rounded-xl shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.venue') || 'Venue'}</span>
                    <span className={`font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{event.venue?.name || event.venue_name}</span>
                  </div>
                </div>
              </div>

              {/* Registration Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8 mb-8">
                <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                    <TicketIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {String(getTranslation(language, 'events.eventRegistration') || 'Event Registration')}
                  </h3>
                </div>
                
                {event.status === 'upcoming' && (
                  <button className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'font-arabic' : ''}`}>
                    {String(getTranslation(language, 'events.registerNow') || 'Register Now')}
                  </button>
                )}
                
                {event.status === 'ongoing' && (
                  <button className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'font-arabic' : ''}`}>
                    {String(getTranslation(language, 'events.joinLive') || 'Join Live')}
                  </button>
                )}
                
                {event.status === 'completed' && (
                  <div className="text-center py-8 bg-white rounded-2xl">
                    <ExclamationCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className={`text-gray-600 text-lg ${isRTL ? 'font-arabic' : ''}`}>
                      {String(getTranslation(language, 'events.eventCompleted') || 'Event Completed')}
                    </p>
                  </div>
                )}
              </div>

              {/* Share Options */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl p-8">
                <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                    <ShareIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {String(getTranslation(language, 'events.shareEvent') || 'Share Event')}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.facebook') || 'Facebook'}</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.twitter') || 'Twitter'}</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.whatsapp') || 'WhatsApp'}</span>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <span className={`font-semibold ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.copyLink') || 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents && relatedEvents.results && relatedEvents.results.length > 0 && (
          <section className="bg-gradient-to-br from-gray-50 to-indigo-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
                  <TrophySolidIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 hero-title ${isRTL ? 'font-arabic' : ''}`}>
                  {String(getTranslation(language, 'events.relatedEvents') || 'Related Events')}
                </h2>
                <p className={`text-xl text-gray-600 max-w-2xl mx-auto hero-subtitle ${isRTL ? 'font-arabic' : ''}`}>
                  {String(getTranslation(language, 'events.relatedEventsDesc') || 'Discover more exciting cricket events')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedEvents.results.slice(0, 3).map((relatedEvent) => {
                  const StatusIcon = getStatusIcon(relatedEvent.status)
                  return (
                    <div key={relatedEvent.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative">
                        {relatedEvent.image ? (
                          <img 
                            src={relatedEvent.image} 
                            alt={relatedEvent.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <div className="text-center text-white">
                              <TrophyIcon className="w-12 h-12 mx-auto mb-2" />
                              <p className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.cricketEvent') || 'Cricket Event'}</p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(relatedEvent.status)}`}>
                            <StatusIcon className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>{getTranslation(language, `events.${relatedEvent.status}`) || relatedEvent.status}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <Link href={`/events/${relatedEvent.id}`}>
                            {relatedEvent.title}
                          </Link>
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CalendarIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={isRTL ? 'font-arabic' : ''}>{new Date(relatedEvent.date).toLocaleDateString()}</span>
                          </div>
                          <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPinIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            <span className={`truncate ${isRTL ? 'font-arabic' : ''}`}>{relatedEvent.venue_name}</span>
                          </div>
                        </div>
                        
                        <Link
                          href={`/events/${relatedEvent.id}`}
                          className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <span className={`text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'events.viewDetails') || 'View Details'}</span>
                          <TrophyIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/events"
                  className={`inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
                >
                  {String(getTranslation(language, 'events.viewAllEvents') || 'View All Events')}
                  <ArrowLeftIcon className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Copy Link Notification */}
        {copied && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {getTranslation(language, 'events.linkCopied') || 'Link copied to clipboard!'}
          </div>
        )}

        <Footer />
      </main>
    </RTLWrapper>
  )
}