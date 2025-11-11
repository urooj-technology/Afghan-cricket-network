'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'

export default function AboutTeamAdmin() {
  const router = useRouter()
  const { language } = useLanguage()

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const columns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'position', label: 'Position', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'boolean' }
  ]

  const filterFields = [
    {
      key: 'is_active',
      label: 'Status',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ]
    }
  ]

  return (
    <AdminLayout title={getTranslation(language, 'admin.aboutTeam.title') || 'About Team Management'}>
      <CrudTable
        endpoint="/about-team/"
        title="About Team Members"
        columns={columns}
        searchFields={['name', 'position']}
        filterFields={filterFields}
        addPath="/admin/about-team/add/"
        editPath="/admin/about-team/edit/:id/"
      />
    </AdminLayout>
  )
}
