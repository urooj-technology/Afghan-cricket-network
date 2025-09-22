'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  EyeIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

export default function MediaAdmin() {
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('media')

  // Fetch stats
  const { data: mediaStats } = useFetchData('/media', {
    queryKey: ['media', 'stats'],
    params: { page_size: 1000 }
  })
  
  const { data: galleryStats } = useFetchData('/media-galleries', {
    queryKey: ['media-galleries', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const mediaColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'media_type', label: 'Type', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'views', label: 'Views', type: 'number' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
    { key: 'is_published', label: 'Published', type: 'boolean' }
  ]

  const galleryColumns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'item_count', label: 'Items', type: 'number' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
    { key: 'is_published', label: 'Published', type: 'boolean' },
    { key: 'order', label: 'Order', type: 'number' }
  ]

  const mediaFilterFields = [
    {
      key: 'media_type',
      label: 'Type',
      options: [
        { value: 'photo', label: 'Photo' },
        { value: 'video', label: 'Video' },
        { value: 'gallery', label: 'Gallery' },
        { value: 'document', label: 'Document' }
      ]
    },
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'matches', label: 'Matches' },
        { value: 'events', label: 'Events' },
        { value: 'training', label: 'Training' },
        { value: 'awards', label: 'Awards' },
        { value: 'behind_scenes', label: 'Behind the Scenes' },
        { value: 'interviews', label: 'Interviews' }
      ]
    }
  ]

  const mediaStatsData = useMemo(() => {
    if (!mediaStats?.results) return []
    const media = mediaStats.results
    return [
      { label: 'Total Media', value: media.length, icon: PhotoIcon, color: 'blue' },
      { label: 'Photos', value: media.filter(m => m.media_type === 'photo').length, icon: PhotoIcon, color: 'green' },
      { label: 'Videos', value: media.filter(m => m.media_type === 'video').length, icon: VideoCameraIcon, color: 'red' },
      { label: 'Total Views', value: media.reduce((sum, m) => sum + (m.views || 0), 0).toLocaleString(), icon: EyeIcon, color: 'purple' }
    ]
  }, [mediaStats])

  const galleryStatsData = useMemo(() => {
    if (!galleryStats?.results) return []
    const galleries = galleryStats.results
    return [
      { label: 'Total Galleries', value: galleries.length, icon: FolderIcon, color: 'blue' },
      { label: 'Published', value: galleries.filter(g => g.is_published).length, icon: EyeIcon, color: 'green' },
      { label: 'Featured', value: galleries.filter(g => g.is_featured).length, icon: PhotoIcon, color: 'yellow' },
      { label: 'Total Items', value: galleries.reduce((sum, g) => sum + (g.item_count || 0), 0), icon: DocumentIcon, color: 'purple' }
    ]
  }, [galleryStats])

  const tabs = [
    { id: 'media', name: 'Media Files', icon: PhotoIcon },
    { id: 'galleries', name: 'Galleries', icon: FolderIcon }
  ]

  return (
    <AdminLayout title="Media Management">
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

      {/* Media Tab */}
      {activeTab === 'media' && (
        <CrudTable
          endpoint="/media/"
          title="Media Files"
          columns={mediaColumns}
          searchFields={['title', 'description']}
          filterFields={mediaFilterFields}
          addPath="/admin/media/add/"
          editPath="/admin/media/edit/:id/"
          stats={mediaStatsData}
        />
      )}

      {/* Galleries Tab */}
      {activeTab === 'galleries' && (
        <CrudTable
          endpoint="/media-galleries/"
          title="Media Galleries"
          columns={galleryColumns}
          searchFields={['name', 'description']}
          filterFields={[]}
          addPath="/admin/media/add/"
          editPath="/admin/media/edit/:id/"
          stats={galleryStatsData}
        />
      )}
    </AdminLayout>
  )
}