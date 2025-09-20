'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const eventsData = [
  {
    id: 1,
    titleKey: 'home.eventContent.pakistanSeries.title',
    descriptionKey: 'home.eventContent.pakistanSeries.description',
    date: '2024-02-15',
    time: '19:00',
    venue: 'Sharjah Cricket Stadium',
    location: 'Sharjah, UAE',
    typeKey: 'home.eventTypes.international',
    status: 'upcoming',
    registration: true,
    capacity: 15000,
    registered: 12000,
  },
  {
    id: 2,
    titleKey: 'home.eventContent.nationalChampionship.title',
    descriptionKey: 'home.eventContent.nationalChampionship.description',
    date: '2024-02-20',
    time: '14:00',
    venue: 'Kabul Cricket Ground',
    location: 'Kabul, Afghanistan',
    typeKey: 'home.eventTypes.domestic',
    status: 'upcoming',
    registration: false,
    capacity: 5000,
    registered: 0,
  },
  {
    id: 3,
    titleKey: 'home.eventContent.youthCamp.title',
    descriptionKey: 'home.eventContent.youthCamp.description',
    date: '2024-02-25',
    time: '09:00',
    venue: 'Kandahar Cricket Academy',
    location: 'Kandahar, Afghanistan',
    typeKey: 'home.eventTypes.training',
    status: 'upcoming',
    registration: true,
    capacity: 50,
    registered: 35,
  },
  {
    id: 4,
    titleKey: 'home.eventContent.indiaSeries.title',
    descriptionKey: 'home.eventContent.indiaSeries.description',
    date: '2024-03-10',
    time: '15:00',
    venue: 'Dubai International Stadium',
    location: 'Dubai, UAE',
    typeKey: 'home.eventTypes.international',
    status: 'upcoming',
    registration: true,
    capacity: 25000,
    registered: 18000,
  },
  {
    id: 5,
    titleKey: 'home.eventContent.womensTournament.title',
    descriptionKey: 'home.eventContent.womensTournament.description',
    date: '2024-03-15',
    time: '10:00',
    venue: 'Herat Cricket Ground',
    location: 'Herat, Afghanistan',
    typeKey: 'home.eventTypes.women',
    status: 'upcoming',
    registration: true,
    capacity: 2000,
    registered: 1500,
  },
  {
    id: 6,
    titleKey: 'home.eventContent.t20Qualifiers.title',
    descriptionKey: 'home.eventContent.t20Qualifiers.description',
    date: '2024-04-05',
    time: '20:00',
    venue: 'Various Venues',
    location: 'Multiple Locations',
    typeKey: 'home.eventTypes.international',
    status: 'upcoming',
    registration: false,
    capacity: 0,
    registered: 0,
  },
]

const eventTypes = [
  { key: 'home.eventTypes.all', value: 'All' },
  { key: 'home.eventTypes.international', value: 'International' },
  { key: 'home.eventTypes.domestic', value: 'Domestic' },
  { key: 'home.eventTypes.training', value: 'Training' },
  { key: 'home.eventTypes.women', value: 'Women' }
]

export default function EventsSection() {
  const [selectedType, setSelectedType] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { language } = useLanguage()

  const filteredEvents = selectedType === 'All' 
    ? eventsData 
    : eventsData.filter(event => getTranslation(language, event.typeKey) === selectedType)

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

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
      case getTranslation(language, 'home.eventTypes.international'):
        return 'bg-blue-100 text-blue-800'
      case getTranslation(language, 'home.eventTypes.domestic'):
        return 'bg-green-100 text-green-800'
      case getTranslation(language, 'home.eventTypes.training'):
        return 'bg-purple-100 text-purple-800'
      case getTranslation(language, 'home.eventTypes.women'):
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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

        {/* Event Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => {
                setSelectedType(type.value)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {getTranslation(language, type.key)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                  <div className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(getTranslation(language, event.typeKey))}`}>
                    {getTranslation(language, event.typeKey)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  {event.registration && (
                    <span className="text-xs text-gray-500">
                      {event.registered}/{event.capacity} registered
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{getTranslation(language, event.titleKey)}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{getTranslation(language, event.descriptionKey)}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {event.venue}, {event.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {event.registration ? (
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {getTranslation(language, 'home.events.registerNow')}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500">{getTranslation(language, 'home.events.noRegistration')}</span>
                  )}
                  
                  <Link
                    href={`/events/${event.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {getTranslation(language, 'home.events.viewDetails')} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getTranslation(language, 'common.common.previous')}
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getTranslation(language, 'common.common.next')}
              </button>
            </nav>
          </div>
        )}

        {/* Event Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {eventsData.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-gray-600">{getTranslation(language, 'home.events.upcomingEvents')}</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {eventsData.filter(e => getTranslation(language, e.typeKey) === getTranslation(language, 'home.eventTypes.international')).length}
            </div>
            <div className="text-sm text-gray-600">{getTranslation(language, 'home.events.internationalEvents')}</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {eventsData.filter(e => e.registration).length}
            </div>
            <div className="text-sm text-gray-600">{getTranslation(language, 'home.events.eventsWithRegistration')}</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {eventsData.reduce((sum, e) => sum + e.registered, 0)}
            </div>
            <div className="text-sm text-gray-600">{getTranslation(language, 'home.events.totalRegistrations')}</div>
          </div>
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
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
