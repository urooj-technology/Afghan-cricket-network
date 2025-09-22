'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import CrudTable from '../../../components/admin/CrudTable'
import { useFetchData } from '../../../hooks'
import { 
  EyeIcon,
  PencilIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function NewsAdmin() {
  const router = useRouter()
  const { language } = useLanguage()

  // Fetch stats
  const { data: stats } = useFetchData('/news', {
    queryKey: ['news', 'stats'],
    params: { page_size: 1000 }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const columns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'category_name', label: 'Category', type: 'text' },
    { key: 'author_name', label: 'Author', type: 'text' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'views', label: 'Views', type: 'number' },
    { key: 'created_at', label: 'Created', type: 'date' }
  ]

  const filterFields = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' }
      ]
    }
  ]

  const statsData = useMemo(() => {
    if (!stats?.results) return []
    const allNews = stats.results
    return [
      { label: 'Total Articles', value: allNews.length, icon: ChartBarIcon, color: 'blue', change: '+12%' },
      { label: 'Published', value: allNews.filter(n => n.status === 'published').length, icon: EyeIcon, color: 'emerald', change: '+8%' },
      { label: 'Draft', value: allNews.filter(n => n.status === 'draft').length, icon: PencilIcon, color: 'amber', change: '+3' },
      { label: 'Total Views', value: allNews.reduce((sum, n) => sum + n.views, 0).toLocaleString(), icon: ClockIcon, color: 'purple', change: '+24%' }
    ]
  }, [stats])

  return (
    <AdminLayout title={getTranslation(language, 'admin.news.title')}>
      <CrudTable
        endpoint="/news/"
        title="News Articles"
        columns={columns}
        searchFields={['title', 'content', 'excerpt']}
        filterFields={filterFields}
        addPath="/admin/news/add/"
        editPath="/admin/news/edit/:id/"
        stats={statsData}
      />
    </AdminLayout>
  )
}