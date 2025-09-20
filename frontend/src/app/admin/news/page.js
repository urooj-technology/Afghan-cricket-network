'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useFetchData, useDelete } from '../../../hooks'
import usePagination from '../../../hooks/usePagination'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function NewsAdmin() {
  const router = useRouter()
  const { language, isRTL, direction } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  // Fetch news with pagination, search, and filters
  const filters = useMemo(() => ({
    ...(filterStatus && { status: filterStatus }),
  }), [filterStatus])

  const {
    data: news,
    pagination,
    isLoading,
    error,
    refetch,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination('/news', {
    search: searchTerm,
    filters,
    ordering: '-created_at',
    pageSize: 10
  })

  // Fetch stats
  const { data: stats } = useFetchData('/news', {
    queryKey: ['news', 'stats'],
    params: { page_size: 1000 }
  })

  const deleteNews = useDelete('/news', {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error('Delete failed:', error)
    }
  })

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm(getTranslation(language, 'admin.common.confirm'))) {
      deleteNews.mutate(id)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleFilterChange = (value) => {
    setFilterStatus(value)
    resetPage()
  }

  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      draft: 'bg-amber-100 text-amber-700 border-amber-200',
      archived: 'bg-slate-100 text-slate-700 border-slate-200'
    }
    return styles[status] || styles.draft
  }

  const statsData = useMemo(() => {
    if (!stats?.results) return []
    const allNews = stats.results
    return [
      { key: 'totalArticles', value: allNews.length, icon: ChartBarIcon, color: 'blue', change: '+12%' },
      { key: 'published', value: allNews.filter(n => n.status === 'published').length, icon: EyeIcon, color: 'emerald', change: '+8%' },
      { key: 'draft', value: allNews.filter(n => n.status === 'draft').length, icon: PencilIcon, color: 'amber', change: '+3' },
      { key: 'totalViews', value: allNews.reduce((sum, n) => sum + n.views, 0).toLocaleString(), icon: ClockIcon, color: 'purple', change: '+24%' }
    ]
  }, [stats])

  return (
    <AdminLayout title={getTranslation(language, 'admin.news.title')}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">{getTranslation(language, 'admin.news.title')}</h1>
            <p className="text-gray-600">{getTranslation(language, 'admin.news.subtitle')}</p>
          </div>
          <Link
            href="/admin/news/add"
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {getTranslation(language, 'admin.news.create')}
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={stat.key} className="glass rounded-2xl p-6 hover-glow group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {getTranslation(language, `admin.dashboard.stats.${stat.key}`)}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={getTranslation(language, 'admin.common.search') + '...'}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="form-input bg-white/50 min-w-[120px]"
              >
                <option value="">{getTranslation(language, 'admin.common.filter')} - All</option>
                <option value="published">{getTranslation(language, 'admin.news.publish')}</option>
                <option value="draft">{getTranslation(language, 'admin.news.draft')}</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <p className="text-red-600">Error loading news: {error.message}</p>
          <button onClick={refetch} className="mt-2 btn-primary">Retry</button>
        </div>
      )}

      {/* Articles Grid */}
      {!isLoading && !error && (
        <div className="space-y-6">
          {news.map((article) => (
            <div key={article.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      {article.is_featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border border-orange-200">
                          {getTranslation(language, 'admin.news.featured')}
                        </span>
                      )}
                    </div>
                    <span className={`badge ${getStatusBadge(article.status)} ml-3`}>
                      {article.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      <span>{article.views.toLocaleString()} {getTranslation(language, 'admin.news.views')}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{article.category_name}</span>
                    <span>{getTranslation(language, 'admin.news.author')}: {article.author_name}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/admin/news/edit/${article.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover-lift"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    {getTranslation(language, 'admin.common.edit')}
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 hover-lift"
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    {getTranslation(language, 'admin.common.delete')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 p-6 bg-white rounded-xl border">
          <div className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.count)} of {pagination.count} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousPage}
              disabled={!pagination.hasPrevious}
              className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    page === pagination.currentPage
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={nextPage}
              disabled={!pagination.hasNext}
              className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && news.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <EyeIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus ? 'No articles found' : 'No articles yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Get started by creating your first news article to engage your audience.'}
          </p>
          <Link
            href="/admin/news/add"
            className="btn-primary hover-lift inline-flex items-center"
          >
            <PlusIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {getTranslation(language, 'admin.news.create')}
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}