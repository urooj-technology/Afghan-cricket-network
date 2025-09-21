'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../../../components/ui/RTLText'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { useFetchData } from '../../../hooks'
import { getTextAlign, getFontClass, getFlexDirection, getIconSpacing } from '../../../utils/rtl'
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  StarIcon,
  UserIcon,
  ChartBarIcon,
  FireIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function PlayerDetailPage() {
  const { slug } = useParams()
  const { language, isRTL } = useLanguage()

  // Try both players and team-members endpoints
  const { data: player, isLoading: playerLoading, error: playerError } = useFetchData(`/players/${slug}`, {
    queryKey: ['player', slug],
    enabled: !!slug
  })

  const { data: teamMember, isLoading: memberLoading, error: memberError } = useFetchData(`/team-members/${slug}`, {
    queryKey: ['team-member', slug],
    enabled: !!slug && !player
  })

  const data = player || teamMember
  const isLoading = playerLoading || memberLoading
  const error = playerError && memberError

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex justify-center items-center py-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className={`text-gray-600 text-lg ${getFontClass(isRTL)}`}>
                {getTranslation(language, 'common.loading') || 'Loading...'}
              </p>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  if (error || !data) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-20">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserIcon className="w-10 h-10 text-red-600" />
                </div>
                <RTLHeading level="h1" className="text-2xl font-bold text-red-900 mb-4">
                  {getTranslation(language, 'team.playerNotFound') || 'Player not found'}
                </RTLHeading>
                <RTLParagraph className="text-red-700 mb-6">
                  {getTranslation(language, 'team.playerNotFoundDesc') || 'The requested player profile could not be found.'}
                </RTLParagraph>
                <Link 
                  href="/team" 
                  className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isRTL ? (
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  ) : (
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  )}
                  {getTranslation(language, 'common.backToTeam') || 'Back to Team'}
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'batsman':
      case 'batter':
        return 'from-blue-500 to-blue-600'
      case 'bowler':
        return 'from-green-500 to-green-600'
      case 'all-rounder':
      case 'allrounder':
        return 'from-purple-500 to-purple-600'
      case 'wicket-keeper':
      case 'wicketkeeper':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Link 
              href="/team" 
              className={`inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? (
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              ) : (
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
              )}
              <span className={getFontClass(isRTL)}>
                {getTranslation(language, 'common.backToTeam') || 'Back to Team'}
              </span>
            </Link>
            
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`lg:col-span-1 ${isRTL ? 'lg:order-3' : ''}`}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative">
                    {data.photo ? (
                      <img
                        src={data.photo}
                        alt={data.name}
                        className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full max-w-sm mx-auto h-96 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-12 h-12 text-white" />
                          </div>
                          <p className={`text-white text-lg font-medium ${getFontClass(isRTL)}`}>
                            {data.name}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">AFG</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`lg:col-span-2 ${isRTL ? 'lg:order-1 text-right' : 'text-left'}`}>
                <RTLHeading 
                  level="h1" 
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                >
                  {data.name}
                </RTLHeading>
                
                <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                  <span className={`bg-gradient-to-r ${getRoleColor(data.role || data.position)} text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg`}>
                    {data.role || data.position}
                  </span>
                  {data.jersey_number && (
                    <span className="bg-yellow-500/20 text-yellow-200 px-6 py-3 rounded-full text-lg font-bold border-2 border-yellow-400/30">
                      #{data.jersey_number}
                    </span>
                  )}
                  {data.is_captain && (
                    <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <TrophyIcon className="w-4 h-4" />
                      Captain
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className={`text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${getTextAlign(isRTL, 'center')}`}>
                    <div className="text-3xl font-bold mb-1">{data.age || 'N/A'}</div>
                    <div className={`text-blue-200 text-sm ${getFontClass(isRTL)}`}>
                      {getTranslation(language, 'team.age') || 'Age'}
                    </div>
                  </div>
                  <div className={`text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${getTextAlign(isRTL, 'center')}`}>
                    <div className="text-3xl font-bold mb-1">{data.matches_played || 0}</div>
                    <div className={`text-blue-200 text-sm ${getFontClass(isRTL)}`}>
                      {getTranslation(language, 'team.matches') || 'Matches'}
                    </div>
                  </div>
                  <div className={`text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${getTextAlign(isRTL, 'center')}`}>
                    <div className="text-3xl font-bold mb-1">{data.runs_scored || 0}</div>
                    <div className={`text-blue-200 text-sm ${getFontClass(isRTL)}`}>
                      {getTranslation(language, 'team.runs') || 'Runs'}
                    </div>
                  </div>
                  <div className={`text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${getTextAlign(isRTL, 'center')}`}>
                    <div className="text-3xl font-bold mb-1">{data.wickets_taken || 0}</div>
                    <div className={`text-blue-200 text-sm ${getFontClass(isRTL)}`}>
                      {getTranslation(language, 'team.wickets') || 'Wickets'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Main Content */}
              <div className={`lg:col-span-2 space-y-8 ${isRTL ? 'lg:order-2' : ''}`}>
                {/* Biography */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <RTLHeading level="h2" className="text-2xl font-bold text-gray-900">
                      {getTranslation(language, 'team.biography') || 'Biography'}
                    </RTLHeading>
                  </div>
                  <RTLParagraph className="text-gray-700 leading-relaxed text-lg">
                    {data.biography || `${data.name} is a talented ${(data.role || data.position)?.toLowerCase() || 'player'} for the Afghanistan national cricket team. Known for exceptional skills and dedication to the sport.`}
                  </RTLParagraph>
                </div>

                {/* Career Stats */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <ChartBarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <RTLHeading level="h2" className="text-2xl font-bold text-gray-900">
                      {getTranslation(language, 'team.careerStats') || 'Career Statistics'}
                    </RTLHeading>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{data.matches_played || 0}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.matchesPlayed') || 'Matches Played'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-green-600 mb-2">{data.runs_scored || 0}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.runsScored') || 'Runs Scored'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{data.wickets_taken || 0}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.wicketsTaken') || 'Wickets Taken'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">{data.batting_average || 'N/A'}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.battingAverage') || 'Batting Average'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl hover:from-red-100 hover:to-red-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-red-600 mb-2">{data.bowling_average || 'N/A'}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.bowlingAverage') || 'Bowling Average'}
                      </div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="text-3xl font-bold text-indigo-600 mb-2">{data.strike_rate || 'N/A'}</div>
                      <div className={`text-gray-600 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.strikeRate') || 'Strike Rate'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className={`lg:col-span-1 space-y-6 ${isRTL ? 'lg:order-1' : ''}`}>
                {/* Personal Info */}
                <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <UserIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <RTLHeading level="h3" className="text-lg font-bold text-gray-900">
                      {getTranslation(language, 'team.personalInfo') || 'Personal Information'}
                    </RTLHeading>
                  </div>
                  <div className="space-y-4">
                    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CalendarIcon className={`w-5 h-5 text-gray-400 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className={`text-sm text-gray-600 ${getFontClass(isRTL)}`}>
                          {getTranslation(language, 'team.dateOfBirth') || 'Date of Birth'}
                        </div>
                        <div className={`font-medium text-gray-900 ${getFontClass(isRTL)}`}>
                          {data.date_of_birth || getTranslation(language, 'common.notAvailable') || 'Not available'}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPinIcon className={`w-5 h-5 text-gray-400 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className={`text-sm text-gray-600 ${getFontClass(isRTL)}`}>
                          {getTranslation(language, 'team.birthplace') || 'Birthplace'}
                        </div>
                        <div className={`font-medium text-gray-900 ${getFontClass(isRTL)}`}>
                          {data.birthplace || 'Afghanistan'}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <ShieldCheckIcon className={`w-5 h-5 text-gray-400 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className={`text-sm text-gray-600 ${getFontClass(isRTL)}`}>
                          {getTranslation(language, 'team.playingRole') || 'Playing Role'}
                        </div>
                        <div className={`font-medium text-gray-900 ${getFontClass(isRTL)}`}>
                          {data.role || data.position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <TrophyIcon className="w-5 h-5 text-yellow-600" />
                    </div>
                    <RTLHeading level="h3" className="text-lg font-bold text-gray-900">
                      {getTranslation(language, 'team.achievements') || 'Achievements'}
                    </RTLHeading>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex items-center p-3 bg-yellow-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <TrophyIcon className={`w-5 h-5 text-yellow-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <span className={`text-gray-700 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.nationalTeam') || 'Afghanistan National Team'}
                      </span>
                    </div>
                    <div className={`flex items-center p-3 bg-blue-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <StarIcon className={`w-5 h-5 text-blue-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <span className={`text-gray-700 font-medium ${getFontClass(isRTL)}`}>
                        {getTranslation(language, 'team.professionalCricketer') || 'Professional Cricketer'}
                      </span>
                    </div>
                    {data.is_captain && (
                      <div className={`flex items-center p-3 bg-purple-50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <FireIcon className={`w-5 h-5 text-purple-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <span className={`text-gray-700 font-medium ${getFontClass(isRTL)}`}>
                          {getTranslation(language, 'team.teamCaptain') || 'Team Captain'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <GlobeAltIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <RTLHeading level="h3" className="text-lg font-bold text-gray-900">
                      {getTranslation(language, 'team.followPlayer') || 'Follow'}
                    </RTLHeading>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold transform hover:scale-105">
                      Twitter
                    </button>
                    <button className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 px-4 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 font-semibold transform hover:scale-105">
                      Facebook
                    </button>
                    <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-semibold transform hover:scale-105">
                      Instagram
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold transform hover:scale-105">
                      YouTube
                    </button>
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