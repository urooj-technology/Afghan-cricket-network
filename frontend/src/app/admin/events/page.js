'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  TicketIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function EventsAdmin() {
  const router = useRouter()
  const { language } = useLanguage()

  // Fetch stats
  const { data: stats } = useFetchData('/events', {
    queryKey: ['events', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const columns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'event_type', label: 'Type', type: 'text' },
    { key: 'venue_name', label: 'Venue', type: 'text' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'registered_count', label: 'Registered', type: 'number' }
  ]

  const filterFields = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
      ]
    },
    {
      key: 'event_type',
      label: 'Type',
      options: [
        { value: 'international', label: 'International' },
        { value: 'domestic', label: 'Domestic' },
        { value: 'training', label: 'Training' },
        { value: 'tournament', label: 'Tournament' },
        { value: 'friendly', label: 'Friendly' }
      ]
    }
  ]

  const statsData = useMemo(() => {
    if (!stats?.results) return []
    const allEvents = stats.results
    return [
      { label: 'Total Events', value: allEvents.length, icon: CalendarDaysIcon, color: 'blue' },
      { label: 'Upcoming', value: allEvents.filter(e => e.status === 'upcoming').length, icon: ClockIcon, color: 'emerald' },
      { label: 'Active Events', value: allEvents.filter(e => e.status === 'ongoing').length, icon: UsersIcon, color: 'amber' },
      { label: 'Total Registered', value: allEvents.reduce((sum, e) => sum + (e.registered_count || 0), 0).toLocaleString(), icon: TicketIcon, color: 'purple' }
    ]
  }, [stats])

  return (
    <AdminLayout title="Events Management">
      <CrudTable
        endpoint="/events/"
        title="Events"
        columns={columns}
        searchFields={['title', 'description']}
        filterFields={filterFields}
        addPath="/admin/events/add/"
        editPath="/admin/events/edit/:id/"
        stats={statsData}
      />
    </AdminLayout>
  )
}