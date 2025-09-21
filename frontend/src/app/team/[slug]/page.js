'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useFetchData } from '../../../hooks'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  StarIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function PlayerDetailPage() {
  const { slug } = useParams()
  const { language, isRTL } = useLanguage()

  const { data: player, isLoading, error } = useFetchData(`/players/${slug}`, {
    queryKey: ['player', slug],
    enabled: !!slug
  })

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <LoadingSpinner size="lg" />
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  if (error || !player) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Player not found</h1>
              <Link href="/team" className="text-blue-600 hover:text-blue-800">
                Back to Team
              </Link>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link href="/team" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Team
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="relative">
                  <img
                    src={player.photo || '/api/placeholder/300/400'}
                    alt={player.name}
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                    <img
                      src="/api/placeholder/60/60"
                      alt="Afghanistan Cricket"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{player.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-lg font-medium">
                    {player.position}
                  </span>
                  <span className="bg-yellow-500/20 text-yellow-200 px-4 py-2 rounded-full">
                    #{player.jersey_number}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">{player.age || 'N/A'}</div>
                    <div className="text-blue-200">Age</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{player.matches_played || 0}</div>
                    <div className="text-blue-200">Matches</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{player.runs_scored || 0}</div>
                    <div className="text-blue-200">Runs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{player.wickets_taken || 0}</div>
                    <div className="text-blue-200">Wickets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Player Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Biography</h2>
                <p className="text-gray-700 leading-relaxed">
                  {player.biography || `${player.name} is a talented ${player.position.toLowerCase()} for the Afghanistan national cricket team. Known for exceptional skills and dedication to the sport.`}
                </p>
              </div>

              {/* Career Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{player.matches_played || 0}</div>
                    <div className="text-gray-600">Matches Played</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{player.runs_scored || 0}</div>
                    <div className="text-gray-600">Runs Scored</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{player.wickets_taken || 0}</div>
                    <div className="text-gray-600">Wickets Taken</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{player.batting_average || 'N/A'}</div>
                    <div className="text-gray-600">Batting Average</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{player.bowling_average || 'N/A'}</div>
                    <div className="text-gray-600">Bowling Average</div>
                  </div>
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{player.strike_rate || 'N/A'}</div>
                    <div className="text-gray-600">Strike Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Date of Birth</div>
                      <div className="font-medium">{player.date_of_birth || 'Not available'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Birthplace</div>
                      <div className="font-medium">{player.birthplace || 'Afghanistan'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Playing Role</div>
                      <div className="font-medium">{player.position}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <TrophyIcon className="w-5 h-5 text-yellow-500 mr-3" />
                    <span className="text-gray-700">Afghanistan National Team</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">Professional Cricketer</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Follow</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Twitter
                  </button>
                  <button className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors">
                    Facebook
                  </button>
                  <button className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                    Instagram
                  </button>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </RTLWrapper>
  )
}