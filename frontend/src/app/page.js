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
        <div className="space-y-24 py-20">
          <div className="relative bg-white shadow-xl rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-purple-50/30"></div>
            <div className="relative">
              <NewsSection />
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 shadow-xl rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
            <div className="relative">
              <RankingsSection />
            </div>
          </div>
          <div className="relative bg-white shadow-xl rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-pink-50/30"></div>
            <div className="relative">
              <EventsSection />
            </div>
          </div>
        </div>
        
        {/* Welcome Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden">
          {/* Advanced Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/5 to-indigo-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-6xl mx-auto">
              <div className="mb-20">
                <RTLHeading 
                  level="h2" 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 lg:mb-10 leading-tight tracking-tight"
                  align="center"
                >
                  {getTranslation(language, 'home.welcome.title')}
                </RTLHeading>
                <RTLParagraph 
                  className="text-xl sm:text-2xl lg:text-3xl text-slate-700 leading-relaxed max-w-5xl mx-auto font-medium"
                  align="center"
                >
                  {getTranslation(language, 'home.welcome.description')}
                </RTLParagraph>
              </div>
              
              {/* Professional Feature Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] h-full flex flex-col border border-white/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-indigo-100 via-indigo-200 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <svg className="w-12 h-12 lg:w-14 lg:h-14 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <RTLHeading level="h3" className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-8 flex-shrink-0 group-hover:text-indigo-700 transition-colors duration-300" align="center">
                      {getTranslation(language, 'home.features.liveScores.title')}
                    </RTLHeading>
                    <RTLParagraph className="text-slate-600 text-lg lg:text-xl xl:text-2xl leading-relaxed flex-1 font-medium" align="center">
                      {getTranslation(language, 'home.features.liveScores.description')}
                    </RTLParagraph>
                  </div>
                </div>
                
                <div className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] h-full flex flex-col border border-white/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-100 via-purple-200 to-pink-200 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <svg className="w-12 h-12 lg:w-14 lg:h-14 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <RTLHeading level="h3" className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-8 flex-shrink-0 group-hover:text-purple-700 transition-colors duration-300" align="center">
                      {getTranslation(language, 'home.features.news.title')}
                    </RTLHeading>
                    <RTLParagraph className="text-slate-600 text-lg lg:text-xl xl:text-2xl leading-relaxed flex-1 font-medium" align="center">
                      {getTranslation(language, 'home.features.news.description')}
                    </RTLParagraph>
                  </div>
                </div>
                
                <div className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-10 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-[1.02] h-full flex flex-col border border-white/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-pink-100 via-pink-200 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                      <svg className="w-12 h-12 lg:w-14 lg:h-14 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <RTLHeading level="h3" className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-8 flex-shrink-0 group-hover:text-pink-700 transition-colors duration-300" align="center">
                      {getTranslation(language, 'home.features.community.title')}
                    </RTLHeading>
                    <RTLParagraph className="text-slate-600 text-lg lg:text-xl xl:text-2xl leading-relaxed flex-1 font-medium" align="center">
                      {getTranslation(language, 'home.features.community.description')}
                    </RTLParagraph>
                  </div>
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
