'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../../hooks'

export default function EditContact() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { id } = params
  const type = searchParams.get('type') || 'message'

  const { data: categories } = useFetchData('/contact-categories')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const messageFields = [
    {
      name: 'name',
      label: 'Contact Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'contact@example.com'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: '+93 xxx xxx xxx'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      required: true,
      placeholder: 'Brief subject line'
    },
    {
      name: 'message',
      label: 'Message Content',
      type: 'textarea',
      required: true,
      rows: 8,
      placeholder: 'Write the message content here...',
      fullWidth: true
    },
    {
      name: 'category',
      label: 'Message Category',
      type: 'select',
      options: categories?.results?.map(cat => ({
        value: cat.id,
        label: cat.name
      })) || []
    },
    {
      name: 'status',
      label: 'Message Status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { value: 'new', label: 'New - Unread message' },
        { value: 'read', label: 'Read - Message has been read' },
        { value: 'replied', label: 'Replied - Response sent' },
        { value: 'closed', label: 'Closed - Issue resolved' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority Level',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: [
        { value: 'low', label: 'Low - General inquiry' },
        { value: 'medium', label: 'Medium - Standard request' },
        { value: 'high', label: 'High - Important matter' },
        { value: 'urgent', label: 'Urgent - Requires immediate attention' }
      ]
    },
    {
      name: 'admin_notes',
      label: 'Admin Notes',
      type: 'textarea',
      rows: 4,
      placeholder: 'Internal notes for admin team...',
      fullWidth: true
    },
    {
      name: 'reply_message',
      label: 'Reply Message',
      type: 'textarea',
      rows: 6,
      placeholder: 'Response to send to the contact...',
      fullWidth: true
    },
    {
      name: 'replied_at',
      label: 'Reply Date',
      type: 'datetime-local'
    }
  ]

  const infoFields = [
    {
      name: 'contact_type',
      label: 'Contact Type',
      type: 'select',
      required: true,
      options: [
        { value: 'office', label: 'Office Contact' },
        { value: 'emergency', label: 'Emergency Contact' },
        { value: 'media', label: 'Media Contact' },
        { value: 'general', label: 'General Contact' }
      ]
    },
    {
      name: 'title',
      label: 'Contact Title',
      type: 'text',
      required: true,
      placeholder: 'e.g., Main Office, Media Relations'
    },
    {
      name: 'address',
      label: 'Physical Address',
      type: 'textarea',
      rows: 3,
      placeholder: 'Complete address including city and country',
      fullWidth: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: '+93 xxx xxx xxx'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'contact@acn.com'
    },
    {
      name: 'office_hours',
      label: 'Office Hours',
      type: 'text',
      placeholder: 'Sunday - Thursday: 8:00 AM - 5:00 PM'
    },
    {
      name: 'is_active',
      label: 'Active Contact',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      min: 0,
      help: 'Lower numbers appear first'
    }
  ]

  return (
    <AdminLayout title={`Edit ${type === 'info' ? 'Contact Information' : 'Contact Message'}`}>
      <CrudForm
        endpoint={type === 'info' ? '/contact-info' : '/contacts'}
        fields={type === 'info' ? infoFields : messageFields}
        title={type === 'info' ? 'Contact Information' : 'Contact Message'}
        backPath="/admin/contact/"
        itemId={id}
      />
    </AdminLayout>
  )
}