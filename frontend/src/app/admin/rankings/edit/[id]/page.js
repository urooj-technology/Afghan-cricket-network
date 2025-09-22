'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../../hooks'

export default function EditRanking() {
  const router = useRouter()
  const params = useParams()
  const { language } = useLanguage()
  const { id } = params
  const [rankingType, setRankingType] = useState('team')

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

  return (
    <AdminLayout title="Edit Ranking">
      <CrudForm
        endpoint="/team-rankings"
        fields={teamRankingFields}
        title="Ranking"
        backPath="/admin/rankings/"
        itemId={id}
        onSuccess={(data) => {
          console.log('Ranking updated:', data)
        }}
        onError={(error) => {
          console.error('Failed to update ranking:', error)
        }}
      />
    </AdminLayout>
  )
}