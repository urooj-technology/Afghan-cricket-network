'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import CrudForm from '../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../hooks'

export default function AddEvent() {
  const router = useRouter()
  const { language } = useLanguage()

  // Fetch categories and venues for dropdowns
  const { data: categories } = useFetchData('/event-categories')
  const { data: venues } = useFetchData('/venues')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const fields = [
    // Basic Information
    {
      name: 'title',
      label: 'Event Title',
      type: 'text',
      required: true,
      placeholder: 'Enter compelling event title',
      help: 'Make it descriptive and engaging'
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'event-slug',
      help: 'URL-friendly version (auto-generated from title if empty)'
    },
    {
      name: 'description',
      label: 'Event Description',
      type: 'textarea',
      required: true,
      rows: 6,
      placeholder: 'Provide detailed event description, including what to expect...',
      fullWidth: true,
      help: 'Include key details like format, teams, special features'
    },
    
    // Classification
    {
      name: 'category',
      label: 'Event Category',
      type: 'select',
      required: true,
      options: categories?.results?.map(cat => ({
        value: cat.id,
        label: cat.name
      })) || [],
      help: 'Select the most appropriate category'
    },
    {
      name: 'event_type',
      label: 'Event Type',
      type: 'select',
      required: true,
      options: [
        { value: 'international', label: 'International Match' },
        { value: 'domestic', label: 'Domestic Match' },
        { value: 'training', label: 'Training Session' },
        { value: 'tournament', label: 'Tournament' },
        { value: 'friendly', label: 'Friendly Match' }
      ],
      help: 'Choose the type that best describes this event'
    },
    
    // Location & Timing
    {
      name: 'venue',
      label: 'Venue',
      type: 'select',
      required: true,
      options: venues?.results?.map(venue => ({
        value: venue.id,
        label: `${venue.name}, ${venue.city}`
      })) || [],
      help: 'Select the venue where event will take place'
    },
    {
      name: 'date',
      label: 'Start Date & Time',
      type: 'datetime-local',
      required: true,
      help: 'When the event begins'
    },
    {
      name: 'end_date',
      label: 'End Date & Time',
      type: 'datetime-local',
      help: 'Leave empty for single-day events or matches'
    },
    
    // Status & Publishing
    {
      name: 'status',
      label: 'Event Status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { value: 'upcoming', label: 'Upcoming - Event not started' },
        { value: 'ongoing', label: 'Ongoing - Event in progress' },
        { value: 'completed', label: 'Completed - Event finished' },
        { value: 'cancelled', label: 'Cancelled - Event cancelled' }
      ]
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true,
      help: 'Uncheck to save as draft (not visible to public)'
    },
    {
      name: 'is_featured',
      label: 'Featured Event',
      type: 'checkbox',
      help: 'Featured events appear prominently on homepage'
    },
    
    // Ticketing & Capacity
    {
      name: 'is_free',
      label: 'Free Event',
      type: 'checkbox',
      defaultValue: true,
      help: 'Check if the event is free to attend'
    },
    {
      name: 'ticket_price',
      label: 'Ticket Price (USD)',
      type: 'number',
      min: 0,
      step: 0.01,
      placeholder: '0.00',
      help: 'Set to 0 or leave empty for free events'
    },
    {
      name: 'max_capacity',
      label: 'Maximum Capacity',
      type: 'number',
      min: 1,
      placeholder: 'Maximum number of attendees',
      help: 'Leave empty for unlimited capacity'
    },
    {
      name: 'registered_count',
      label: 'Current Registrations',
      type: 'number',
      defaultValue: 0,
      min: 0,
      help: 'Number of people currently registered'
    },
    
    // Media
    {
      name: 'image',
      label: 'Event Poster/Image',
      type: 'file',
      accept: 'image/*',
      help: 'Upload an attractive poster or image (recommended: 1200x630px)'
    }
  ]

  return (
    <AdminLayout title="Add Event">
      <CrudForm
        endpoint="/events/"
        fields={fields}
        title="Event"
        backPath="/admin/events/"
        onSuccess={(data) => {
          console.log('Event created:', data)
        }}
        onError={(error) => {
          console.error('Failed to create event:', error)
        }}
      />
    </AdminLayout>
  )
}