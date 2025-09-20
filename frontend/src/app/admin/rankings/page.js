'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  TrophyIcon,
  ChartBarIcon,
  StarIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function RankingsAdmin() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [rankings, setRankings] = useState([
    { id: 1, category: 'ODI Team Ranking', position: 10, points: 85, lastUpdated: '2024-01-15', type: 'Team' },
    { id: 2, category: 'T20I Team Ranking', position: 8, points: 92, lastUpdated: '2024-01-14', type: 'Team' },
    { id: 3, category: 'Test Team Ranking', position: 12, points: 78, lastUpdated: '2024-01-10', type: 'Team' },
    { id: 4, category: 'Player Batting (ODI)', position: 5, points: 145, lastUpdated: '2024-01-12', type: 'Player' }
  ])

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ranking?')) {
      setRankings(rankings.filter(item => item.id !== id))
    }
  }

  const filteredRankings = rankings.filter(ranking => {
    const matchesSearch = ranking.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || ranking.type.toLowerCase() === filterCategory
    return matchesSearch && matchesFilter
  })

  const getRankColor = (position) => {
    if (position <= 5) return 'bg-green-100 text-green-800 border-green-200'
    if (position <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const stats = [
    { name: 'Total Rankings', value: rankings.length, icon: ChartBarIcon, color: 'blue' },
    { name: 'Team Rankings', value: rankings.filter(r => r.type === 'Team').length, icon: TrophyIcon, color: 'emerald' },
    { name: 'Player Rankings', value: rankings.filter(r => r.type === 'Player').length, icon: StarIcon, color: 'amber' },
    { name: 'Top 10 Positions', value: rankings.filter(r => r.position <= 10).length, icon: TrophyIcon, color: 'purple' }
  ]

  return (
    <AdminLayout title="Rankings Management">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">Rankings Management</h1>
            <p className="text-gray-600">Manage team and player rankings across all formats</p>
          </div>
          <Link
            href="/admin/rankings/add"
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Ranking
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass rounded-2xl p-6 hover-glow group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rankings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="all">All Categories</option>
              <option value="team">Team Rankings</option>
              <option value="player">Player Rankings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rankings Grid */}
      <div className="space-y-6">
        {filteredRankings.map((ranking) => (
          <div key={ranking.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <TrophyIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ranking.category}
                    </h3>
                  </div>
                  <span className={`badge ${getRankColor(ranking.position)}`}>
                    Rank #{ranking.position}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <ChartBarIcon className="w-4 h-4 mr-1" />
                    <span>{ranking.points} points</span>
                  </div>
                  <span>Updated: {new Date(ranking.lastUpdated).toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{ranking.type}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(10, 100 - ranking.position * 5)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">Performance</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  href={`/admin/rankings/edit/${ranking.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover-lift"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(ranking.id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 hover-lift"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRankings.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <TrophyIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterCategory !== 'all' ? 'No rankings found' : 'No rankings available'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start by adding your first ranking entry.'}
          </p>
          <Link
            href="/admin/rankings/add"
            className="btn-primary hover-lift inline-flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add First Ranking
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}