'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  TrophyIcon,
  UserIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function RankingsAdmin() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('team')

  // Fetch stats
  const { data: teamStats } = useFetchData('/team-rankings', {
    queryKey: ['team-rankings', 'stats'],
    params: { page_size: 1000 }
  })
  
  const { data: playerStats } = useFetchData('/player-rankings', {
    queryKey: ['player-rankings', 'stats'],
    params: { page_size: 1000 }
  })

  const { data: generalStats } = useFetchData('/general-rankings', {
    queryKey: ['general-rankings', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const teamColumns = [
    { key: 'team_name', label: 'Team', type: 'text' },
    { key: 'format', label: 'Format', type: 'text' },
    { key: 'rank', label: 'Rank', type: 'number' },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'points', label: 'Points', type: 'number' },
    { key: 'matches_played', label: 'Matches', type: 'number' }
  ]

  const playerColumns = [
    { key: 'player_name', label: 'Player', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'format', label: 'Format', type: 'text' },
    { key: 'rank', label: 'Rank', type: 'number' },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'country', label: 'Country', type: 'text' }
  ]

  const generalColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'rank', label: 'Rank', type: 'number' },
    { key: 'points', label: 'Points', type: 'number' },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'is_published', label: 'Published', type: 'boolean' }
  ]

  const teamFilterFields = [
    {
      key: 'format',
      label: 'Format',
      options: [
        { value: 't20i', label: 'T20I' },
        { value: 'odi', label: 'ODI' },
        { value: 'test', label: 'Test' }
      ]
    }
  ]

  const playerFilterFields = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'batting', label: 'Batting' },
        { value: 'bowling', label: 'Bowling' },
        { value: 'all-rounder', label: 'All-rounder' }
      ]
    },
    {
      key: 'format',
      label: 'Format',
      options: [
        { value: 't20i', label: 'T20I' },
        { value: 'odi', label: 'ODI' },
        { value: 'test', label: 'Test' }
      ]
    }
  ]

  const generalFilterFields = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'team', label: 'Team' },
        { value: 'player', label: 'Player' },
        { value: 'batting', label: 'Batting' },
        { value: 'bowling', label: 'Bowling' },
        { value: 'all-rounder', label: 'All-rounder' }
      ]
    }
  ]

  const teamStatsData = useMemo(() => {
    if (!teamStats?.results) return []
    const rankings = teamStats.results
    return [
      { label: 'Total Rankings', value: rankings.length, icon: TrophyIcon, color: 'blue' },
      { label: 'T20I Rankings', value: rankings.filter(r => r.format === 't20i').length, icon: ChartBarIcon, color: 'green' },
      { label: 'ODI Rankings', value: rankings.filter(r => r.format === 'odi').length, icon: ChartBarIcon, color: 'yellow' },
      { label: 'Test Rankings', value: rankings.filter(r => r.format === 'test').length, icon: ChartBarIcon, color: 'purple' }
    ]
  }, [teamStats])

  const playerStatsData = useMemo(() => {
    if (!playerStats?.results) return []
    const rankings = playerStats.results
    return [
      { label: 'Total Rankings', value: rankings.length, icon: UserIcon, color: 'blue' },
      { label: 'Batting Rankings', value: rankings.filter(r => r.category === 'batting').length, icon: ChartBarIcon, color: 'green' },
      { label: 'Bowling Rankings', value: rankings.filter(r => r.category === 'bowling').length, icon: ChartBarIcon, color: 'red' },
      { label: 'All-rounder Rankings', value: rankings.filter(r => r.category === 'all-rounder').length, icon: TrophyIcon, color: 'purple' }
    ]
  }, [playerStats])

  const generalStatsData = useMemo(() => {
    if (!generalStats?.results) return []
    const rankings = generalStats.results
    return [
      { label: 'Total Rankings', value: rankings.length, icon: TrophyIcon, color: 'blue' },
      { label: 'Published', value: rankings.filter(r => r.is_published).length, icon: ChartBarIcon, color: 'green' },
      { label: 'Team Rankings', value: rankings.filter(r => r.category === 'team').length, icon: TrophyIcon, color: 'yellow' },
      { label: 'Player Rankings', value: rankings.filter(r => r.category === 'player').length, icon: UserIcon, color: 'purple' }
    ]
  }, [generalStats])

  const tabs = [
    { id: 'team', name: 'Team Rankings', icon: TrophyIcon },
    { id: 'player', name: 'Player Rankings', icon: UserIcon },
    { id: 'general', name: 'General Rankings', icon: ChartBarIcon }
  ]

  return (
    <AdminLayout title="Rankings Management">
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className={`mr-2 h-5 w-5 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Team Rankings Tab */}
      {activeTab === 'team' && (
        <CrudTable
          endpoint="/team-rankings/"
          title="Team Rankings"
          columns={teamColumns}
          searchFields={['team_name']}
          filterFields={teamFilterFields}
          addPath="/admin/rankings/add/"
          editPath="/admin/rankings/edit/:id/"
          stats={teamStatsData}
        />
      )}

      {/* Player Rankings Tab */}
      {activeTab === 'player' && (
        <CrudTable
          endpoint="/player-rankings/"
          title="Player Rankings"
          columns={playerColumns}
          searchFields={['player_name']}
          filterFields={playerFilterFields}
          addPath="/admin/rankings/add/"
          editPath="/admin/rankings/edit/:id/"
          stats={playerStatsData}
        />
      )}

      {/* General Rankings Tab */}
      {activeTab === 'general' && (
        <CrudTable
          endpoint="/general-rankings/"
          title="General Rankings"
          columns={generalColumns}
          searchFields={['title', 'description']}
          filterFields={generalFilterFields}
          addPath="/admin/rankings/add/"
          editPath="/admin/rankings/edit/:id/"
          stats={generalStatsData}
        />
      )}
    </AdminLayout>
  )
}