'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
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

export default function Team() {
  const { language } = useLanguage()
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
        return 'bg-blue-100 text-blue-800'
      case 'bowler':
        return 'bg-green-100 text-green-800'
      case 'all-rounder':
        return 'bg-purple-100 text-purple-800'
      case 'wicket-keeper':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMemberTypeColor = (type) => {
    switch (type) {
      case 'management':
        return 'bg-red-100 text-red-800'
      case 'coaches':
        return 'bg-blue-100 text-blue-800'
      case 'staff':
        return 'bg-green-100 text-green-800'
      case 'players':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'team.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Players & Captains */}
      {(featuredPlayers?.length > 0 || captains?.length > 0) && (
        <section className="py-8 bg-blue-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Captains */}
            {captains && captains.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrophyIcon className="w-6 h-6 mr-2 text-yellow-500" />
                  Team Leadership
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {captains.map((captain) => (
                    <div key={captain.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-32 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        {captain.photo ? (
                          <img 
                            src={captain.photo} 
                            alt={captain.name}
                            className="w-20 h-20 rounded-full border-4 border-white"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                            <UserIcon className="w-10 h-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{captain.name}</h3>
                          {captain.jersey_number && (
                            <span className="text-sm font-bold text-blue-600">#{captain.jersey_number}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(captain.role)}`}>
                            {captain.role}
                          </span>
                          {captain.is_captain && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Captain
                            </span>
                          )}
                          {captain.is_vice_captain && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Vice Captain
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Matches: {captain.matches_played}</p>
                          <p>Runs: {captain.runs_scored} | Wickets: {captain.wickets_taken}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Players */}
            {featuredPlayers && featuredPlayers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
                  Featured Players
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredPlayers.slice(0, 4).map((player) => (
                    <div key={player.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        {player.photo ? (
                          <img 
                            src={player.photo} 
                            alt={player.name}
                            className="w-16 h-16 rounded-full border-2 border-white"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm mb-1">{player.name}</h3>
                        <p className="text-xs text-gray-600">{player.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Tabs */}
      <section className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => handleTabChange('players')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'players'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Players
            </button>
            <button
              onClick={() => handleTabChange('members')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'members'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Team Members
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {activeTab === 'players' ? (
                    <>
                      <option value="">All Roles</option>
                      <option value="batsman">Batsman</option>
                      <option value="bowler">Bowler</option>
                      <option value="all-rounder">All-rounder</option>
                      <option value="wicket-keeper">Wicket-keeper</option>
                    </>
                  ) : (
                    <>
                      <option value="">All Types</option>
                      <option value="management">Management</option>
                      <option value="coaches">Coaches</option>
                      <option value="staff">Staff</option>
                      <option value="players">Players</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-red-600">Error loading {activeTab}: {error.message}</p>
            </div>
          )}

          {/* Team Grid */}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentData.map((member) => (
                  <div key={member.id} className="text-center bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      {activeTab === 'players' && member.jersey_number && (
                        <span className="text-sm font-bold text-blue-600">#{member.jersey_number}</span>
                      )}
                    </div>
                    
                    <p className="text-blue-600 font-semibold mb-2">
                      {activeTab === 'players' ? member.role : member.position}
                    </p>
                    
                    <div className="flex justify-center space-x-2 mb-4">
                      {activeTab === 'players' ? (
                        <>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                          {member.is_captain && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Captain
                            </span>
                          )}
                          {member.is_vice_captain && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Vice Captain
                            </span>
                          )}
                        </>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMemberTypeColor(member.member_type)}`}>
                          {member.member_type}
                        </span>
                      )}
                    </div>
                    
                    {activeTab === 'players' && (
                      <div className="text-sm text-gray-600 mb-4">
                        <p>Matches: {member.matches_played}</p>
                        <p>Runs: {member.runs_scored} | Wickets: {member.wickets_taken}</p>
                      </div>
                    )}
                    
                    <Link 
                      href={`/team/${member.slug}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {currentPagination && currentPagination.totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 space-x-2">
                  <button
                    onClick={previousPage}
                    disabled={!currentPagination.hasPrevious}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(5, currentPagination.totalPages))].map((_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 text-sm border rounded-lg ${
                          page === currentPagination.currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  <button
                    onClick={nextPage}
                    disabled={!currentPagination.hasNext}
                    className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Empty State */}
              {currentData.length === 0 && (
                <div className="text-center py-16">
                  <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No {activeTab} Found
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm || filterType 
                      ? 'Try adjusting your search or filter criteria.' 
                      : `No ${activeTab} are currently available.`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}