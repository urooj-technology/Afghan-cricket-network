'use client'

import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardHeader, CardTitle, CardBadge } from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import { TrophyIcon, UserIcon, UsersIcon, StarIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const formats = [
  { key: 't20i', display: 'T20I', color: 'bg-red-500' },
  { key: 'odi', display: 'ODI', color: 'bg-blue-500' },
  { key: 'test', display: 'Test', color: 'bg-green-500' }
]

const categories = [
  { key: 'batting', display: 'Batting', icon: ChartBarIcon, color: 'text-blue-600' },
  { key: 'bowling', display: 'Bowling', icon: TrophyIcon, color: 'text-green-600' },
  { key: 'all-rounder', display: 'All-Rounder', icon: StarIcon, color: 'text-purple-600' },
  { key: 'teams', display: 'Teams', icon: UsersIcon, color: 'text-orange-600' }
]

export default function RankingsPage() {
  const [selectedFormat, setSelectedFormat] = useState('t20i')
  const [selectedCategory, setSelectedCategory] = useState('batting')
  const { language } = useLanguage()

  // Fetch team rankings
  const { data: teamRankings, isLoading: teamLoading } = useFetchData('/team-rankings/by_format', {
    queryKey: ['team-rankings', selectedFormat],
    params: { format: selectedFormat },
    enabled: selectedCategory === 'teams'
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

  // Fetch all rankings for stats
  const { data: allTeamRankings } = useFetchData('/team-rankings', {
    queryKey: ['team-rankings', 'all'],
    params: { page_size: 100 }
  })

  const { data: allPlayerRankings } = useFetchData('/player-rankings', {
    queryKey: ['player-rankings', 'all'],
    params: { page_size: 100 }
  })

  const getCurrentRankings = () => {
    if (selectedCategory === 'teams') {
      return teamRankings || []
    }
    return playerRankings || []
  }

  const currentRankings = getCurrentRankings()
  const isLoading = selectedCategory === 'teams' ? teamLoading : playerLoading
  const selectedCategoryData = categories.find(cat => cat.key === selectedCategory)

  return (
    <PageLayout
      title="Cricket Rankings"
      subtitle="Official ICC rankings and statistics for teams and players"
      heroGradient="from-purple-900 via-purple-800 to-purple-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Stats Overview */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {allTeamRankings?.results?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Team Rankings</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {allPlayerRankings?.results?.filter(p => p.category === 'batting').length || 0}
              </div>
              <div className="text-sm text-gray-600">Batting Rankings</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {allPlayerRankings?.results?.filter(p => p.category === 'bowling').length || 0}
              </div>
              <div className="text-sm text-gray-600">Bowling Rankings</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {allPlayerRankings?.results?.filter(p => p.category === 'all-rounder').length || 0}
              </div>
              <div className="text-sm text-gray-600">All-Rounder Rankings</div>
            </Card>
          </div>
        </section>

        {/* Format and Category Filters */}
        <section className="mb-12">
          <Card padding="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Format Selection */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Format:</h3>
                <div className="flex flex-wrap gap-2">
                  {formats.map((format) => (
                    <Button
                      key={format.key}
                      variant={selectedFormat === format.key ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFormat(format.key)}
                      className="relative"
                    >
                      <div className={`w-2 h-2 ${format.color} rounded-full mr-2`}></div>
                      {format.display}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Category:</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.key}
                      variant={selectedCategory === category.key ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.key)}
                      className="flex items-center justify-center"
                    >
                      <category.icon className={`w-4 h-4 mr-2 ${selectedCategory === category.key ? 'text-white' : category.color}`} />
                      {category.display}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" />}

        {/* Rankings Table */}
        {!isLoading && (
          <section className="mb-12">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    {selectedCategoryData && (
                      <selectedCategoryData.icon className={`w-6 h-6 mr-2 ${selectedCategoryData.color}`} />
                    )}
                    {selectedCategory === 'teams'
                      ? `Team Rankings - ${selectedFormat.toUpperCase()}`
                      : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Rankings - ${selectedFormat.toUpperCase()}`
                    }
                  </CardTitle>
                  <CardBadge variant="primary">
                    {currentRankings.length} entries
                  </CardBadge>
                </div>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {selectedCategory === 'teams' ? 'Team' : 'Player'}
                      </th>
                      {selectedCategory !== 'teams' && (
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                      )}
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {selectedCategory === 'batting' ? 'Points' :
                         selectedCategory === 'bowling' ? 'Wickets' :
                         selectedCategory === 'teams' ? 'Points' : 'Points'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRankings.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.rank === 1 && (
                              <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
                            )}
                            <span className={`text-sm font-medium ${
                              item.rank === 1 ? 'text-yellow-600' : 
                              item.rank <= 3 ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              #{item.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                {selectedCategory === 'teams' ? (
                                  <UsersIcon className="w-5 h-5 text-white" />
                                ) : (
                                  <UserIcon className="w-5 h-5 text-white" />
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
                              {item.rank <= 3 && (
                                <div className="text-xs text-gray-500">
                                  Top {item.rank === 1 ? 'Ranked' : '3'}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        {selectedCategory !== 'teams' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">🇦🇫</span>
                              <span className="text-sm text-gray-900">{item.country}</span>
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{item.rating}</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${Math.min((item.rating / 1000) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
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
            </Card>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && currentRankings.length === 0 && (
          <Card className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Rankings Available</h3>
              <p className="text-gray-600">Rankings for this category and format are not available yet.</p>
            </div>
          </Card>
        )}

        {/* Information Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center" padding="p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Batting Rankings</h3>
            <p className="text-blue-700 text-sm">
              Based on runs scored, average, and strike rate across all formats.
            </p>
          </Card>
          
          <Card className="text-center" padding="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrophyIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Bowling Rankings</h3>
            <p className="text-green-700 text-sm">
              Based on wickets taken, economy rate, and bowling average.
            </p>
          </Card>
          
          <Card className="text-center" padding="p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Team Rankings</h3>
            <p className="text-purple-700 text-sm">
              Official ICC rankings based on recent match performances.
            </p>
          </Card>
        </section>
      </div>
    </PageLayout>
  )
}