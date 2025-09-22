'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  TrophyIcon, 
  UserIcon, 
  UsersIcon, 
  ChartBarIcon,
  CalendarIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

export default function RankingsSection() {
  const { language } = useLanguage()

  // Fetch comprehensive cricket statistics
  const { data: cricketStats, isLoading } = useFetchData('/cricket-stats/home_stats', {
    queryKey: ['cricket-home-stats']
  })

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Afghanistan Cricket at a Glance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Key statistics, rankings, and achievements of Afghan cricket team
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && cricketStats && (
          <>
            {/* Team Rankings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {['t20i', 'odi', 'test'].map((format) => {
                const ranking = cricketStats.team_rankings?.[format]
                return (
                  <div key={format} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{format.toUpperCase()}</h3>
                      <TrophyIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    {ranking ? (
                      <>
                        <div className="text-3xl font-bold text-blue-600 mb-2">#{ranking.rank}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-semibold">{ranking.rating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Points:</span>
                            <span className="font-semibold">{ranking.points}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Matches:</span>
                            <span className="font-semibold">{ranking.matches_played}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-center py-4">No ranking data</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
                Top Performers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { key: 'leading_run_scorer', title: 'Leading Run Scorer', icon: ChartBarIcon, color: 'blue' },
                  { key: 'leading_wicket_taker', title: 'Leading Wicket Taker', icon: FireIcon, color: 'red' },
                  { key: 'highest_average', title: 'Highest Average', icon: TrophyIcon, color: 'yellow' },
                  { key: 'best_strike_rate', title: 'Best Strike Rate', icon: ChartBarIcon, color: 'green' }
                ].map((performer) => {
                  const player = cricketStats.top_performers?.[performer.key]
                  const IconComponent = performer.icon
                  return (
                    <div key={performer.key} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center mb-3">
                        <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-gray-900 text-sm">{performer.title}</h4>
                      </div>
                      {player ? (
                        <>
                          <div className="font-bold text-gray-900 mb-1">
                            {player.name} {player.jersey_number && `#${player.jersey_number}`}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{player.role}</div>
                          <div className="space-y-1 text-xs">
                            {performer.key === 'leading_run_scorer' && (
                              <div>Runs: <span className="font-semibold">{player.runs_scored}</span></div>
                            )}
                            {performer.key === 'leading_wicket_taker' && (
                              <div>Wickets: <span className="font-semibold">{player.wickets_taken}</span></div>
                            )}
                            {performer.key === 'highest_average' && (
                              <div>Average: <span className="font-semibold">{player.batting_average}</span></div>
                            )}
                            {performer.key === 'best_strike_rate' && (
                              <div>Strike Rate: <span className="font-semibold">{player.strike_rate}</span></div>
                            )}
                            <div>Matches: <span className="font-semibold">{player.matches_played}</span></div>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500 text-sm">No data available</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Matches */}
            {cricketStats.upcoming_matches?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CalendarIcon className="w-6 h-6 text-green-600 mr-2" />
                  Upcoming Matches
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cricketStats.upcoming_matches.slice(0, 3).map((match, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900 mb-2">{match.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>📅 {new Date(match.date).toLocaleDateString()}</div>
                        <div>🏟️ {match.venue.name}, {match.venue.city}</div>
                        <div>🏏 {match.event_type}</div>
                        <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          {match.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Player Rankings */}
            {cricketStats.recent_player_rankings?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Player Rankings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Player</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Format</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cricketStats.recent_player_rankings.map((ranking, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{ranking.player_name}</td>
                          <td className="py-3 px-4 text-gray-600">{ranking.category}</td>
                          <td className="py-3 px-4 text-gray-600">{ranking.format}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              #{ranking.rank}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{ranking.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Team Rankings</h4>
            <p className="text-blue-700 text-sm">
              Current ICC rankings across all formats showing Afghanistan's position globally.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-2">Player Performance</h4>
            <p className="text-green-700 text-sm">
              Top performers from the Afghan cricket team with key statistics.
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-900 mb-2">Upcoming Fixtures</h4>
            <p className="text-purple-700 text-sm">
              Next international matches and tournaments featuring Afghanistan.
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