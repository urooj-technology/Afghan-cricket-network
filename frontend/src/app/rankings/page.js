'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import { 
  TrophyIcon, 
  UserIcon, 
  UsersIcon, 
  StarIcon, 
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  FireIcon,
  BoltIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { 
  TrophyIcon as TrophySolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid'

const formats = [
  { 
    key: 't20i', 
    display: 'T20I', 
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500',
    textColor: 'text-red-600',
    icon: BoltIcon,
    description: 'Twenty20 International'
  },
  { 
    key: 'odi', 
    display: 'ODI', 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-600',
    icon: ShieldCheckIcon,
    description: 'One Day International'
  },
  { 
    key: 'test', 
    display: 'Test', 
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500',
    textColor: 'text-green-600',
    icon: TrophyIcon,
    description: 'Test Cricket'
  }
]

const categories = [
  { 
    key: 'batting', 
    display: 'Batting', 
    icon: ChartBarIcon, 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    description: 'Batting performance rankings'
  },
  { 
    key: 'bowling', 
    display: 'Bowling', 
    icon: FireIcon, 
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    description: 'Bowling performance rankings'
  },
  { 
    key: 'all-rounder', 
    display: 'All-Rounder', 
    icon: StarIcon, 
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    description: 'All-round performance rankings'
  },
  { 
    key: 'teams', 
    display: 'Teams', 
    icon: UsersIcon, 
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    description: 'Team performance rankings'
  }
]

export default function RankingsPage() {
  const [selectedFormat, setSelectedFormat] = useState('t20i')
  const [selectedCategory, setSelectedCategory] = useState('batting')
  const { language, isRTL } = useLanguage()

  // Map frontend category to backend category
  const getBackendCategory = (category) => {
    if (category === 'all-rounder') return 'all-rounder'
    return category
  }

  // Fetch team rankings with error handling
  const { data: teamRankings, isLoading: teamLoading, error: teamError } = useFetchData('/team-rankings', {
    queryKey: ['team-rankings'],
    enabled: selectedCategory === 'teams',
    retry: false
  })

  // Fetch player rankings with error handling
  const { data: playerRankings, isLoading: playerLoading, error: playerError } = useFetchData('/player-rankings', {
    queryKey: ['player-rankings'],
    enabled: selectedCategory !== 'teams',
    retry: false,
    onError: (error) => {
      console.log('Player rankings API error:', error.response?.status)
    }
  })



  // Fetch all rankings for stats with error handling
  const { data: allTeamRankings } = useFetchData('/team-rankings', {
    queryKey: ['team-rankings', 'all'],
    params: { 
      page_size: 100,
      is_published: true
    },
    retry: false
  })

  const { data: allPlayerRankings } = useFetchData('/player-rankings', {
    queryKey: ['player-rankings', 'all'],
    params: { 
      page_size: 100,
      is_published: true
    },
    retry: false
  })

  const getCurrentRankings = () => {
    if (selectedCategory === 'teams') {
      const data = teamRankings?.results || teamRankings || []
      return data.filter(item => item.format === selectedFormat)
    }
    const data = playerRankings?.results || playerRankings || []
    return data.filter(item => 
      item.category === getBackendCategory(selectedCategory) && 
      item.format === selectedFormat
    )
  }

  // Mock data for demonstration if no backend data
  const mockTeamRankings = [
    { id: 1, team_name: 'Afghanistan', format: selectedFormat, rank: 1, rating: 850, points: 850, matches_played: 25, country_code: 'AFG' },
    { id: 2, team_name: 'India', format: selectedFormat, rank: 2, rating: 820, points: 820, matches_played: 30, country_code: 'IND' },
    { id: 3, team_name: 'Pakistan', format: selectedFormat, rank: 3, rating: 800, points: 800, matches_played: 28, country_code: 'PAK' },
  ]

  const mockPlayerRankings = [
    { 
      id: 1, 
      player_name: selectedCategory === 'batting' ? 'Rahmanullah Gurbaz' : selectedCategory === 'bowling' ? 'Rashid Khan' : 'Mohammad Nabi', 
      category: getBackendCategory(selectedCategory), 
      format: selectedFormat, 
      rank: 1, 
      rating: 900, 
      points: selectedCategory === 'bowling' ? undefined : 900, 
      wickets: selectedCategory === 'bowling' ? 150 : undefined, 
      country: 'Afghanistan' 
    },
    { 
      id: 2, 
      player_name: selectedCategory === 'batting' ? 'Hashmatullah Shahidi' : selectedCategory === 'bowling' ? 'Mujeeb Ur Rahman' : 'Gulbadin Naib', 
      category: getBackendCategory(selectedCategory), 
      format: selectedFormat, 
      rank: 2, 
      rating: 850, 
      points: selectedCategory === 'bowling' ? undefined : 850, 
      wickets: selectedCategory === 'bowling' ? 120 : undefined, 
      country: 'Afghanistan' 
    },
    { 
      id: 3, 
      player_name: selectedCategory === 'batting' ? 'Ibrahim Zadran' : selectedCategory === 'bowling' ? 'Fazalhaq Farooqi' : 'Azmatullah Omarzai', 
      category: getBackendCategory(selectedCategory), 
      format: selectedFormat, 
      rank: 3, 
      rating: 800, 
      points: selectedCategory === 'bowling' ? undefined : 800, 
      wickets: selectedCategory === 'bowling' ? 95 : undefined, 
      country: 'Afghanistan' 
    },
  ]

  // Check for API errors first
  const hasApiError = (selectedCategory === 'teams' ? teamError : playerError)
  const currentIsLoading = selectedCategory === 'teams' ? teamLoading : playerLoading
  
  // Use API data if available, otherwise fall back to mock data
  const apiRankings = getCurrentRankings()
  const hasApiData = apiRankings && apiRankings.length > 0
  const finalRankings = hasApiData ? apiRankings : 
    (selectedCategory === 'teams' ? mockTeamRankings : mockPlayerRankings)

  const currentRankings = getCurrentRankings()
  const selectedCategoryData = categories.find(cat => cat.key === selectedCategory)
  const selectedFormatData = formats.find(fmt => fmt.key === selectedFormat)

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800'
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
    if (rank <= 10) return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    return 'bg-gray-100 text-gray-600'
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUpIcon className="w-4 h-4 text-green-500" />
    if (change < 0) return <ArrowDownIcon className="w-4 h-4 text-red-500" />
    return <MinusIcon className="w-4 h-4 text-gray-400" />
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-32 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center ${isRTL ? 'rtl-content' : ''}`}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
                <TrophySolidIcon className="w-10 h-10 text-yellow-400" />
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'rankings.title') || 'Cricket Rankings')}
              </h1>
              <p className={`text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-8 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'rankings.subtitle') || 'Official ICC rankings and statistics for teams and players')}
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/90 z-10 ${isRTL ? 'right-4' : 'left-4'}`} />
                  <input
                    type="text"
                    placeholder={String(getTranslation(language, 'rankings.searchPlaceholder') || 'Search rankings...')}
                    className={`w-full py-4 px-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white placeholder-white/70 ${isRTL ? 'text-right font-arabic' : ''}`}
                  />
                </div>
              </div>
              

            </div>
          </div>
        </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-12">
        {/* Format Selection */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {String(getTranslation(language, 'rankings.format') || 'Select Format')}
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {String(getTranslation(language, 'rankings.formatDescription') || 'Choose the cricket format to view rankings')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {formats.map((format) => {
              const IconComponent = format.icon
              return (
                <div
                  key={format.key}
                  onClick={() => setSelectedFormat(format.key)}
                  className={`group cursor-pointer bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                    selectedFormat === format.key 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`relative p-8 bg-gradient-to-br ${format.color} text-white`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-center">
                      <IconComponent className="w-12 h-12 mx-auto mb-4" />
                      <h3 className={`text-2xl font-bold mb-2 text-center ${isRTL ? 'font-arabic' : ''}`}>
                        {format.display}
                      </h3>
                      <p className={`text-sm opacity-90 text-center ${isRTL ? 'font-arabic' : ''}`}>
                        {format.description}
                      </p>
                    </div>
                    {selectedFormat === format.key && (
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <TrophySolidIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Category Selection */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {String(getTranslation(language, 'rankings.category') || 'Select Category')}
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {String(getTranslation(language, 'rankings.categoryDescription') || 'Choose the ranking category to explore')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                    selectedCategory === category.key 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${category.textColor}`} />
                    </div>
                    <h3 className={`text-lg font-bold text-gray-900 mb-2 text-center ${isRTL ? 'font-arabic' : ''}`}>
                      {String(getTranslation(language, `rankings.categories.${category.key}`) || category.display)}
                    </h3>
                    <p className={`text-sm text-gray-600 text-center ${isRTL ? 'font-arabic' : ''}`}>
                      {category.description}
                    </p>
                    {selectedCategory === category.key && (
                      <div className="mt-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <TrophySolidIcon className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          {String(getTranslation(language, 'common.selected') || 'Selected')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Loading State */}
        {currentIsLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className={`text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                {String(getTranslation(language, 'common.loading') || 'Loading rankings...')}
              </p>
            </div>
          </div>
        )}

        {/* Rankings Grid */}
        {!currentIsLoading && finalRankings.length > 0 && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className={`text-2xl sm:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {selectedCategoryData && (
                  <span className="inline-flex items-center gap-3">
                    <selectedCategoryData.icon className={`w-8 h-8 ${selectedCategoryData.textColor}`} />
                    {selectedCategory === 'teams'
                      ? `${String(getTranslation(language, 'rankings.teamRankings') || 'Team Rankings')} - ${selectedFormatData?.display}`
                      : `${String(getTranslation(language, `rankings.categories.${selectedCategory}`) || selectedCategoryData.display)} ${String(getTranslation(language, 'rankings.rankings') || 'Rankings')} - ${selectedFormatData?.display}`
                    }
                  </span>
                )}
              </h2>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {finalRankings.length} {String(getTranslation(language, 'common.entries') || 'entries')}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {finalRankings.map((item, index) => {
                const isTopRank = item.rank <= 3
                const isFirst = item.rank === 1
                return (
                  <div
                    key={index}
                    className={`group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 ${
                      isFirst ? 'border-yellow-400 ring-4 ring-yellow-100 bg-gradient-to-br from-yellow-50 to-white' :
                      isTopRank ? 'border-blue-400 ring-2 ring-blue-100 bg-gradient-to-br from-blue-50 to-white' :
                      'border-gray-100 hover:border-gray-300 bg-gradient-to-br from-gray-50 to-white'
                    }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {/* Rank Badge */}
                    <div className="relative">
                      <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-10`}>
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${getRankBadgeColor(item.rank)}`}>
                          {isFirst && <TrophySolidIcon className="w-4 h-4 mr-1" />}
                          #{item.rank}
                        </div>
                      </div>
                      
                      {/* Background Pattern */}
                      <div className={`h-32 bg-gradient-to-br ${
                        isFirst ? 'from-yellow-400 to-yellow-500' :
                        isTopRank ? 'from-blue-500 to-blue-600' :
                        'from-gray-400 to-gray-500'
                      } relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Avatar */}
                      <div className="flex justify-center -mt-8 mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-lg flex items-center justify-center border-3 border-white ring-1 ring-gray-100">
                          {selectedCategory === 'teams' ? (
                            <UsersIcon className="w-7 h-7 text-gray-700 pt-1" />
                          ) : (
                            <UserIcon className="w-7 h-7 text-gray-700 pt-1" />
                          )}
                        </div>
                      </div>
                      
                      {/* Name */}
                      <h3 className={`text-lg font-bold text-gray-900 text-center mb-2 line-clamp-1 ${isRTL ? 'font-arabic' : ''}`}>
                        {selectedCategory === 'teams' 
                          ? item.team_name
                          : item.player_name
                        }
                      </h3>
                      
                      {/* Country for players */}
                      {selectedCategory !== 'teams' && (
                        <div className="flex items-center justify-center mb-3">
                          <span className="text-sm mr-1">🇦🇫</span>
                          <span className={`text-xs text-gray-600 font-medium ${isRTL ? 'font-arabic' : ''}`}>
                            {item.country || 'Afghanistan'}
                          </span>
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="space-y-2">
                        {/* Rating */}
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={`text-xs font-medium text-gray-600 uppercase tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                              {String(getTranslation(language, 'rankings.columns.rating') || 'Rating')}
                            </span>
                            <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                isFirst ? 'from-yellow-400 to-yellow-500' :
                                isTopRank ? 'from-blue-500 to-blue-600' :
                                'from-gray-400 to-gray-500'
                              }`}
                              style={{ width: `${Math.min((item.rating / 1000) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Points/Stats */}
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={`text-xs font-medium text-gray-600 uppercase tracking-wider ${isRTL ? 'font-arabic' : ''}`}>
                              {selectedCategory === 'batting' ? String(getTranslation(language, 'rankings.columns.points') || 'Points') :
                               selectedCategory === 'bowling' ? String(getTranslation(language, 'rankings.columns.wickets') || 'Wickets') :
                               selectedCategory === 'teams' ? String(getTranslation(language, 'rankings.columns.points') || 'Points') : 
                               String(getTranslation(language, 'rankings.columns.points') || 'Points')}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {selectedCategory === 'bowling' ? item.wickets : item.points}
                            </span>
                          </div>
                        </div>
                        
                        {/* Change indicator */}
                        {item.change !== undefined && (
                          <div className={`flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {getChangeIcon(item.change)}
                            <span className={`text-xs font-medium ${
                              item.change > 0 ? 'text-green-600' :
                              item.change < 0 ? 'text-red-600' :
                              'text-gray-500'
                            } ${isRTL ? 'font-arabic' : ''}`}>
                              {item.change === 0 ? String(getTranslation(language, 'common.noChange') || 'No change') :
                               item.change > 0 ? `+${item.change}` : item.change}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!currentIsLoading && finalRankings.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrophyIcon className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'rankings.noRankingsAvailable') || 'No Rankings Available')}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'rankings.noRankingsDescription') || 'Rankings for this category and format are not available yet.')}
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Information Card */}
        <section className="mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {selectedCategory === 'teams' 
                  ? String(getTranslation(language, 'rankings.teamDescription') || 'Team Rankings')
                  : selectedCategory === 'batting'
                  ? String(getTranslation(language, 'rankings.battingDescription') || 'Batting Rankings')
                  : selectedCategory === 'bowling'
                  ? String(getTranslation(language, 'rankings.bowlingDescription') || 'Bowling Rankings')
                  : String(getTranslation(language, 'rankings.allRounderDescription') || 'All-Rounder Rankings')
                }
              </h3>
              
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {selectedCategory === 'teams' ? (
                  <UsersIcon className="w-10 h-10 text-white mt-1" />
                ) : (
                  <UserIcon className="w-10 h-10 text-white mt-1" />
                )}
              </div>
              
              <p className={`text-gray-600 leading-relaxed text-lg ${isRTL ? 'font-arabic' : ''}`}>
                {selectedCategory === 'teams'
                  ? String(getTranslation(language, 'rankings.teamInfo') || 'Based on match results, series wins, and overall performance in international cricket.')
                  : selectedCategory === 'batting'
                  ? String(getTranslation(language, 'rankings.battingInfo') || 'Based on runs scored, batting average, and strike rate across all formats.')
                  : selectedCategory === 'bowling'
                  ? String(getTranslation(language, 'rankings.bowlingInfo') || 'Based on wickets taken, bowling average, and economy rate across all formats.')
                  : String(getTranslation(language, 'rankings.allRounderInfo') || 'Based on combined batting and bowling performance across all formats.')
                }
              </p>
            </div>
          </div>
        </section>
      </div>
        <Footer />
      </main>
    </RTLWrapper>
  )
}