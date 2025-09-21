'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardImage, CardHeader, CardTitle, CardDescription, CardBadge } from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  TicketIcon,
  UsersIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline'

export default function EventsPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')

  const filters = useMemo(() => ({
    ...(filterStatus && { status: filterStatus }),
    ...(filterType && { event_type: filterType }),
  }), [filterStatus, filterType])

  const {
    data: events,
    pagination,
    isLoading,
    error,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination('/events', {
    search: searchTerm,
    filters,
    ordering: '-date',
    pageSize: 12
  })

  const { data: featuredEvents } = useFetchData('/events/featured', {
    queryKey: ['events', 'featured']
  })

  const { data: upcomingEvents } = useFetchData('/events/upcoming', {
    queryKey: ['events', 'upcoming']
  })

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleStatusFilter = (value) => {
    setFilterStatus(value)
    resetPage()
  }

  const handleTypeFilter = (value) => {
    setFilterType(value)
    resetPage()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'success',
      ongoing: 'info',
      completed: 'secondary',
      cancelled: 'danger'
    }
    return colors[status] || 'secondary'
  }

  const getTypeColor = (type) => {
    const colors = {
      international: 'primary',
      domestic: 'success',
      training: 'warning',
      tournament: 'info'
    }
    return colors[type] || 'secondary'
  }

  return (
    <PageLayout
      title="Cricket Events & Matches"
      subtitle="Discover upcoming matches, tournaments, and cricket events across Afghanistan"
      heroGradient="from-emerald-900 via-emerald-800 to-emerald-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {upcomingEvents?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FireIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {events?.filter(e => e.event_type === 'international').length || 0}
              </div>
              <div className="text-sm text-gray-600">International</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {featuredEvents?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Featured</div>
            </Card>
            
            <Card className="text-center" padding="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {events?.reduce((sum, e) => sum + (e.registered_count || 0), 0) || 0}
              </div>
              <div className="text-sm text-gray-600">Total Registered</div>
            </Card>
          </div>
        </section>

        {/* Featured Events */}
        {featuredEvents && featuredEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredEvents.slice(0, 3).map((event) => (
                <Card key={event.id} hover className="overflow-hidden">
                  <div className="relative">
                    <CardImage 
                      src={event.image || '/api/placeholder/400/250'} 
                      alt={event.title}
                      aspectRatio="aspect-[16/10]"
                    />
                    <div className="absolute top-4 left-4">
                      <CardBadge variant="warning">Featured</CardBadge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <CardBadge variant={getTypeColor(event.event_type)}>
                        {event.event_type}
                      </CardBadge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <CardBadge variant={getStatusColor(event.status)}>
                        {event.status}
                      </CardBadge>
                      <span className="text-sm text-gray-500">
                        {event.registered_count || 0} registered
                      </span>
                    </div>
                    
                    <CardTitle className="mb-3 hover:text-blue-600 transition-colors">
                      <Link href={`/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </CardTitle>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
                        {new Date(event.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                        {event.venue_name}, {event.venue_city}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TicketIcon className="w-4 h-4 mr-2 text-orange-500" />
                        {event.is_free ? 'Free Entry' : `$${event.ticket_price}`}
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <section className="mb-12">
          <Card padding="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                  >
                    <option value="">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 min-w-[160px]"
                >
                  <option value="">All Types</option>
                  <option value="international">International</option>
                  <option value="domestic">Domestic</option>
                  <option value="training">Training</option>
                  <option value="tournament">Tournament</option>
                </select>
                
                {(searchTerm || filterStatus || filterType) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setFilterStatus('')
                      setFilterType('')
                      resetPage()
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" />}

        {/* Error State */}
        {error && (
          <Card background="bg-red-50" border="border-red-200" className="mb-8">
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Error loading events: {error.message}</p>
              <Button variant="danger" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* Events Grid */}
        {!isLoading && !error && (
          <>
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <Card key={event.id} hover className="overflow-hidden">
                    <div className="relative">
                      <CardImage 
                        src={event.image || '/api/placeholder/400/250'} 
                        alt={event.title}
                        aspectRatio="aspect-[16/10]"
                      />
                      <div className="absolute top-4 right-4">
                        <CardBadge variant={getTypeColor(event.event_type)}>
                          {event.event_type}
                        </CardBadge>
                      </div>
                      {event.is_featured && (
                        <div className="absolute top-4 left-4">
                          <StarIcon className="w-5 h-5 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <CardBadge variant={getStatusColor(event.status)}>
                          {event.status}
                        </CardBadge>
                        <span className="text-sm text-gray-500">
                          {event.registered_count || 0} registered
                        </span>
                      </div>
                      
                      <CardTitle className="mb-3 hover:text-blue-600 transition-colors">
                        <Link href={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </CardTitle>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
                          {new Date(event.date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                          {event.venue_name}, {event.venue_city}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <TicketIcon className="w-4 h-4 mr-2 text-orange-500" />
                          {event.is_free ? 'Free Entry' : `$${event.ticket_price}`}
                        </div>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <Link href={`/events/${event.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <section className="flex justify-center">
                <Card padding="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousPage}
                      disabled={!pagination.hasPrevious}
                    >
                      Previous
                    </Button>
                    {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={page === pagination.currentPage ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPage}
                      disabled={!pagination.hasNext}
                    >
                      Next
                    </Button>
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-600">
                    Showing {((pagination.currentPage - 1) * 12) + 1} to {Math.min(pagination.currentPage * 12, pagination.count)} of {pagination.count} events
                  </div>
                </Card>
              </section>
            )}

            {/* Empty State */}
            {events.length === 0 && (
              <Card className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm || filterStatus || filterType ? 'No events found' : 'No events scheduled'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || filterStatus || filterType
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Check back later for upcoming cricket events.'}
                  </p>
                  {(searchTerm || filterStatus || filterType) && (
                    <Button
                      onClick={() => {
                        setSearchTerm('')
                        setFilterStatus('')
                        setFilterType('')
                        resetPage()
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
}