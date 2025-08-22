'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import Link from "next/link";

const newsData = [
  {
    id: 1,
    title: {
      ps: 'د افغانستان کرکټ ټیم د T20 نړیوال جام 2024 لپاره وړاندیز شو',
      en: 'Afghanistan Cricket Team Qualifies for T20 World Cup 2024'
    },
    excerpt: {
      ps: 'تاریخي وړاندیز د افغانستان د کرکټ لپاره د نوي دور نښه کوي.',
      en: 'Historic qualification marks a new era for Afghan cricket on the global stage.'
    },
    category: 'international',
    date: '2024-01-15',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
  },
  {
    id: 2,
    title: {
      ps: 'د کابل کې نوی کرکټ اکاډمۍ پرانیستل شو',
      en: 'New Cricket Academy Opens in Kabul'
    },
    excerpt: {
      ps: 'د نوي نسل د افغان کرکټ لوبغاړو د روزنې لپاره د عصري سامانونو سره تاسیسات.',
      en: 'State-of-the-art facility to train the next generation of Afghan cricketers.'
    },
    category: 'domestic',
    date: '2024-01-12',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
  },
  {
    id: 3,
    title: {
      ps: 'رشید خان د راتلونکي سلسلې لپاره د کپتان په توګه وړاندیز شو',
      en: 'Rashid Khan Named Captain for Upcoming Series'
    },
    excerpt: {
      ps: 'ستوری سپینر به د افغانستان په مهمو نړیوالو لوبو کې مشري وکړي.',
      en: 'Star spinner to lead Afghanistan in crucial international fixtures.'
    },
    category: 'teamNews',
    date: '2024-01-10',
    author: 'ACN Staff',
    image: '/api/placeholder/400/250',
  },
]

export default function News() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'news.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((article) => (
              <article key={article.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">📰</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getTranslation(language, `news.categories.${article.category}`)}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {new Date(article.date).toLocaleDateString(language === 'ps' ? 'fa-IR' : 'en-US')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title[language]}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt[language]}
                  </p>
                  <Link 
                    href={`/news/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {getTranslation(language, 'news.readMore')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
