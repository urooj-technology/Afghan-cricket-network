'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'

export default function EditVenue() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const fields = [
    {
      name: 'name',
      label: 'Venue Name',
      type: 'text',
      required: true,
      placeholder: 'Enter venue name',
      section: 'Basic Information'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      placeholder: 'Enter city name',
      section: 'Basic Information'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      placeholder: 'Enter country name',
      section: 'Basic Information'
    },
    {
      name: 'capacity',
      label: 'Seating Capacity',
      type: 'number',
      min: 1,
      placeholder: 'Enter seating capacity',
      help: 'Maximum number of spectators',
      section: 'Venue Details'
    },
    {
      name: 'address',
      label: 'Full Address',
      type: 'textarea',
      rows: 3,
      placeholder: 'Enter complete address',
      fullWidth: true,
      section: 'Location Information'
    },
    {
      name: 'latitude',
      label: 'Latitude',
      type: 'number',
      step: 0.000001,
      placeholder: '34.5553',
      help: 'GPS latitude coordinate',
      section: 'Location Information'
    },
    {
      name: 'longitude',
      label: 'Longitude',
      type: 'number',
      step: 0.000001,
      placeholder: '69.2075',
      help: 'GPS longitude coordinate',
      section: 'Location Information'
    },
    {
      name: 'image',
      label: 'Venue Image',
      type: 'file',
      accept: 'image/*',
      help: 'Upload an image of the venue (recommended: 1200x800px)',
      section: 'Media'
    }
  ]

  return (
    <AdminLayout title="Edit Venue">
      <CrudForm
        endpoint="/venues/"
        fields={fields}
        title="Cricket Venue"
        backPath="/admin/venues/"
        itemId={id}
      />
    </AdminLayout>
  )
}