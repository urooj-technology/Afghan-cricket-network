'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline'

const eventsData = {
  1: {
    id: 1,
    titleKey: 'events.eventTitles.afghanistanVsPakistanT20',
    descriptionKey: 'events.eventDescriptions.afghanistanVsPakistanT20',
    date: '2024-02-15',
    time: '19:00',
    venueKey: 'events.eventVenues.sharjahCricketStadium',
    locationKey: 'events.eventLocations.sharjahUAE',
    type: 'international',
    status: 'upcoming',
    registration: true,
    capacity: 15000,
    registered: 12000,
    matches: [
      {
        date: '2024-02-15',
        time: '19:00',
        teams: 'Afghanistan vs Pakistan',
        format: 'T20I'
      },
      {
        date: '2024-02-17',
        time: '19:00',
        teams: 'Pakistan vs Afghanistan',
        format: 'T20I'
      },
      {
        date: '2024-02-19',
        time: '19:00',
        teams: 'Afghanistan vs Pakistan',
        format: 'T20I'
      }
    ],
    highlights: [
      'Three T20 International matches',
      'Top players from both teams',
      'Live streaming available',
      'Fan engagement activities'
    ]
  },
  2: {
    id: 2,
    titleKey: 'events.eventTitles.nationalCricketChampionship',
    descriptionKey: 'events.eventDescriptions.nationalCricketChampionship',
    date: '2024-02-20',
    time: '14:00',
    venueKey: 'events.eventVenues.kabulCricketGround',
    locationKey: 'events.eventLocations.kabulAfghanistan',
    type: 'domestic',
    status: 'upcoming',
    registration: false,
    capacity: 5000,
    registered: 0,
    matches: [
      {
        date: '2024-02-20',
        time: '14:00',
        teams: 'Kabul vs Kandahar',
        format: 'T20'
      },
      {
        date: '2024-02-22',
        time: '14:00',
        teams: 'Herat vs Mazar',
        format: 'T20'
      },
      {
        date: '2024-02-24',
        time: '14:00',
        teams: 'Semi-Final 1',
        format: 'T20'
      },
      {
        date: '2024-02-26',
        time: '14:00',
        teams: 'Semi-Final 2',
        format: 'T20'
      },
      {
        date: '2024-02-28',
        time: '14:00',
        teams: 'Final',
        format: 'T20'
      }
    ],
    highlights: [
      'Teams from all 34 provinces',
      'Knockout tournament format',
      'National team scouts present',
      'Media coverage and broadcasting'
    ]
  },
  3: {
    id: 3,
    titleKey: 'events.eventTitles.youthCricketCamp',
    descriptionKey: 'events.eventDescriptions.youthCricketCamp',
    date: '2024-02-25',
    time: '09:00',
    venueKey: 'events.eventVenues.kandaharCricketAcademy',
    locationKey: 'events.eventLocations.kandaharAfghanistan',
    type: 'training',
    status: 'upcoming',
    registration: true,
    capacity: 50,
    registered: 35,
    matches: [],
    highlights: [
      'Professional coaching staff',
      'Equipment provided',
      'Physical fitness training',
      'Mental game development',
      'Certificate upon completion'
    ],
    schedule: [
      '09:00 - 10:00: Warm-up and fitness',
      '10:00 - 12:00: Batting practice',
      '12:00 - 13:00: Lunch break',
      '13:00 - 15:00: Bowling practice',
      '15:00 - 16:00: Fielding drills',
      '16:00 - 17:00: Match simulation'
    ]
  }
}

export default function EventDetail() {
  const params = useParams()
  const { language } = useLanguage()
  const event = eventsData[params.id]

  if (!event) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {getTranslation(language, `events.types.${event.type}`)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, event.titleKey)}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, event.descriptionKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {getTranslation(language, 'events.eventInformation')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{getTranslation(language, 'events.date')}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(event.date).toLocaleDateString(language === 'ps' ? 'fa-IR' : 'en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{getTranslation(language, 'events.time')}</p>
                      <p className="text-lg font-semibold text-gray-900">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="w-6 h-6 text-blue-600" />
                    <div>
                                             <p className="text-sm font-medium text-gray-500">{getTranslation(language, 'events.venue')}</p>
                       <p className="text-lg font-semibold text-gray-900">{getTranslation(language, event.venueKey)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{getTranslation(language, 'events.capacity')}</p>
                      <p className="text-lg font-semibold text-gray-900">{event.capacity.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matches Schedule */}
              {event.matches && event.matches.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {getTranslation(language, 'events.matchSchedule')}
                  </h2>
                  <div className="space-y-4">
                    {event.matches.map((match, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{match.teams}</h3>
                            <p className="text-sm text-gray-600">{match.format}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {new Date(match.date).toLocaleDateString(language === 'ps' ? 'fa-IR' : 'en-US')}
                            </p>
                            <p className="text-sm text-gray-600">{match.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Training Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {getTranslation(language, 'events.trainingSchedule')}
                  </h2>
                  <div className="space-y-3">
                    {event.schedule.map((session, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{session}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {getTranslation(language, 'events.highlights')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <TrophyIcon className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Registration */}
              {event.registration && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    {getTranslation(language, 'events.registration')}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-blue-700">{getTranslation(language, 'events.capacity')}:</span>
                      <span className="font-semibold text-blue-900">{event.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">{getTranslation(language, 'events.registered')}:</span>
                      <span className="font-semibold text-blue-900">{event.registered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">{getTranslation(language, 'events.available')}:</span>
                      <span className="font-semibold text-blue-900">{(event.capacity - event.registered).toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                    {getTranslation(language, 'events.registerNow')}
                  </button>
                </div>
              )}

              {/* Location Map */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {getTranslation(language, 'events.location')}
                </h3>
                <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center mb-3">
                  <MapPinIcon className="w-8 h-8 text-gray-400" />
                </div>
                                 <p className="text-gray-700 text-sm">{getTranslation(language, event.locationKey)}</p>
              </div>

              {/* Back to Events */}
              <div className="bg-gray-50 rounded-lg p-6">
                <Link 
                  href="/events"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← {getTranslation(language, 'events.backToEvents')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
