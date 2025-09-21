'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

export default function EventsSection() {
  const { language } = useLanguage()

  // Fetch upcoming events
  const { data: upcomingEvents, isLoading: upcomingLoading } = useFetchData('/events/upcoming', {
    queryKey: ['events', 'upcoming']
  })

  // Fetch featured events
  const { data: featuredEvents, isLoading: featuredLoading } = useFetchData('/events/featured', {
    queryKey: ['events', 'featured']
  })

  // Fetch latest events
  const { data: latestEvents, isLoading: latestLoading } = useFetchData('/events', {
    queryKey: ['events', 'latest'],
    params: {
      page_size: 6,
      ordering: '-date'
    }
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800'
      case 'ongoing':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'international':
        return 'bg-blue-100 text-blue-800'
      case 'domestic':
        return 'bg-green-100 text-green-800'
      case 'training':
        return 'bg-purple-100 text-purple-800'
      case 'tournament':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isLoading = upcomingLoading || featuredLoading || latestLoading

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'home.events.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslation(language, 'home.events.subtitle')}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestEvents?.results?.slice(0, 6).map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                        <div className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.event_type)}`}>
                        {event.event_type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      {event.is_featured && (
                        <span className="text-xs text-yellow-600 font-medium">Featured</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {event.venue_name}, {event.venue_city}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {event.is_free ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          <span className="text-gray-600">${event.ticket_price}</span>
                        )}
                      </div>
                      <Link
                        href={`/events/${event.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {upcomingEvents?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {latestEvents?.results?.filter(e => e.event_type === 'international').length || 0}
                </div>
                <div className="text-sm text-gray-600">International Events</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {featuredEvents?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Featured Events</div>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {latestEvents?.results?.reduce((sum, e) => sum + (e.registered_count || 0), 0) || 0}
                </div>
                <div className="text-sm text-gray-600">Total Registrations</div>
              </div>
            </div>
          </>
        )}

        {/* View All Events Button */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {getTranslation(language, 'home.events.viewAllEvents')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}