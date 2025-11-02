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
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
        <Hero />
        
        {/* Main Content Sections */}
        <div className="py-16">
          <NewsSection />
        </div>
        
        {/* Cricket Stats Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/20 rounded-full animate-pulse"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <RTLHeading level="h2" className={`text-3xl sm:text-4xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'home.cricketStats.title')}
              </RTLHeading>
              <RTLParagraph className={`text-lg text-white/80 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'home.cricketStats.subtitle')}
              </RTLParagraph>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <div className={`text-white/80 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'home.cricketStats.worldCupMatches')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">100+</div>
                <div className={`text-white/80 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'home.cricketStats.internationalMatches')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className={`text-white/80 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'home.cricketStats.activeFans')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">20+</div>
                <div className={`text-white/80 text-sm ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'home.cricketStats.teamPlayers')}</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <RTLHeading level="h2" className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'home.welcome.title')}
              </RTLHeading>
              <RTLParagraph className={`text-lg text-gray-600 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'home.welcome.description')}
              </RTLParagraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-indigo-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.liveScores.title')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.liveScores.description')}
                </RTLParagraph>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.news.title')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.news.description')}
                </RTLParagraph>
              </div>
              
              <div className="group bg-gradient-to-br from-pink-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-pink-100">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.community.title')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'home.features.community.description')}
                </RTLParagraph>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </RTLWrapper>
  )
}
