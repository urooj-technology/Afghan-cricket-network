'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  MapPinIcon,
  BuildingOfficeIcon,
  UsersIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function VenuesAdmin() {
  const router = useRouter()
  const { language } = useLanguage()

  const { data: stats } = useFetchData('/venues', {
    queryKey: ['venues', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const columns = [
    { key: 'name', label: 'Venue Name', type: 'text' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'capacity', label: 'Capacity', type: 'number' },
    { key: 'created_at', label: 'Created', type: 'date' }
  ]

  const filterFields = [
    {
      key: 'country',
      label: 'Country',
      options: [
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'Pakistan', label: 'Pakistan' },
        { value: 'India', label: 'India' },
        { value: 'England', label: 'England' },
        { value: 'Australia', label: 'Australia' }
      ]
    }
  ]

  const statsData = useMemo(() => {
    if (!stats?.results) return []
    const venues = stats.results
    return [
      { label: 'Total Venues', value: venues.length, icon: BuildingOfficeIcon, color: 'blue' },
      { label: 'Countries', value: new Set(venues.map(v => v.country)).size, icon: GlobeAltIcon, color: 'green' },
      { label: 'Cities', value: new Set(venues.map(v => v.city)).size, icon: MapPinIcon, color: 'yellow' },
      { label: 'Total Capacity', value: venues.reduce((sum, v) => sum + (v.capacity || 0), 0).toLocaleString(), icon: UsersIcon, color: 'purple' }
    ]
  }, [stats])

  return (
    <AdminLayout title="Venues Management">
      <CrudTable
        endpoint="/venues/"
        title="Cricket Venues"
        columns={columns}
        searchFields={['name', 'city', 'country', 'address']}
        filterFields={filterFields}
        addPath="/admin/venues/add/"
        editPath="/admin/venues/edit/:id/"
        stats={statsData}
      />
    </AdminLayout>
  )
}