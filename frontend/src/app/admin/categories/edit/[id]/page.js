'use client'

import { useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'

export default function EditCategory() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { id } = params
  const type = searchParams.get('type') || 'news'

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const getEndpoint = () => {
    switch (type) {
      case 'news': return '/news-categories'
      case 'event': return '/event-categories'
      case 'media': return '/media-categories'
      case 'ranking': return '/ranking-categories'
      case 'contact': return '/contact-categories'
      default: return '/news-categories'
    }
  }

  const getFields = () => {
    const baseFields = [
      {
        name: 'name',
        label: 'Category Name',
        type: 'text',
        required: true,
        placeholder: `Enter ${type} category name`,
        help: `Name for the ${type} category`,
        section: 'Basic Information'
      }
    ]

    if (type !== 'contact') {
      baseFields.push({
        name: 'slug',
        label: 'URL Slug',
        type: 'text',
        required: true,
        placeholder: 'category-slug',
        help: 'URL-friendly version of the name',
        section: 'Basic Information'
      })
    }

    baseFields.push({
      name: 'is_active',
      label: 'Active Status',
      type: 'checkbox',
      help: 'Inactive categories are hidden from public view',
      section: 'Settings'
    })

    return baseFields
  }

  const getCategoryTitle = () => {
    switch (type) {
      case 'news': return 'News Category'
      case 'event': return 'Event Category'
      case 'media': return 'Media Category'
      case 'ranking': return 'Ranking Category'
      case 'contact': return 'Contact Category'
      default: return 'Category'
    }
  }

  return (
    <AdminLayout title={`Edit ${getCategoryTitle()}`}>
      <CrudForm
        endpoint={getEndpoint()}
        fields={getFields()}
        title={getCategoryTitle()}
        backPath="/admin/categories/"
        itemId={id}
      />
    </AdminLayout>
  )
}