'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrophyIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const rankingsData = {
  batting: {
    t20i: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 892, points: 1200 },
      { rank: 2, nameKey: 'rankings.players.mohammad nabi', countryKey: 'rankings.countries.afghanistan', rating: 845, points: 1100 },
      { rank: 3, nameKey: 'rankings.players.rahmanullah gurbaz', countryKey: 'rankings.countries.afghanistan', rating: 798, points: 980 },
      { rank: 4, nameKey: 'rankings.players.najibullah zadran', countryKey: 'rankings.countries.afghanistan', rating: 756, points: 920 },
      { rank: 5, nameKey: 'rankings.players.hazratullah zazai', countryKey: 'rankings.countries.afghanistan', rating: 723, points: 890 },
    ],
    odi: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 925, points: 1350 },
      { rank: 2, nameKey: 'rankings.players.rahmanullah gurbaz', countryKey: 'rankings.countries.afghanistan', rating: 876, points: 1150 },
      { rank: 3, nameKey: 'rankings.players.mohammad nabi', countryKey: 'rankings.countries.afghanistan', rating: 834, points: 1050 },
      { rank: 4, nameKey: 'rankings.players.najibullah zadran', countryKey: 'rankings.countries.afghanistan', rating: 789, points: 980 },
      { rank: 5, nameKey: 'rankings.players.hashmatullah shahidi', countryKey: 'rankings.countries.afghanistan', rating: 745, points: 920 },
    ],
    test: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 945, points: 1400 },
      { rank: 2, nameKey: 'rankings.players.rahmanullah gurbaz', countryKey: 'rankings.countries.afghanistan', rating: 890, points: 1200 },
      { rank: 3, nameKey: 'rankings.players.hashmatullah shahidi', countryKey: 'rankings.countries.afghanistan', rating: 856, points: 1100 },
      { rank: 4, nameKey: 'rankings.players.ibrahim zadran', countryKey: 'rankings.countries.afghanistan', rating: 823, points: 1050 },
      { rank: 5, nameKey: 'rankings.players.rahmat shah', countryKey: 'rankings.countries.afghanistan', rating: 798, points: 980 },
    ],
  },
  bowling: {
    t20i: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 945, wickets: 145 },
      { rank: 2, nameKey: 'rankings.players.mohammad nabi', countryKey: 'rankings.countries.afghanistan', rating: 876, wickets: 89 },
      { rank: 3, nameKey: 'rankings.players.mujeeb ur rahman', countryKey: 'rankings.countries.afghanistan', rating: 823, wickets: 67 },
      { rank: 4, nameKey: 'rankings.players.fazalhaq farooqi', countryKey: 'rankings.countries.afghanistan', rating: 789, wickets: 45 },
      { rank: 5, nameKey: 'rankings.players.naveen-ul-haq', countryKey: 'rankings.countries.afghanistan', rating: 756, wickets: 38 },
    ],
    odi: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 965, wickets: 178 },
      { rank: 2, nameKey: 'rankings.players.mujeeb ur rahman', countryKey: 'rankings.countries.afghanistan', rating: 890, wickets: 95 },
      { rank: 3, nameKey: 'rankings.players.mohammad nabi', countryKey: 'rankings.countries.afghanistan', rating: 845, wickets: 156 },
      { rank: 4, nameKey: 'rankings.players.fazalhaq farooqi', countryKey: 'rankings.countries.afghanistan', rating: 812, wickets: 67 },
      { rank: 5, nameKey: 'rankings.players.naveen-ul-haq', countryKey: 'rankings.countries.afghanistan', rating: 789, wickets: 58 },
    ],
    test: [
      { rank: 1, nameKey: 'rankings.players.rashid khan', countryKey: 'rankings.countries.afghanistan', rating: 978, wickets: 45 },
      { rank: 2, nameKey: 'rankings.players.amir hamza', countryKey: 'rankings.countries.afghanistan', rating: 912, wickets: 23 },
      { rank: 3, nameKey: 'rankings.players.yamin ahmadzai', countryKey: 'rankings.countries.afghanistan', rating: 876, wickets: 18 },
      { rank: 4, nameKey: 'rankings.players.wafadar momand', countryKey: 'rankings.countries.afghanistan', rating: 845, wickets: 15 },
      { rank: 5, nameKey: 'rankings.players.zia-ur-rehman', countryKey: 'rankings.countries.afghanistan', rating: 823, wickets: 12 },
    ],
  },
  teams: {
    t20i: [
      { rank: 1, teamKey: 'rankings.teams.afghanistan', rating: 892, points: 1200, matches: 45 },
      { rank: 2, teamKey: 'rankings.teams.india', rating: 876, points: 1150, matches: 52 },
      { rank: 3, teamKey: 'rankings.teams.pakistan', rating: 845, points: 1100, matches: 48 },
      { rank: 4, teamKey: 'rankings.teams.england', rating: 823, points: 1050, matches: 50 },
      { rank: 5, teamKey: 'rankings.teams.australia', rating: 798, points: 980, matches: 47 },
    ],
    odi: [
      { rank: 1, teamKey: 'rankings.teams.afghanistan', rating: 925, points: 1350, matches: 38 },
      { rank: 2, teamKey: 'rankings.teams.india', rating: 912, points: 1300, matches: 42 },
      { rank: 3, teamKey: 'rankings.teams.pakistan', rating: 890, points: 1250, matches: 40 },
      { rank: 4, teamKey: 'rankings.teams.england', rating: 876, points: 1200, matches: 45 },
      { rank: 5, teamKey: 'rankings.teams.australia', rating: 856, points: 1150, matches: 43 },
    ],
    test: [
      { rank: 1, teamKey: 'rankings.teams.afghanistan', rating: 945, points: 1400, matches: 12 },
      { rank: 2, teamKey: 'rankings.teams.india', rating: 934, points: 1350, matches: 15 },
      { rank: 3, teamKey: 'rankings.teams.pakistan', rating: 912, points: 1300, matches: 14 },
      { rank: 4, teamKey: 'rankings.teams.england', rating: 898, points: 1250, matches: 16 },
      { rank: 5, teamKey: 'rankings.teams.australia', rating: 876, points: 1200, matches: 13 },
    ],
  },
}

// Define formats and categories with their translation keys
const formats = [
  { key: 't20i', display: 'T20I' },
  { key: 'odi', display: 'ODI' },
  { key: 'test', display: 'Test' }
]

const categories = [
  { key: 'batting', display: 'Batting' },
  { key: 'bowling', display: 'Bowling' },
  { key : 'allrounder', display: 'All-Rounder' },
  { key: 'teams', display: 'Teams' }
]

export default function RankingsSection() {
  const [selectedFormat, setSelectedFormat] = useState('t20i')
  const [selectedCategory, setSelectedCategory] = useState('batting')
  const { language } = useLanguage()



  const getRankingsData = () => {
    if (selectedCategory === 'teams') {
      return rankingsData.teams[selectedFormat] || []
    }
    return rankingsData[selectedCategory][selectedFormat] || []
  }

  const currentRankings = getRankingsData()

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
                          <span className="text-sm font-medium text-gray-700">
                {getTranslation(language, 'home.rankings.format')}:
              </span>
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
                {getTranslation(language, `home.rankings.formats.${format.key}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">
                {getTranslation(language, 'home.rankings.category')}:
              </span>
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
                {getTranslation(language, `home.rankings.categories.${category.key}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedCategory === 'teams'
                ? getTranslation(language, 'home.rankings.teamRankings')
                : selectedCategory === 'batting'
                ? getTranslation(language, 'home.rankings.battingRankings')
                : getTranslation(language, 'home.rankings.bowlingRankings')
              } - {getTranslation(language, `home.rankings.formats.${selectedFormat}`)}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getTranslation(language, 'home.rankings.columns.rank')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {selectedCategory === 'teams'
                      ? getTranslation(language, 'home.rankings.columns.team')
                      : getTranslation(language, 'home.rankings.columns.player')
                    }
                  </th>
                  {selectedCategory !== 'teams' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {getTranslation(language, 'home.rankings.columns.country')}
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {getTranslation(language, 'home.rankings.columns.rating')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {selectedCategory === 'batting'
                      ? getTranslation(language, 'home.rankings.columns.points')
                      : selectedCategory === 'bowling'
                      ? getTranslation(language, 'home.rankings.columns.wickets')
                      : getTranslation(language, 'home.rankings.columns.matches')
                    }
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRankings.map((item, index) => (
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
                              ? getTranslation(language, item.teamKey.replace('rankings.', ''))
                              : getTranslation(language, item.nameKey.replace('rankings.', ''))
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    {selectedCategory !== 'teams' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {getTranslation(language, item.countryKey.replace('rankings.', ''))}
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {selectedCategory === 'batting' ? item.points :
                         selectedCategory === 'bowling' ? item.wickets :
                         item.matches}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">
              {getTranslation(language, 'home.rankings.battingRankings')}
            </h4>
            <p className="text-blue-700 text-sm">
              {getTranslation(language, 'home.rankings.battingDescription')}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-2">
              {getTranslation(language, 'home.rankings.bowlingRankings')}
            </h4>
            <p className="text-blue-700 text-sm">
              {getTranslation(language, 'home.rankings.bowlingDescription')}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-900 mb-2">
              {getTranslation(language, 'home.rankings.teamRankings')}
            </h4>
            <p className="text-purple-700 text-sm">
              {getTranslation(language, 'home.rankings.teamDescription')}
            </p>
          </div>
        </div>

        {/* View All Rankings Button */}
        <div className="text-center mt-12">
          <Link
            href="/rankings"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {getTranslation(language, 'home.rankings.viewCompleteRankings')}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
