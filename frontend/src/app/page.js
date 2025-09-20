'use client'

import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import NewsSection from '../components/sections/NewsSection'
import RankingsSection from '../components/sections/RankingsSection'
import EventsSection from '../components/sections/EventsSection'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../lib/translations'

export default function Home() {
  const { language } = useLanguage()
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <NewsSection />
      <RankingsSection />
      <EventsSection />
      
      {/* Additional sections will be added here */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {getTranslation(language, 'home.welcome.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getTranslation(language, 'home.welcome.description')}
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
