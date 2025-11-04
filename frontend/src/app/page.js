'use client'

import Link from 'next/link'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import NewsSection from '../components/sections/NewsSection'
import TeamSection from '../components/sections/TeamSection'
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
        
        {/* About Us Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <RTLHeading level="h2" className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'about.title')}
              </RTLHeading>
              <RTLParagraph className={`text-lg text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'about.subtitle')}
              </RTLParagraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.mission')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-700 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.missionText')}
                </RTLParagraph>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.vision')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-700 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.visionText')}
                </RTLParagraph>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-indigo-100 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <RTLHeading level="h3" className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.values')}
                </RTLHeading>
                <RTLParagraph className={`text-gray-700 ${isRTL ? 'font-arabic' : ''}`} align="center">
                  {getTranslation(language, 'about.valuesText')}
                </RTLParagraph>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {getTranslation(language, 'common.buttons.learnMore')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
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
        
        {/* Contact Us Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <RTLHeading level="h2" className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'contact.title')}
              </RTLHeading>
              <RTLParagraph className={`text-lg text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`} align="center">
                {getTranslation(language, 'contact.subtitle')}
              </RTLParagraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'contact.info.phone')}
                </h3>
                <p className="text-gray-600">+93 70 123 4567</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'contact.info.email')}
                </h3>
                <p className="text-gray-600">info@afghancricket.com</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {getTranslation(language, 'contact.info.address')}
                </h3>
                <p className="text-gray-600">Kabul, Afghanistan</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {getTranslation(language, 'common.buttons.contactUs')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
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
