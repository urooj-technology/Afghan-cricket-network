'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  NewspaperIcon, 
  CalendarDaysIcon, 
  TrophyIcon, 
  UsersIcon, 
  PhotoIcon, 
  EnvelopeIcon,
  ChartBarIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) return null

  const stats = [
    { name: 'Total Articles', value: '24', change: '+12%', icon: NewspaperIcon, color: 'blue' },
    { name: 'Active Events', value: '8', change: '+3%', icon: CalendarDaysIcon, color: 'green' },
    { name: 'Team Members', value: '25', change: '+2', icon: UsersIcon, color: 'purple' },
    { name: 'Media Files', value: '156', change: '+18%', icon: PhotoIcon, color: 'orange' },
  ]

  const sections = [
    { 
      name: 'News Management', 
      path: '/admin/news', 
      icon: NewspaperIcon, 
      count: '12 articles',
      description: 'Create and manage news articles',
      color: 'blue'
    },
    { 
      name: 'Events Management', 
      path: '/admin/events', 
      icon: CalendarDaysIcon, 
      count: '8 events',
      description: 'Schedule and manage cricket events',
      color: 'green'
    },
    { 
      name: 'Rankings', 
      path: '/admin/rankings', 
      icon: TrophyIcon, 
      count: '5 categories',
      description: 'Update team and player rankings',
      color: 'yellow'
    },
    { 
      name: 'Team Management', 
      path: '/admin/team', 
      icon: UsersIcon, 
      count: '25 players',
      description: 'Manage team roster and profiles',
      color: 'purple'
    },
    { 
      name: 'Media Library', 
      path: '/admin/media', 
      icon: PhotoIcon, 
      count: '45 files',
      description: 'Upload and organize media content',
      color: 'pink'
    },
    { 
      name: 'Contact Messages', 
      path: '/admin/contact', 
      icon: EnvelopeIcon, 
      count: '3 new messages',
      description: 'View and respond to inquiries',
      color: 'indigo'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    }
    return colors[color] || colors.blue
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Welcome back, Admin!</h1>
          <p className="text-purple-100 text-xl">Manage your Afghan Cricket Network content efficiently</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">{stat.name}</p>
                <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 font-bold mt-1">{stat.change}</p>
              </div>
              <div className={`p-4 rounded-2xl ${getColorClasses(stat.color)} shadow-lg`}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/news/add/" className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-xl group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 shadow-lg">
                <PlusIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Add News Article</p>
                <p className="text-sm text-gray-600">Create new content</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/events/add/" className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 shadow-lg">
                <CalendarDaysIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Schedule Event</p>
                <p className="text-sm text-gray-600">Add new event</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/team/add/" className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-100 to-indigo-100 p-3 rounded-xl group-hover:from-pink-200 group-hover:to-indigo-200 transition-all duration-300 shadow-lg">
                <UsersIcon className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-900">Add Player</p>
                <p className="text-sm text-gray-600">Expand team roster</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.name}
              href={section.path}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 group overflow-hidden relative"
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${getColorClasses(section.color)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-7 h-7" />
                  </div>
                  <div className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-300">
                    <EyeIcon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">{section.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{section.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">{section.count}</span>
                  <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">Manage →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}