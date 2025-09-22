'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  TagIcon,
  CalendarDaysIcon,
  PhotoIcon,
  TrophyIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

export default function CategoriesAdmin() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('news')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const columns = [
    { key: 'name', label: getTranslation(language, 'admin.common.name'), type: 'text' },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'is_active', label: getTranslation(language, 'admin.common.active'), type: 'boolean' },
    { key: 'created_at', label: getTranslation(language, 'admin.common.created'), type: 'date' }
  ]

  const tabs = [
    { id: 'news', name: getTranslation(language, 'admin.categories.news'), icon: TagIcon },
    { id: 'events', name: getTranslation(language, 'admin.categories.events'), icon: CalendarDaysIcon },
    { id: 'media', name: getTranslation(language, 'admin.categories.media'), icon: PhotoIcon },
    { id: 'rankings', name: getTranslation(language, 'admin.categories.rankings'), icon: TrophyIcon },
    { id: 'contact', name: getTranslation(language, 'admin.categories.contact'), icon: EnvelopeIcon }
  ]

  return (
    <AdminLayout title={getTranslation(language, 'admin.categories.title')}>
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

      {activeTab === 'news' && (
        <CrudTable
          endpoint="/news-categories/"
          title={getTranslation(language, 'admin.categories.news')}
          columns={columns}
          searchFields={['name']}
          filterFields={[]}
          addPath="/admin/categories/add?type=news/"
          editPath="/admin/categories/edit/:id?type=news/"
        />
      )}

      {activeTab === 'events' && (
        <CrudTable
          endpoint="/event-categories/"
          title={getTranslation(language, 'admin.categories.events')}
          columns={columns}
          searchFields={['name']}
          filterFields={[]}
          addPath="/admin/categories/add?type=event/"
          editPath="/admin/categories/edit/:id?type=event/"
        />
      )}

      {activeTab === 'media' && (
        <CrudTable
          endpoint="/media-categories/"
          title={getTranslation(language, 'admin.categories.media')}
          columns={columns}
          searchFields={['name']}
          filterFields={[]}
          addPath="/admin/categories/add?type=media/"
          editPath="/admin/categories/edit/:id?type=media/"
        />
      )}

      {activeTab === 'rankings' && (
        <CrudTable
          endpoint="/ranking-categories/"
          title={getTranslation(language, 'admin.categories.rankings')}
          columns={columns}
          searchFields={['name']}
          filterFields={[]}
          addPath="/admin/categories/add?type=ranking/"
          editPath="/admin/categories/edit/:id?type=ranking/"
        />
      )}

      {activeTab === 'contact' && (
        <CrudTable
          endpoint="/contact-categories/"
          title={getTranslation(language, 'admin.categories.contact')}
          columns={[
            { key: 'name', label: getTranslation(language, 'admin.common.name'), type: 'text' },
            { key: 'is_active', label: getTranslation(language, 'admin.common.active'), type: 'boolean' },
            { key: 'created_at', label: getTranslation(language, 'admin.common.created'), type: 'date' }
          ]}
          searchFields={['name']}
          filterFields={[]}
          addPath="/admin/categories/add?type=contact/"
          editPath="/admin/categories/edit/:id?type=contact/"
        />
      )}
    </AdminLayout>
  )
}