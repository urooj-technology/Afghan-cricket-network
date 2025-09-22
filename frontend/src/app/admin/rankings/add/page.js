'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import CrudForm from '../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../hooks'

export default function AddRanking() {
  const router = useRouter()
  const { language } = useLanguage()
  const [rankingType, setRankingType] = useState('team')

  // Fetch players for dropdown
  const { data: players } = useFetchData('/players')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const teamRankingFields = [
    {
      name: 'team_name',
      label: 'Team Name',
      type: 'text',
      required: true,
      placeholder: 'Enter team name'
    },
    {
      name: 'format',
      label: 'Format',
      type: 'select',
      required: true,
      options: [
        { value: 't20i', label: 'T20I' },
        { value: 'odi', label: 'ODI' },
        { value: 'test', label: 'Test' }
      ]
    },
    {
      name: 'rank',
      label: 'Rank',
      type: 'number',
      required: true,
      min: 1,
      placeholder: 'Team rank position'
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Team rating'
    },
    {
      name: 'points',
      label: 'Points',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Team points'
    },
    {
      name: 'matches_played',
      label: 'Matches Played',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'country_code',
      label: 'Country Code',
      type: 'text',
      defaultValue: 'AFG',
      placeholder: 'AFG',
      help: '3-letter country code'
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true
    }
  ]

  const playerRankingFields = [
    {
      name: 'player',
      label: 'Player',
      type: 'select',
      options: players?.results?.map(player => ({
        value: player.id,
        label: player.name
      })) || []
    },
    {
      name: 'player_name',
      label: 'Player Name',
      type: 'text',
      required: true,
      placeholder: 'Enter player name'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'batting', label: 'Batting' },
        { value: 'bowling', label: 'Bowling' },
        { value: 'all-rounder', label: 'All-rounder' }
      ]
    },
    {
      name: 'format',
      label: 'Format',
      type: 'select',
      required: true,
      options: [
        { value: 't20i', label: 'T20I' },
        { value: 'odi', label: 'ODI' },
        { value: 'test', label: 'Test' }
      ]
    },
    {
      name: 'rank',
      label: 'Rank',
      type: 'number',
      required: true,
      min: 1,
      placeholder: 'Player rank position'
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Player rating'
    },
    {
      name: 'points',
      label: 'Points',
      type: 'number',
      min: 0,
      placeholder: 'Player points'
    },
    {
      name: 'wickets',
      label: 'Wickets',
      type: 'number',
      min: 0,
      placeholder: 'Total wickets (for bowlers)'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      defaultValue: 'Afghanistan',
      required: true
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true
    }
  ]

  const generalRankingFields = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'team', label: 'Team' },
        { value: 'player', label: 'Player' },
        { value: 'batting', label: 'Batting' },
        { value: 'bowling', label: 'Bowling' },
        { value: 'all-rounder', label: 'All-rounder' }
      ]
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      placeholder: 'Ranking title'
    },
    {
      name: 'rank',
      label: 'Rank',
      type: 'number',
      required: true,
      min: 1,
      placeholder: 'Rank position'
    },
    {
      name: 'points',
      label: 'Points',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 4,
      placeholder: 'Ranking description',
      fullWidth: true
    },
    {
      name: 'image',
      label: 'Image',
      type: 'file',
      accept: 'image/*'
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true
    }
  ]

  const getEndpoint = () => {
    switch (rankingType) {
      case 'team': return '/team-rankings'
      case 'player': return '/player-rankings'
      case 'general': return '/general-rankings'
      default: return '/team-rankings'
    }
  }

  const getFields = () => {
    switch (rankingType) {
      case 'team': return teamRankingFields
      case 'player': return playerRankingFields
      case 'general': return generalRankingFields
      default: return teamRankingFields
    }
  }

  return (
    <AdminLayout title={`Add ${rankingType.charAt(0).toUpperCase() + rankingType.slice(1)} Ranking`}>
      {/* Type Selector */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setRankingType('team')}
            className={`px-4 py-2 rounded-lg font-medium ${
              rankingType === 'team'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Team Ranking
          </button>
          <button
            onClick={() => setRankingType('player')}
            className={`px-4 py-2 rounded-lg font-medium ${
              rankingType === 'player'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Player Ranking
          </button>
          <button
            onClick={() => setRankingType('general')}
            className={`px-4 py-2 rounded-lg font-medium ${
              rankingType === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            General Ranking
          </button>
        </div>
      </div>

      <CrudForm
        endpoint={getEndpoint()}
        fields={getFields()}
        title={`${rankingType.charAt(0).toUpperCase() + rankingType.slice(1)} Ranking`}
        backPath="/admin/rankings/"
        onSuccess={(data) => {
          console.log(`${rankingType} ranking created:`, data)
        }}
        onError={(error) => {
          console.error(`Failed to create ${rankingType} ranking:`, error)
        }}
      />
    </AdminLayout>
  )
}