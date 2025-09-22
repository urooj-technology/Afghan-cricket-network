'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import CrudForm from '../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../hooks'

export default function AddMedia() {
  const router = useRouter()
  const { language } = useLanguage()
  const [mediaType, setMediaType] = useState('media')

  // Fetch media categories for dropdown
  const { data: categories } = useFetchData('/media-categories')
  const { data: mediaItems } = useFetchData('/media')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const mediaFields = [
    {
      name: 'title',
      label: 'Media Title',
      type: 'text',
      required: true,
      placeholder: 'Enter media title'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      placeholder: 'media-slug',
      help: 'URL-friendly version of the title'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 4,
      placeholder: 'Media description',
      fullWidth: true
    },
    {
      name: 'media_type',
      label: 'Media Type',
      type: 'select',
      required: true,
      options: [
        { value: 'photo', label: 'Photo' },
        { value: 'video', label: 'Video' },
        { value: 'gallery', label: 'Gallery' },
        { value: 'document', label: 'Document' }
      ]
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'matches', label: 'Matches' },
        { value: 'events', label: 'Events' },
        { value: 'training', label: 'Training' },
        { value: 'awards', label: 'Awards' },
        { value: 'behind_scenes', label: 'Behind the Scenes' },
        { value: 'interviews', label: 'Interviews' }
      ]
    },
    {
      name: 'media_category',
      label: 'Media Category',
      type: 'select',
      options: categories?.results?.map(cat => ({
        value: cat.id,
        label: cat.name
      })) || []
    },
    {
      name: 'file',
      label: 'Media File',
      type: 'file',
      help: 'Upload the main media file'
    },
    {
      name: 'image',
      label: 'Image/Thumbnail',
      type: 'file',
      accept: 'image/*',
      help: 'Upload image or thumbnail'
    },
    {
      name: 'thumbnail',
      label: 'Custom Thumbnail',
      type: 'file',
      accept: 'image/*',
      help: 'Upload custom thumbnail (optional)'
    },
    {
      name: 'url',
      label: 'External URL',
      type: 'url',
      placeholder: 'https://example.com',
      help: 'External link to media content'
    },
    {
      name: 'youtube_url',
      label: 'YouTube URL',
      type: 'url',
      placeholder: 'https://youtube.com/watch?v=...',
      help: 'YouTube video URL'
    },
    {
      name: 'file_size',
      label: 'File Size (bytes)',
      type: 'number',
      min: 0,
      help: 'File size in bytes (auto-calculated for uploads)'
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text',
      placeholder: '00:05:30',
      help: 'Duration for video/audio files (HH:MM:SS)'
    },
    {
      name: 'views',
      label: 'Views',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'is_featured',
      label: 'Featured',
      type: 'checkbox',
      help: 'Mark as featured to highlight'
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'published_at',
      label: 'Publish Date',
      type: 'datetime-local',
      help: 'Leave empty to publish immediately'
    }
  ]

  const galleryFields = [
    {
      name: 'name',
      label: 'Gallery Name',
      type: 'text',
      required: true,
      placeholder: 'Enter gallery name'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      placeholder: 'gallery-slug',
      help: 'URL-friendly version of the name'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      rows: 4,
      placeholder: 'Gallery description',
      fullWidth: true
    },
    {
      name: 'cover_image',
      label: 'Cover Image',
      type: 'file',
      accept: 'image/*',
      help: 'Upload a cover image for the gallery'
    },
    {
      name: 'is_featured',
      label: 'Featured Gallery',
      type: 'checkbox',
      help: 'Mark as featured to highlight'
    },
    {
      name: 'is_published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      min: 0
    }
  ]

  return (
    <AdminLayout title={`Add ${mediaType === 'media' ? 'Media' : 'Gallery'}`}>
      {/* Type Selector */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setMediaType('media')}
            className={`px-4 py-2 rounded-lg font-medium ${
              mediaType === 'media'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Media
          </button>
          <button
            onClick={() => setMediaType('gallery')}
            className={`px-4 py-2 rounded-lg font-medium ${
              mediaType === 'gallery'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add Gallery
          </button>
        </div>
      </div>

      <CrudForm
        endpoint={mediaType === 'media' ? '/media/' : '/media-galleries/'}
        fields={mediaType === 'media' ? mediaFields : galleryFields}
        title={mediaType === 'media' ? 'Media' : 'Gallery'}
        backPath="/admin/media/"
        onSuccess={(data) => {
          console.log(`${mediaType} created:`, data)
        }}
        onError={(error) => {
          console.error(`Failed to create ${mediaType}:`, error)
        }}
      />
    </AdminLayout>
  )
}