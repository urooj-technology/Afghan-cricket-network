'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UsersIcon,
  StarIcon,
  ShieldCheckIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function TeamAdmin() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [players, setPlayers] = useState([
    { 
      id: 1, 
      name: 'Rashid Khan', 
      role: 'All-rounder', 
      age: 25, 
      matches: 85,
      average: 18.5,
      status: 'Active',
      captain: false,
      joinDate: '2015-10-01'
    },
    { 
      id: 2, 
      name: 'Mohammad Nabi', 
      role: 'All-rounder', 
      age: 38, 
      matches: 144,
      average: 25.2,
      status: 'Active',
      captain: true,
      joinDate: '2009-04-19'
    },
    { 
      id: 3, 
      name: 'Rahmanullah Gurbaz', 
      role: 'Wicket-keeper', 
      age: 22, 
      matches: 45,
      average: 32.8,
      status: 'Active',
      captain: false,
      joinDate: '2019-09-11'
    },
    { 
      id: 4, 
      name: 'Mujeeb Ur Rahman', 
      role: 'Bowler', 
      age: 23, 
      matches: 65,
      average: 15.2,
      status: 'Active',
      captain: false,
      joinDate: '2017-10-07'
    }
  ])

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this player?')) {
      setPlayers(players.filter(item => item.id !== id))
    }
  }

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRole === 'all' || player.role.toLowerCase().includes(filterRole.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const getRoleColor = (role) => {
    switch(role) {
      case 'Batsman': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Bowler': return 'bg-green-100 text-green-800 border-green-200'
      case 'All-rounder': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Wicket-keeper': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const stats = [
    { name: 'Total Players', value: players.length, icon: UsersIcon, color: 'blue' },
    { name: 'Active Players', value: players.filter(p => p.status === 'Active').length, icon: ShieldCheckIcon, color: 'emerald' },
    { name: 'All-rounders', value: players.filter(p => p.role === 'All-rounder').length, icon: StarIcon, color: 'amber' },
    { name: 'Avg Experience', value: `${Math.round(players.reduce((sum, p) => sum + p.matches, 0) / players.length)} matches`, icon: UsersIcon, color: 'purple' }
  ]

  return (
    <AdminLayout title="Team Management">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">Team Management</h1>
            <p className="text-gray-600">Manage team roster and player profiles</p>
          </div>
          <Link
            href="/admin/team/add"
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Player
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
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="all">All Roles</option>
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="all-rounder">All-rounder</option>
              <option value="wicket-keeper">Wicket-keeper</option>
            </select>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="space-y-6">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <UsersIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center">
                        {player.name}
                        {player.captain && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
                            Captain
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">Age: {player.age}</p>
                    </div>
                  </div>
                  <span className={`badge ${getRoleColor(player.role)}`}>
                    {player.role}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Matches:</span> {player.matches}
                  </div>
                  <div>
                    <span className="font-medium">Average:</span> {player.average}
                  </div>
                  <div>
                    <span className="font-medium">Joined:</span> {new Date(player.joinDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    player.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {player.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  href={`/admin/team/edit/${player.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover-lift"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 hover-lift"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <UsersIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterRole !== 'all' ? 'No players found' : 'No players in roster'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterRole !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start building your team by adding the first player.'}
          </p>
          <Link
            href="/admin/team/add"
            className="btn-primary hover-lift inline-flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add First Player
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}