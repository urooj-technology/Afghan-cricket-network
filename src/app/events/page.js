'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import Link from "next/link";

const eventsData = [
  {
    id: 1,
    titleKey: 'events.eventTitles.afghanistanVsPakistanT20',
    date: '2024-02-15',
    venueKey: 'events.eventVenues.sharjahCricketStadium',
    type: 'international',
  },
  {
    id: 2,
    titleKey: 'events.eventTitles.nationalCricketChampionship',
    date: '2024-02-20',
    venueKey: 'events.eventVenues.kabulCricketGround',
    type: 'domestic',
  },
  {
    id: 3,
    titleKey: 'events.eventTitles.youthCricketCamp',
    date: '2024-02-25',
    venueKey: 'events.eventVenues.kandaharCricketAcademy',
    type: 'training',
  },
]

export default function Events() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'events.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'events.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getTranslation(language, `events.types.${event.type}`)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {getTranslation(language, event.titleKey)}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>{getTranslation(language, 'events.date')}:</strong> {new Date(event.date).toLocaleDateString(language === 'ps' ? 'fa-IR' : 'en-US')}</p>
                  <p><strong>{getTranslation(language, 'events.venue')}:</strong> {getTranslation(language, event.venueKey)}</p>
                </div>
                <Link 
                  href={`/events/${event.id}`}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
                >
                  {getTranslation(language, 'events.details')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
