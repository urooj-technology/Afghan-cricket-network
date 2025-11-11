'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../../components/ui/RTLText'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import { TrophyIcon, UsersIcon, GlobeAltIcon, HeartIcon, StarIcon, FlagIcon } from '@heroicons/react/24/outline'
import { getTextAlign, getFontClass } from '../../utils/rtl'

export default function About() {
  const { language, isRTL } = useLanguage()
  
  const { data: teamMembers, isLoading } = useFetchData('/about-team', {
    queryKey: ['about-team'],
    params: { is_active: true, ordering: 'order,name' }
  })

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
      
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-48">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <RTLHeading 
                level="h1" 
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent"
                align="center"
              >
                {getTranslation(language, 'about.title')}
              </RTLHeading>
              <RTLParagraph 
                className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl shadow-lg h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-lg h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-indigo-100 rounded-xl shadow-lg h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <RTLHeading 
              level="h2" 
              className="text-3xl font-bold text-gray-900 mb-4"
              align="center"
            >
              {getTranslation(language, 'about.team.title') || 'Our Leadership Team'}
            </RTLHeading>
            <RTLParagraph 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              align="center"
            >
              {getTranslation(language, 'about.team.subtitle') || 'Meet the dedicated professionals driving cricket development in Afghanistan'}
            </RTLParagraph>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers?.results?.map((member, index) => {
                const colors = [
                  'from-indigo-600 to-purple-600',
                  'from-purple-600 to-pink-600',
                  'from-pink-600 to-indigo-600'
                ]
                const textColors = [
                  'text-blue-600',
                  'text-green-600',
                  'text-purple-600'
                ]
                return (
                  <div key={member.id} className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col items-center">
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                      />
                    ) : (
                      <div className={`w-24 h-24 bg-gradient-to-r ${colors[index % 3]} rounded-full flex items-center justify-center mb-4`}>
                        <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <h3 className={`text-xl font-semibold text-gray-900 mb-2 text-center ${isRTL ? 'font-arabic' : ''}`}>
                      {member.name}
                    </h3>
                    <p className={`${textColors[index % 3]} font-medium mb-3 text-center ${isRTL ? 'font-arabic' : ''}`}>
                      {member.position}
                    </p>
                    {member.bio && (
                      <p className={`text-gray-600 text-sm text-center leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                        {member.bio}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

        <Footer />
      </main>
    </RTLWrapper>
  )
}
