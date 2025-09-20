'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useFetchData, useDelete } from '../../../hooks'
import usePagination from '../../../hooks/usePagination'
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
  const [filterStatus, setFilterStatus] = useState('')

  const filters = useMemo(() => ({
    ...(filterStatus && { status: filterStatus }),
  }), [filterStatus])

  const {
    data: events,
    pagination,
    isLoading,
    error,
    refetch,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination('/events', {
    search: searchTerm,
    filters,
    ordering: '-date',
    pageSize: 10
  })

  const { data: stats } = useFetchData('/events', {
    queryKey: ['events', 'stats'],
    params: { page_size: 1000 }
  })

  const deleteEvent = useDelete('/events', {
    onSuccess: () => {
      refetch()
    }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent.mutate(id)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleFilterChange = (value) => {
    setFilterStatus(value)
    resetPage()
  }

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
      ongoing: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      completed: 'bg-slate-100 text-slate-700 border-slate-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    }
    return styles[status] || styles.upcoming
  }

  const statsData = useMemo(() => {
    if (!stats?.results) return []
    const allEvents = stats.results
    return [
      { name: 'Total Events', value: allEvents.length, icon: CalendarDaysIcon, color: 'blue' },
      { name: 'Upcoming', value: allEvents.filter(e => e.status === 'upcoming').length, icon: ClockIcon, color: 'emerald' },
      { name: 'Active Events', value: allEvents.filter(e => e.status === 'ongoing').length, icon: UsersIcon, color: 'amber' },
      { name: 'Total Registered', value: allEvents.reduce((sum, e) => sum + (e.registered_count || 0), 0).toLocaleString(), icon: TicketIcon, color: 'purple' }
    ]
  }, [stats])

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
        {statsData.map((stat) => (
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
                onChange={(e) => handleSearch(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <p className="text-red-600">Error loading events: {error.message}</p>
          <button onClick={refetch} className="mt-2 btn-primary">Retry</button>
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {events.map((event) => (
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
                      <span>{new Date(event.date).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{event.venue_name}, {event.venue_city}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <TicketIcon className="w-4 h-4 mr-2 text-amber-500" />
                      <span>{event.is_free ? 'Free' : `$${event.ticket_price}`}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      <span>{event.registered_count || 0} registered</span>
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
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 p-6 bg-white rounded-xl border">
          <div className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.count)} of {pagination.count} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousPage}
              disabled={!pagination.hasPrevious}
              className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    page === pagination.currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={nextPage}
              disabled={!pagination.hasNext}
              className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus ? 'No events found' : 'No events scheduled'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus 
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