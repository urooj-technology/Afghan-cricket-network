'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrophyIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

const formats = [
  { key: 't20i', display: 'T20I' },
  { key: 'odi', display: 'ODI' },
  { key: 'test', display: 'Test' }
]

const categories = [
  { key: 'batting', display: 'Batting' },
  { key: 'bowling', display: 'Bowling' },
  { key: 'all-rounder', display: 'All-Rounder' },
  { key: 'teams', display: 'Teams' }
]

export default function RankingsSection() {
  const [selectedFormat, setSelectedFormat] = useState('t20i')
  const [selectedCategory, setSelectedCategory] = useState('batting')
  const { language } = useLanguage()

  // Fetch team rankings
  const { data: teamRankings, isLoading: teamLoading } = useFetchData('/team-rankings/by_format', {
    queryKey: ['team-rankings', selectedFormat],
    params: { format: selectedFormat }
  })

  // Fetch player rankings
  const { data: playerRankings, isLoading: playerLoading } = useFetchData('/player-rankings/top_performers', {
    queryKey: ['player-rankings', selectedCategory, selectedFormat],
    params: { 
      category: selectedCategory === 'teams' ? 'batting' : selectedCategory,
      format: selectedFormat 
    },
    enabled: selectedCategory !== 'teams'
  })

  const getCurrentRankings = () => {
    if (selectedCategory === 'teams') {
      return teamRankings || []
    }
    return playerRankings || []
  }

  const currentRankings = getCurrentRankings()
  const isLoading = selectedCategory === 'teams' ? teamLoading : playerLoading

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'home.rankings.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslation(language, 'home.rankings.subtitle')}
          </p>
        </div>

        {/* Format and Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Format:</span>
            {formats.map((format) => (
              <button
                key={format.key}
                onClick={() => setSelectedFormat(format.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedFormat === format.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {format.display}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.display}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Rankings Table */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCategory === 'teams'
                  ? `Team Rankings - ${selectedFormat.toUpperCase()}`
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Rankings - ${selectedFormat.toUpperCase()}`
                }
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedCategory === 'teams' ? 'Team' : 'Player'}
                    </th>
                    {selectedCategory !== 'teams' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {selectedCategory === 'batting' ? 'Points' :
                       selectedCategory === 'bowling' ? 'Wickets' :
                       'Points'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRankings.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.rank === 1 && (
                            <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
                          )}
                          <span className={`text-sm font-medium ${
                            item.rank === 1 ? 'text-yellow-600' : 'text-gray-900'
                          }`}>
                            {item.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                              {selectedCategory === 'teams' ? (
                                <UsersIcon className="w-4 h-4 text-white" />
                              ) : (
                                <UserIcon className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {selectedCategory === 'teams' 
                                ? item.team_name
                                : item.player_name
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      {selectedCategory !== 'teams' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.country}
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {selectedCategory === 'bowling' ? item.wickets : item.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && currentRankings.length === 0 && (
          <div className="text-center py-16">
            <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Rankings Available</h3>
            <p className="text-gray-600">Rankings for this category and format are not available yet.</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Batting Rankings</h4>
            <p className="text-blue-700 text-sm">
              Based on runs scored, average, and strike rate across all formats.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-2">Bowling Rankings</h4>
            <p className="text-green-700 text-sm">
              Based on wickets taken, economy rate, and bowling average.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-900 mb-2">Team Rankings</h4>
            <p className="text-purple-700 text-sm">
              Official ICC rankings based on recent match performances.
            </p>
          </div>
        </div>

        {/* View All Rankings Button */}
        <div className="text-center mt-12">
          <Link
            href="/rankings"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Complete Rankings
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}