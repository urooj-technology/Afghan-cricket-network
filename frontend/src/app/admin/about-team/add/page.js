'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import CrudForm from '../../../../components/admin/CrudForm'

export default function AddAboutTeamMember() {
  const router = useRouter()
  const { language } = useLanguage()

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter name'
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      placeholder: 'member-slug',
      help: 'URL-friendly version of the name'
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      placeholder: 'Job position/title'
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'file',
      accept: 'image/*'
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      rows: 4,
      placeholder: 'Member biography',
      fullWidth: true
    },
    {
      name: 'is_active',
      label: 'Active',
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
    <AdminLayout title="Add Team Member">
      <CrudForm
        endpoint="/about-team/"
        fields={fields}
        title="Team Member"
        backPath="/admin/about-team/"
      />
    </AdminLayout>
  )
}
