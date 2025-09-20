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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-blue-100 text-lg">Manage your Afghan Cricket Network content efficiently</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/news/add" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                <PlusIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Add News Article</p>
                <p className="text-sm text-gray-500">Create new content</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/events/add" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
                <CalendarDaysIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Schedule Event</p>
                <p className="text-sm text-gray-500">Add new event</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/team/add" className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
              <div className="bg-purple-50 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                <UsersIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Add Player</p>
                <p className="text-sm text-gray-500">Expand team roster</p>
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(section.color)}`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  <EyeIcon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{section.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{section.count}</span>
                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">Manage →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}