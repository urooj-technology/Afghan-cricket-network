'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

export default function ContactAdmin() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('messages')

  // Fetch stats
  const { data: contactStats } = useFetchData('/contacts', {
    queryKey: ['contacts', 'stats'],
    params: { page_size: 1000 }
  })
  
  const { data: infoStats } = useFetchData('/contact-info', {
    queryKey: ['contact-info', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const contactColumns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'subject', label: 'Subject', type: 'text' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'priority', label: 'Priority', type: 'status' },
    { key: 'created_at', label: 'Date', type: 'date' }
  ]

  const infoColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'contact_type', label: 'Type', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
    { key: 'order', label: 'Order', type: 'number' }
  ]

  const contactFilterFields = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'new', label: 'New' },
        { value: 'read', label: 'Read' },
        { value: 'replied', label: 'Replied' },
        { value: 'closed', label: 'Closed' }
      ]
    },
    {
      key: 'priority',
      label: 'Priority',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ]
    }
  ]

  const infoFilterFields = [
    {
      key: 'contact_type',
      label: 'Type',
      options: [
        { value: 'office', label: 'Office' },
        { value: 'emergency', label: 'Emergency' },
        { value: 'media', label: 'Media' },
        { value: 'general', label: 'General' }
      ]
    }
  ]

  const contactStatsData = useMemo(() => {
    if (!contactStats?.results) return []
    const contacts = contactStats.results
    return [
      { label: 'Total Messages', value: contacts.length, icon: EnvelopeIcon, color: 'blue' },
      { label: 'New Messages', value: contacts.filter(c => c.status === 'new').length, icon: InformationCircleIcon, color: 'green' },
      { label: 'Urgent', value: contacts.filter(c => c.priority === 'urgent').length, icon: ExclamationTriangleIcon, color: 'red' },
      { label: 'Replied', value: contacts.filter(c => c.status === 'replied').length, icon: CheckCircleIcon, color: 'purple' }
    ]
  }, [contactStats])

  const infoStatsData = useMemo(() => {
    if (!infoStats?.results) return []
    const info = infoStats.results
    return [
      { label: 'Total Info', value: info.length, icon: InformationCircleIcon, color: 'blue' },
      { label: 'Active', value: info.filter(i => i.is_active).length, icon: CheckCircleIcon, color: 'green' },
      { label: 'Office Contacts', value: info.filter(i => i.contact_type === 'office').length, icon: PhoneIcon, color: 'yellow' },
      { label: 'Emergency Contacts', value: info.filter(i => i.contact_type === 'emergency').length, icon: ExclamationTriangleIcon, color: 'red' }
    ]
  }, [infoStats])

  const tabs = [
    { id: 'messages', name: 'Contact Messages', icon: EnvelopeIcon },
    { id: 'info', name: 'Contact Information', icon: InformationCircleIcon }
  ]

  return (
    <AdminLayout title="Contact Management">
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className={`mr-2 h-5 w-5 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contact Messages Tab */}
      {activeTab === 'messages' && (
        <CrudTable
          endpoint="/contacts/"
          title="Contact Messages"
          columns={contactColumns}
          searchFields={['name', 'email', 'subject', 'message']}
          filterFields={contactFilterFields}
          addPath="/admin/contact/add/"
          editPath="/admin/contact/edit/:id/"
          stats={contactStatsData}
        />
      )}

      {/* Contact Information Tab */}
      {activeTab === 'info' && (
        <CrudTable
          endpoint="/contact-info/"
          title="Contact Information"
          columns={infoColumns}
          searchFields={['title', 'address']}
          filterFields={infoFilterFields}
          addPath="/admin/contact/add/"
          editPath="/admin/contact/edit/:id/"
          stats={infoStatsData}
        />
      )}
    </AdminLayout>
  )
}