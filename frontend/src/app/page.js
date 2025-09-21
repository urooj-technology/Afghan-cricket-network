'use client'

import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import NewsSection from '../components/sections/NewsSection'
import RankingsSection from '../components/sections/RankingsSection'
import EventsSection from '../components/sections/EventsSection'
import Footer from '../components/layout/Footer'
import RTLWrapper from '../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../components/ui/RTLText'
import { useLanguage } from '../contexts/LanguageContext'
import { getTranslation } from '../lib/translations'

export default function Home() {
  const { language, isRTL } = useLanguage()
  
  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        
        {/* Main Content Sections */}
        <div className="space-y-16 py-8">
          <NewsSection />
          <RankingsSection />
          <EventsSection />
        </div>
        
        {/* Welcome Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <RTLHeading 
                level="h2" 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
                align="center"
              >
                {getTranslation(language, 'home.welcome.title')}
              </RTLHeading>
              <RTLParagraph 
                className="text-xl text-gray-700 leading-relaxed mb-12"
                align="center"
              >
                {getTranslation(language, 'home.welcome.description')}
              </RTLParagraph>
              
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <RTLHeading level="h3" className="text-xl font-semibold text-gray-900 mb-4" align="center">
                    {getTranslation(language, 'home.features.liveScores.title')}
                  </RTLHeading>
                  <RTLParagraph className="text-gray-600" align="center">
                    {getTranslation(language, 'home.features.liveScores.description')}
                  </RTLParagraph>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <RTLHeading level="h3" className="text-xl font-semibold text-gray-900 mb-4" align="center">
                    {getTranslation(language, 'home.features.news.title')}
                  </RTLHeading>
                  <RTLParagraph className="text-gray-600" align="center">
                    {getTranslation(language, 'home.features.news.description')}
                  </RTLParagraph>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <RTLHeading level="h3" className="text-xl font-semibold text-gray-900 mb-4" align="center">
                    {getTranslation(language, 'home.features.community.title')}
                  </RTLHeading>
                  <RTLParagraph className="text-gray-600" align="center">
                    {getTranslation(language, 'home.features.community.description')}
                  </RTLParagraph>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </RTLWrapper>
  )
}
