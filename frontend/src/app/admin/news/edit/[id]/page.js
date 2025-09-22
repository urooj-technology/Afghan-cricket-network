'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useLanguage } from '../../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../../lib/translations'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../../hooks'

export default function EditNews() {
  const router = useRouter()
  const params = useParams()
  const { language } = useLanguage()
  const { id } = params

  // Fetch categories for dropdown
  const { data: categories } = useFetchData('/news-categories')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const fields = [
    // Basic Information
    {
      name: 'title',
      label: 'Article Title',
      type: 'text',
      required: true,
      placeholder: 'Enter compelling news title',
      help: 'Keep it under 200 characters for better SEO'
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'news-article-slug',
      help: 'URL-friendly version (auto-generated from title if empty)'
    },
    {
      name: 'excerpt',
      label: 'Article Summary',
      type: 'textarea',
      required: true,
      rows: 3,
      placeholder: 'Write a compelling summary (max 500 characters)',
      help: 'This appears in article previews and social media shares'
    },
    {
      name: 'content',
      label: 'Article Content',
      type: 'textarea',
      required: true,
      rows: 15,
      placeholder: 'Write the full article content here...',
      fullWidth: true,
      help: 'Use markdown formatting for better presentation'
    },
    
    // Media
    {
      name: 'image',
      label: 'Featured Image',
      type: 'file',
      accept: 'image/*',
      help: 'Recommended size: 1200x630px for social media optimization'
    },
    
    // Classification
    {
      name: 'category',
      label: 'News Category',
      type: 'select',
      required: true,
      options: categories?.results?.map(cat => ({
        value: cat.id,
        label: cat.name
      })) || [],
      help: 'Select the most relevant category'
    },
    
    // Publishing Options
    {
      name: 'status',
      label: 'Publication Status',
      type: 'select',
      required: true,
      options: [
        { value: 'draft', label: 'Draft - Not visible to public' },
        { value: 'published', label: 'Published - Live on website' },
        { value: 'archived', label: 'Archived - Hidden from main listings' }
      ]
    },
    {
      name: 'published_at',
      label: 'Publish Date & Time',
      type: 'datetime-local',
      help: 'Schedule publication or leave empty to publish immediately'
    },
    
    // Features
    {
      name: 'is_featured',
      label: 'Featured Article',
      type: 'checkbox',
      help: 'Featured articles appear prominently on homepage and category pages'
    },
    
    // Metadata
    {
      name: 'views',
      label: 'View Count',
      type: 'number',
      defaultValue: 0,
      help: 'Number of times this article has been viewed'
    }
  ]

  return (
    <AdminLayout title="Edit News Article">
      <CrudForm
        endpoint="/news/"
        fields={fields}
        title="News Article"
        backPath="/admin/news/"
        itemId={id}
        onSuccess={(data) => {
          console.log('News article updated:', data)
        }}
        onError={(error) => {
          console.error('Failed to update news article:', error)
        }}
      />
    </AdminLayout>
  )
}