'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  TicketIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function EventsAdmin() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Afghanistan vs Pakistan T20 International', 
      date: '2024-02-15', 
      time: '19:00',
      venue: 'Sharjah Cricket Stadium', 
      status: 'Upcoming',
      ticketPrice: '$25',
      capacity: 15000,
      registered: 8500,
      description: 'Exciting T20 match between Afghanistan and Pakistan national teams'
    },
    { 
      id: 2, 
      title: 'National Cricket Training Camp', 
      date: '2024-02-10', 
      time: '09:00',
      venue: 'Kabul Cricket Ground', 
      status: 'Ongoing',
      ticketPrice: 'Free',
      capacity: 200,
      registered: 180,
      description: 'Intensive training camp for young cricket talents'
    },
    { 
      id: 3, 
      title: 'Youth Championship Final', 
      date: '2024-01-20', 
      time: '14:00',
      venue: 'Kandahar Stadium', 
      status: 'Completed',
      ticketPrice: '$10',
      capacity: 8000,
      registered: 7200,
      description: 'Final match of the national youth cricket championship'
    }
  ])

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(item => item.id !== id))
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || event.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const styles = {
      Upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
      Ongoing: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Completed: 'bg-slate-100 text-slate-700 border-slate-200',
      Cancelled: 'bg-red-100 text-red-700 border-red-200'
    }
    return styles[status] || styles.Upcoming
  }

  const stats = [
    { name: 'Total Events', value: events.length, icon: CalendarDaysIcon, color: 'blue' },
    { name: 'Upcoming', value: events.filter(e => e.status === 'Upcoming').length, icon: ClockIcon, color: 'emerald' },
    { name: 'Active Events', value: events.filter(e => e.status === 'Ongoing').length, icon: UsersIcon, color: 'amber' },
    { name: 'Total Registered', value: events.reduce((sum, e) => sum + e.registered, 0).toLocaleString(), icon: TicketIcon, color: 'purple' }
  ]

  return (
    <AdminLayout title="Events Management">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">Events Management</h1>
            <p className="text-gray-600">Schedule and manage cricket events and matches</p>
          </div>
          <Link
            href="/admin/events/add"
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Event
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <span className={`badge ${getStatusBadge(event.status)} ml-3`}>
                    {event.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2 text-emerald-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TicketIcon className="w-4 h-4 mr-2 text-amber-500" />
                    <span>{event.ticketPrice}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    <span>{event.registered.toLocaleString()} / {event.capacity.toLocaleString()} registered</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  href={`/admin/events/edit/${event.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover-lift"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
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
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No events found' : 'No events scheduled'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start by creating your first cricket event or match.'}
          </p>
          <Link
            href="/admin/events/add"
            className="btn-primary hover-lift inline-flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create First Event
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}