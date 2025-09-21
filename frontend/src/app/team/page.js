'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import RTLWrapper from '../../components/ui/RTLWrapper'
import { RTLHeading, RTLParagraph } from '../../components/ui/RTLText'
import { RTLFlex } from '../../components/ui/RTLContainer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import Link from 'next/link'
import { 
  UserIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { getTextAlign, getFontClass, getFlexDirection, getIconSpacing } from '../../utils/rtl'

export default function Team() {
  const { language, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [activeTab, setActiveTab] = useState('players')

  // Filters for players
  const playerFilters = useMemo(() => ({
    ...(filterType && { role: filterType }),
    status: 'active'
  }), [filterType])

  // Filters for team members
  const memberFilters = useMemo(() => ({
    ...(filterType && { member_type: filterType }),
    is_active: true
  }), [filterType])

  // Fetch players
  const {
    data: players,
    pagination: playerPagination,
    isLoading: playersLoading,
    error: playersError,
    goToPage: playersGoToPage,
    nextPage: playersNextPage,
    previousPage: playersPreviousPage,
    resetPage: playersResetPage
  } = usePagination('/players', {
    search: searchTerm,
    filters: playerFilters,
    ordering: 'jersey_number',
    pageSize: 12,
    enabled: activeTab === 'players'
  })

  // Fetch team members
  const {
    data: teamMembers,
    pagination: memberPagination,
    isLoading: membersLoading,
    error: membersError,
    goToPage: membersGoToPage,
    nextPage: membersNextPage,
    previousPage: membersPreviousPage,
    resetPage: membersResetPage
  } = usePagination('/team-members', {
    search: searchTerm,
    filters: memberFilters,
    ordering: 'member_type,order,name',
    pageSize: 12,
    enabled: activeTab === 'members'
  })

  // Fetch featured players
  const { data: featuredPlayers } = useFetchData('/players/featured', {
    queryKey: ['players', 'featured']
  })

  // Fetch captains
  const { data: captains } = useFetchData('/players/captains', {
    queryKey: ['players', 'captains']
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
    if (activeTab === 'players') {
      playersResetPage()
    } else {
      membersResetPage()
    }
  }

  const handleFilterChange = (value) => {
    setFilterType(value)
    if (activeTab === 'players') {
      playersResetPage()
    } else {
      membersResetPage()
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    setFilterType('')
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'batsman':
        return 'bg-blue-500 text-white'
      case 'bowler':
        return 'bg-green-500 text-white'
      case 'all-rounder':
        return 'bg-purple-500 text-white'
      case 'wicket-keeper':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getMemberTypeColor = (type) => {
    switch (type) {
      case 'management':
        return 'bg-red-500 text-white'
      case 'coaches':
        return 'bg-blue-500 text-white'
      case 'staff':
        return 'bg-green-500 text-white'
      case 'players':
        return 'bg-purple-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const currentData = activeTab === 'players' ? players : teamMembers
  const currentPagination = activeTab === 'players' ? playerPagination : memberPagination
  const isLoading = activeTab === 'players' ? playersLoading : membersLoading
  const error = activeTab === 'players' ? playersError : membersError
  const goToPage = activeTab === 'players' ? playersGoToPage : membersGoToPage
  const nextPage = activeTab === 'players' ? playersNextPage : membersNextPage
  const previousPage = activeTab === 'players' ? playersPreviousPage : membersPreviousPage

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gray-50">
        <Header />
      
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-700"></div>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`text-center ${isRTL ? 'rtl-content' : ''}`}>
              <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'team.title') || 'Afghanistan Cricket Team')}
              </h1>
              <p className={`text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {String(getTranslation(language, 'team.subtitle') || 'Meet the players, coaches, and staff who represent Afghanistan in international cricket')}
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Active Players</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Support Staff</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Matches Played</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className={`text-blue-200 text-sm ${isRTL ? 'font-arabic' : ''}`}>Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Players & Captains */}
        {(featuredPlayers?.length > 0 || captains?.length > 0) && (
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Captains */}
              {captains && captains.length > 0 && (
                <div className="mb-16">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                      <TrophyIcon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {String(getTranslation(language, 'team.leadership') || 'Team Leadership')}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      Meet the leaders who guide Afghanistan cricket to new heights
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {captains.map((captain) => (
                      <div key={captain.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="relative h-48 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
                          {captain.photo ? (
                            <img 
                              src={captain.photo} 
                              alt={captain.name}
                              className="w-24 h-24 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <UserIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-white font-bold text-sm">#{captain.jersey_number || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className={`font-bold text-xl mb-2 text-gray-900 text-center ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                            {captain.name}
                          </h3>
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(captain.role)}`}>
                              {captain.role}
                            </span>
                            {captain.is_captain && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                                Captain
                              </span>
                            )}
                            {captain.is_vice_captain && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
                                Vice Captain
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600 mb-4">
                            <div>
                              <div className="font-bold text-lg text-blue-600">{captain.matches_played || 0}</div>
                              <div>Matches</div>
                            </div>
                            <div>
                              <div className="font-bold text-lg text-green-600">{captain.runs_scored || 0}</div>
                              <div>Runs</div>
                            </div>
                          </div>
                          <Link 
                            href={`/team/${captain.slug}`}
                            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Players */}
              {featuredPlayers && featuredPlayers.length > 0 && (
                <div>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <StarIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {String(getTranslation(language, 'team.featuredPlayers') || 'Featured Players')}
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      Discover the talented players who make Afghanistan cricket shine
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredPlayers.slice(0, 4).map((player) => (
                      <div key={player.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative h-40 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
                          {player.photo ? (
                            <img 
                              src={player.photo} 
                              alt={player.name}
                              className="w-20 h-20 rounded-full border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <UserIcon className="w-10 h-10 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <StarIcon className="w-6 h-6 text-yellow-400" />
                          </div>
                        </div>
                        <div className="p-4 text-center">
                          <h3 className={`font-bold text-lg mb-1 text-gray-900 text-center ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>{player.name}</h3>
                          <p className={`text-sm text-blue-600 font-medium text-center ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>{player.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Main Team Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-2xl p-2 inline-flex">
                <button
                  onClick={() => handleTabChange('players')}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${getFontClass(isRTL)} ${
                    activeTab === 'players'
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {String(getTranslation(language, 'team.players') || 'Players')}
                </button>
                <button
                  onClick={() => handleTabChange('members')}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${getFontClass(isRTL)} ${
                    activeTab === 'members'
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {String(getTranslation(language, 'team.teamMembers') || 'Team Members')}
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 mb-12 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0 ${isRTL ? 'lg:flex-row-reverse lg:space-x-reverse lg:space-x-8' : 'lg:space-x-8'}`}>
                <div className={`flex-1 max-w-lg ${isRTL ? 'lg:ml-8' : 'lg:mr-8'}`}>
                  <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {String(getTranslation(language, `team.search${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`) || `Search ${activeTab}`)}
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                      type="text"
                      placeholder={String(getTranslation(language, `team.search${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Placeholder`) || `Search ${activeTab}...`)}
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className={`w-full py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg shadow-sm hover:shadow-md ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4 text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 min-w-64">
                  <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {String(getTranslation(language, 'team.filterBy') || 'Filter by')} {activeTab === 'players' ? String(getTranslation(language, 'team.role') || 'Role') : String(getTranslation(language, 'team.type') || 'Type')}
                  </label>
                  <div className="relative">
                    <FunnelIcon className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <select
                      value={filterType}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className={`w-full appearance-none py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-lg shadow-sm hover:shadow-md ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4 text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {activeTab === 'players' ? (
                        <>
                          <option value="">{String(getTranslation(language, 'team.allRoles') || 'All Roles')}</option>
                          <option value="batsman">{String(getTranslation(language, 'team.batsman') || 'Batsman')}</option>
                          <option value="bowler">{String(getTranslation(language, 'team.bowler') || 'Bowler')}</option>
                          <option value="all-rounder">{String(getTranslation(language, 'team.allRounder') || 'All-rounder')}</option>
                          <option value="wicket-keeper">{String(getTranslation(language, 'team.wicketKeeper') || 'Wicket-keeper')}</option>
                        </>
                      ) : (
                        <>
                          <option value="">{String(getTranslation(language, 'team.allTypes') || 'All Types')}</option>
                          <option value="management">{String(getTranslation(language, 'team.management') || 'Management')}</option>
                          <option value="coaches">{String(getTranslation(language, 'team.coaches') || 'Coaches')}</option>
                          <option value="staff">{String(getTranslation(language, 'team.staff') || 'Staff')}</option>
                          <option value="players">{String(getTranslation(language, 'team.players') || 'Players')}</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading {activeTab}...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Error Loading {activeTab}</h3>
                  <p className="text-red-700">{error.message}</p>
                </div>
              </div>
            )}

            {/* Team Grid */}
            {!isLoading && !error && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentData.map((member) => (
                    <div key={member.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
                      <div className="relative">
                        <div className="h-52 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/10"></div>
                          {member.photo ? (
                            <img 
                              src={member.photo} 
                              alt={member.name}
                              className="w-28 h-28 rounded-full border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10"
                            />
                          ) : (
                            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                              <span className="text-blue-600 text-3xl font-bold">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        {activeTab === 'players' && member.jersey_number && (
                          <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
                              <span className="text-white font-bold text-sm">#{member.jersey_number}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 text-center">
                        <h3 className={`font-bold text-xl mb-2 text-gray-900 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                          {member.name}
                        </h3>
                        
                        <p className={`text-blue-600 font-semibold mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`}>
                          {activeTab === 'players' ? member.role : member.position}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {activeTab === 'players' ? (
                            <>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                                {member.role}
                              </span>
                              {member.is_captain && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                                  Captain
                                </span>
                              )}
                              {member.is_vice_captain && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-500 text-white">
                                  Vice Captain
                                </span>
                              )}
                            </>
                          ) : (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getMemberTypeColor(member.member_type)}`}>
                              {member.member_type}
                            </span>
                          )}
                        </div>
                        
                        {activeTab === 'players' && (
                          <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600 mb-6">
                            <div>
                              <div className="font-bold text-lg text-blue-600">{member.matches_played || 0}</div>
                              <div>Matches</div>
                            </div>
                            <div>
                              <div className="font-bold text-lg text-green-600">{member.runs_scored || 0}</div>
                              <div>Runs</div>
                            </div>
                          </div>
                        )}
                        
                        <Link 
                          href={`/team/${member.slug}`}
                          className={`block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 ${getFontClass(isRTL)}`}
                        >
                          {String(getTranslation(language, 'team.viewProfile') || 'View Profile')}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {currentPagination && currentPagination.totalPages > 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="bg-white rounded-2xl shadow-lg p-4">
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                        <button
                          onClick={previousPage}
                          disabled={!currentPagination.hasPrevious}
                          className={`px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium ${getFontClass(isRTL)}`}
                        >
                          {String(getTranslation(language, 'common.previous') || 'Previous')}
                        </button>
                        
                        <div className={`flex items-center mx-4 ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                          {Array.from({ length: Math.min(5, currentPagination.totalPages) }, (_, i) => {
                            const page = i + 1
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
                                  page === currentPagination.currentPage
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-110'
                                    : 'border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          })}
                        </div>
                        
                        <button
                          onClick={nextPage}
                          disabled={!currentPagination.hasNext}
                          className={`px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium ${getFontClass(isRTL)}`}
                        >
                          {String(getTranslation(language, 'common.next') || 'Next')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {currentData.length === 0 && (
                  <div className="text-center py-20">
                    <div className="bg-gray-50 rounded-2xl p-12 max-w-lg mx-auto">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {String(getTranslation(language, `team.no${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Found`) || `No ${activeTab} Found`)}
                      </h3>
                      <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-center' : 'text-center'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        {String(searchTerm || filterType 
                          ? (getTranslation(language, 'team.adjustSearchCriteria') || 'Try adjusting your search or filter criteria.')
                          : (getTranslation(language, `team.no${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Available`) || `No ${activeTab} are currently available.`))}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </RTLWrapper>
  )
}