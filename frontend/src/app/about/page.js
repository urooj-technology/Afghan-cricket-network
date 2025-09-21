'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../../components/ui/RTLText'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { TrophyIcon, UsersIcon, GlobeAltIcon, HeartIcon, StarIcon, FlagIcon } from '@heroicons/react/24/outline'
import { getTextAlign, getFontClass } from '../../utils/rtl'

export default function About() {
  const { language, isRTL } = useLanguage()

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
      
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <RTLHeading 
                level="h1" 
                className="text-4xl md:text-5xl font-bold mb-6"
                align="center"
              >
                {getTranslation(language, 'about.title')}
              </RTLHeading>
              <RTLParagraph 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                align="center"
              >
                {getTranslation(language, 'about.subtitle')}
              </RTLParagraph>
            </div>
          </div>
        </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrophyIcon className="w-8 h-8 text-white" />
              </div>
              <RTLHeading 
                level="h3" 
                className="text-2xl font-bold text-gray-900 mb-4"
                align="center"
              >
                {getTranslation(language, 'about.mission')}
              </RTLHeading>
              <RTLParagraph 
                className="text-gray-700 leading-relaxed"
                align="center"
              >
                {getTranslation(language, 'about.missionText')}
              </RTLParagraph>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <RTLHeading 
                level="h3" 
                className="text-2xl font-bold text-gray-900 mb-4"
                align="center"
              >
                {getTranslation(language, 'about.vision')}
              </RTLHeading>
              <RTLParagraph 
                className="text-gray-700 leading-relaxed"
                align="center"
              >
                {getTranslation(language, 'about.visionText')}
              </RTLParagraph>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <RTLHeading 
                level="h3" 
                className="text-2xl font-bold text-gray-900 mb-4"
                align="center"
              >
                {getTranslation(language, 'about.values')}
              </RTLHeading>
              <RTLParagraph 
                className="text-gray-700 leading-relaxed"
                align="center"
              >
                {getTranslation(language, 'about.valuesText')}
              </RTLParagraph>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              {getTranslation(language, 'about.coreValues.title') || 'Core Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <StarIcon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getTranslation(language, 'about.coreValues.excellence') || 'Excellence'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {getTranslation(language, 'about.coreValues.excellenceText') || 'Striving for the highest standards in everything we do'}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <FlagIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getTranslation(language, 'about.coreValues.integrity') || 'Integrity'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {getTranslation(language, 'about.coreValues.integrityText') || 'Maintaining honesty and ethical behavior'}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <UsersIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getTranslation(language, 'about.coreValues.unity') || 'Unity'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {getTranslation(language, 'about.coreValues.unityText') || 'Working together for common goals'}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <HeartIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getTranslation(language, 'about.coreValues.passion') || 'Passion'}
              </h3>
                <p className="text-gray-600 text-sm">
                  {getTranslation(language, 'about.coreValues.passionText') || 'Deep love and commitment to cricket'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(language, 'about.history') || 'History'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getTranslation(language, 'about.historyText')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2001</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.timeline.2001.title') || 'Foundation'}
              </h3>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.timeline.2001.description') || 'Afghanistan cricket journey begins'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2009</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.timeline.2009.title') || 'ICC Membership'}
              </h3>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.timeline.2009.description') || 'Gained ICC Associate Member status'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2015</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.timeline.2015.title') || 'World Cup Debut'}
              </h3>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.timeline.2015.description') || 'First appearance in Cricket World Cup'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2024</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.timeline.2024.title') || 'Future Vision'}
              </h3>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.timeline.2024.description') || 'Building the next generation of players'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(language, 'about.achievements.title') || 'Key Achievements'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getTranslation(language, 'about.achievements.subtitle') || 'Milestones in our journey to promote cricket in Afghanistan'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-4">34</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {getTranslation(language, 'about.achievements.provinces.title') || 'Provinces Covered'}
              </h3>
              <p className="text-gray-700">
                {getTranslation(language, 'about.achievements.provinces.description') || 'Cricket development programs across all Afghan provinces'}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-4">500+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {getTranslation(language, 'about.achievements.players.title') || 'Players Trained'}
              </h3>
              <p className="text-gray-700">
                {getTranslation(language, 'about.achievements.players.description') || 'Young cricketers developed through our programs'}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-4">25</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {getTranslation(language, 'about.achievements.academies.title') || 'Cricket Academies'}
              </h3>
              <p className="text-gray-700">
                {getTranslation(language, 'about.achievements.academies.description') || 'Training facilities established nationwide'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(language, 'about.team.title') || 'Our Leadership Team'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getTranslation(language, 'about.team.subtitle') || 'Meet the dedicated professionals driving cricket development in Afghanistan'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">AS</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.team.director.name') || 'Ahmad Shah Abdullah'}
              </h3>
              <p className="text-blue-600 font-medium mb-3">
                {getTranslation(language, 'about.team.director.position') || 'Network Director'}
              </p>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.team.director.bio') || 'Leading cricket development initiatives across Afghanistan'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">FA</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.team.coordinator.name') || 'Fatima Ahmadi'}
              </h3>
              <p className="text-green-600 font-medium mb-3">
                {getTranslation(language, 'about.team.coordinator.position') || 'Women\'s Cricket Coordinator'}
              </p>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.team.coordinator.bio') || 'Promoting women\'s cricket development and participation'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">MK</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getTranslation(language, 'about.team.trainer.name') || 'Mohammad Karim'}
              </h3>
              <p className="text-purple-600 font-medium mb-3">
                {getTranslation(language, 'about.team.trainer.position') || 'Training Coordinator'}
              </p>
              <p className="text-gray-600 text-sm">
                {getTranslation(language, 'about.team.trainer.bio') || 'Overseeing player development and training programs'}
              </p>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </main>
    </RTLWrapper>
  )
}
