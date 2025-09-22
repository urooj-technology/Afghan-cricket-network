'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../../hooks'

export default function EditMedia() {
  const router = useRouter()
  const params = useParams()
  const { language } = useLanguage()
  const { id } = params
  const [mediaType, setMediaType] = useState('media')

  const { data: categories } = useFetchData('/media-categories')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  // Check if media exists
  const { data: mediaData, isLoading: loadingMedia, error: mediaError } = useFetchData(
    `/media/${id}`,
    {
      enabled: !!id,
      queryKey: ['media', id]
    }
  )

  if (loadingMedia) {
    return (
      <AdminLayout title="Edit Media">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (mediaError || !mediaData) {
    return (
      <AdminLayout title="Edit Media">
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Media Not Found</h3>
          <p className="text-gray-600 mb-6">The media item you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/admin/media/')}
            className="btn-primary"
          >
            Back to Media
          </button>
        </div>
      </AdminLayout>
    )
  }

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

  return (
    <AdminLayout title="Edit Media">
      <CrudForm
        endpoint="/media/"
        fields={mediaFields}
        title="Media"
        backPath="/admin/media/"
        itemId={id}
        onSuccess={(data) => {
          console.log('Media updated:', data)
        }}
        onError={(error) => {
          console.error('Failed to update media:', error)
        }}
      />
    </AdminLayout>
  )
}