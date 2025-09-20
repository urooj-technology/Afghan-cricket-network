'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlayIcon, CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const featuredNews = [
  {
    id: 1,
    titleKey: 'featuredNews.t20WorldCup.title',
    excerptKey: 'featuredNews.t20WorldCup.excerpt',
    categoryKey: 'featuredNews.t20WorldCup.category',
    date: '2024-01-15',
    image: '/api/placeholder/400/250',
  },
  {
    id: 2,
    titleKey: 'featuredNews.cricketAcademy.title',
    excerptKey: 'featuredNews.cricketAcademy.excerpt',
    categoryKey: 'featuredNews.cricketAcademy.category',
    date: '2024-01-12',
    image: '/api/placeholder/400/250',
  },
  {
    id: 3,
    titleKey: 'featuredNews.rashidKhan.title',
    excerptKey: 'featuredNews.rashidKhan.excerpt',
    categoryKey: 'featuredNews.rashidKhan.category',
    date: '2024-01-10',
    image: '/api/placeholder/400/250',
  },
]

const upcomingEvents = [
  {
    id: 1,
    titleKey: 'upcomingEvents.pakistanSeries.title',
    date: '2024-02-15',
    venueKey: 'upcomingEvents.pakistanSeries.venue',
    typeKey: 'upcomingEvents.pakistanSeries.type',
  },
  {
    id: 2,
    titleKey: 'upcomingEvents.nationalChampionship.title',
    date: '2024-02-20',
    venueKey: 'upcomingEvents.nationalChampionship.venue',
    typeKey: 'upcomingEvents.nationalChampionship.type',
  },
  {
    id: 3,
    titleKey: 'upcomingEvents.youthCamp.title',
    date: '2024-02-25',
    venueKey: 'upcomingEvents.youthCamp.venue',
    typeKey: 'upcomingEvents.youthCamp.type',
  },
]

export default function Hero() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const { language } = useLanguage()

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {getTranslation(language, 'home.hero.title')}
                {language === 'en' && (
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-blue-200 mt-2">
                    د افغانستان کرکټ شبکه
                  </span>
                )}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                {getTranslation(language, 'home.hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <NewspaperIcon className="w-5 h-5 mr-2" />
                {getTranslation(language, 'home.hero.latestNews')}
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                {getTranslation(language, 'home.hero.upcomingEvents')}
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">50+</div>
                <div className="text-sm text-blue-100">{getTranslation(language, 'home.statistics.activePlayers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">15+</div>
                <div className="text-sm text-blue-100">{getTranslation(language, 'home.statistics.tournaments')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">1000+</div>
                <div className="text-sm text-blue-100">{getTranslation(language, 'home.statistics.fans')}</div>
              </div>
            </div>
          </div>

          {/* Featured News Carousel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-100">{getTranslation(language, 'home.news.title')}</h2>
            <div className="space-y-4">
              {featuredNews.map((news, index) => (
                <div
                  key={news.id}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 ${
                    index === currentNewsIndex ? 'ring-2 ring-blue-400' : 'hover:bg-white/15'
                  }`}
                  onClick={() => setCurrentNewsIndex(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center">
                      <NewspaperIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                          {getTranslation(language, `home.${news.categoryKey}`)}
                        </span>
                        <span className="text-sm text-blue-200">{news.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {getTranslation(language, `home.${news.titleKey}`)}
                      </h3>
                      <p className="text-blue-100 text-sm line-clamp-2">
                        {getTranslation(language, `home.${news.excerptKey}`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* News Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentNewsIndex ? 'bg-blue-400' : 'bg-blue-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Preview */}
        <div className="mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {getTranslation(language, 'hero.upcomingEvents')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-200">{getTranslation(language, `home.${event.typeKey}`)}</span>
                    <span className="text-sm text-blue-100">{event.date}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1">{getTranslation(language, `home.${event.titleKey}`)}</h4>
                  <p className="text-sm text-blue-100">{getTranslation(language, `home.${event.venueKey}`)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/events"
                className="inline-flex items-center text-blue-200 hover:text-white transition-colors duration-200"
              >
                {getTranslation(language, 'home.actions.viewAllEvents')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
