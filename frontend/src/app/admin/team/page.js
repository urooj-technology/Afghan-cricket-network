'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  UserIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function TeamAdmin() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('players')
  
  // Fetch stats
  const { data: playersStats } = useFetchData('/players', {
    queryKey: ['players', 'stats'],
    params: { page_size: 1000 }
  })
  
  const { data: membersStats } = useFetchData('/team-members', {
    queryKey: ['team-members', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const playerColumns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'jersey_number', label: 'Jersey #', type: 'number' },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
    { key: 'matches_played', label: 'Matches', type: 'number' },
    { key: 'status', label: 'Status', type: 'status' }
  ]

  const memberColumns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'position', label: 'Position', type: 'text' },
    { key: 'member_type', label: 'Type', type: 'text' },
    { key: 'join_date', label: 'Join Date', type: 'date' },
    { key: 'is_active', label: 'Active', type: 'boolean' }
  ]

  const playerFilterFields = [
    {
      key: 'role',
      label: 'Role',
      options: [
        { value: 'batsman', label: 'Batsman' },
        { value: 'bowler', label: 'Bowler' },
        { value: 'all-rounder', label: 'All-rounder' },
        { value: 'wicket-keeper', label: 'Wicket-keeper' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'injured', label: 'Injured' },
        { value: 'retired', label: 'Retired' },
        { value: 'suspended', label: 'Suspended' }
      ]
    }
  ]

  const memberFilterFields = [
    {
      key: 'member_type',
      label: 'Type',
      options: [
        { value: 'management', label: 'Management' },
        { value: 'coaches', label: 'Coaches' },
        { value: 'staff', label: 'Staff' },
        { value: 'players', label: 'Players' }
      ]
    }
  ]

  const playersStatsData = useMemo(() => {
    if (!playersStats?.results) return []
    const players = playersStats.results
    return [
      { label: 'Total Players', value: players.length, icon: UserIcon, color: 'blue' },
      { label: 'Active Players', value: players.filter(p => p.status === 'active').length, icon: ChartBarIcon, color: 'green' },
      { label: 'Captains', value: players.filter(p => p.is_captain || p.is_vice_captain).length, icon: TrophyIcon, color: 'yellow' },
      { label: 'Total Matches', value: players.reduce((sum, p) => sum + p.matches_played, 0), icon: ChartBarIcon, color: 'purple' }
    ]
  }, [playersStats])

  const membersStatsData = useMemo(() => {
    if (!membersStats?.results) return []
    const members = membersStats.results
    return [
      { label: 'Total Members', value: members.length, icon: UserIcon, color: 'blue' },
      { label: 'Active Members', value: members.filter(m => m.is_active).length, icon: ChartBarIcon, color: 'green' },
      { label: 'Management', value: members.filter(m => m.member_type === 'management').length, icon: TrophyIcon, color: 'purple' },
      { label: 'Coaches', value: members.filter(m => m.member_type === 'coaches').length, icon: ChartBarIcon, color: 'orange' }
    ]
  }, [membersStats])

  const tabs = [
    { id: 'players', name: 'Players', icon: UserIcon },
    { id: 'members', name: 'Team Members', icon: TrophyIcon }
  ]

  return (
    <AdminLayout title={getTranslation(language, 'admin.team.title')}>
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

      {/* Players Tab */}
      {activeTab === 'players' && (
        <CrudTable
          endpoint="/players/"
          title="Players"
          columns={playerColumns}
          searchFields={['name', 'position']}
          filterFields={playerFilterFields}
          addPath="/admin/team/add/"
          editPath="/admin/team/edit/:id/"
          stats={playersStatsData}
        />
      )}

      {/* Team Members Tab */}
      {activeTab === 'members' && (
        <CrudTable
          endpoint="/team-members/"
          title="Team Members"
          columns={memberColumns}
          searchFields={['name', 'position']}
          filterFields={memberFilterFields}
          addPath="/admin/team/add/"
          editPath="/admin/team/edit/:id/"
          stats={membersStatsData}
        />
      )}
    </AdminLayout>
  )
}