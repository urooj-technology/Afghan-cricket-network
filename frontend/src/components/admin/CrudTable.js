'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData, useDelete } from '../../hooks'
import usePagination from '../../hooks/usePagination'
import ConfirmDialog from '../ui/ConfirmDialog'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function CrudTable({ 
  endpoint, 
  title, 
  columns, 
  searchFields = [], 
  filterFields = [],
  addPath,
  editPath,
  viewPath,
  onDelete,
  renderCell,
  stats = []
}) {
  const { language, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, itemId: null })
  
  // Fetch data with pagination
  const {
    data: items,
    pagination,
    isLoading,
    error,
    refetch,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination(endpoint, {
    search: searchTerm,
    filters,
    ordering: '-created_at',
    pageSize: 10
  })

  // Delete mutation
  const deleteItem = useDelete(endpoint, {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error('Delete failed:', error)
    }
  })

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, itemId: id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.itemId) {
      deleteItem.mutate(deleteConfirm.itemId)
      setDeleteConfirm({ isOpen: false, itemId: null })
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, itemId: null })
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    resetPage()
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value || undefined
    }))
    resetPage()
  }

  const defaultRenderCell = (item, column) => {
    const value = item[column.key]
    
    if (column.type === 'boolean') {
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    }
    
    if (column.type === 'status') {
      const statusColors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        published: 'bg-green-100 text-green-800',
        draft: 'bg-yellow-100 text-yellow-800',
        archived: 'bg-gray-100 text-gray-800',
        new: 'bg-blue-100 text-blue-800',
        read: 'bg-gray-100 text-gray-800',
        replied: 'bg-green-100 text-green-800',
        closed: 'bg-red-100 text-red-800'
      }
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[value] || 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString()
    }
    
    if (column.type === 'number') {
      return value?.toLocaleString() || '0'
    }
    
    return value || '-'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
          <p className="text-gray-600">Manage your {title.toLowerCase()}</p>
        </div>
        {addPath && (
          <Link
            href={addPath}
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New
          </Link>
        )}
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 hover-glow group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  {stat.change && (
                    <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
                  )}
                </div>
                {stat.icon && (
                  <div className={`p-3 rounded-xl bg-${stat.color || 'blue'}-50 group-hover:bg-${stat.color || 'blue'}-100 transition-colors`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color || 'blue'}-600`} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters and Search */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400`} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 ${isRTL ? 'pr-12 pl-4 text-right font-arabic' : 'pl-12 pr-4'}`}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {filterFields.map((field) => (
              <div key={field.key} className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={filters[field.key] || ''}
                  onChange={(e) => handleFilterChange(field.key, e.target.value)}
                  className="form-input bg-white/50 min-w-[120px]"
                >
                  <option value="">{field.label} - All</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
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
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600">Error loading data: {error.message}</p>
          <button onClick={refetch} className="mt-2 btn-primary">Retry</button>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {renderCell ? renderCell(item, column) : defaultRenderCell(item, column)}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {viewPath && (
                          <Link
                            href={viewPath.replace(':id', item.id)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Link>
                        )}
                        {editPath && (
                          <Link
                            href={editPath.replace(':id', item.id)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          disabled={deleteItem.isPending}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between p-6 bg-white rounded-xl border">
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
            {(() => {
              const current = pagination.currentPage
              const total = pagination.totalPages
              const pages = []
              
              if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                  pages.push(i)
                }
              } else {
                if (current <= 4) {
                  pages.push(1, 2, 3, 4, 5, '...', total)
                } else if (current >= total - 3) {
                  pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
                } else {
                  pages.push(1, '...', current - 1, current, current + 1, '...', total)
                }
              }
              
              return pages.map((page, index) => (
                page === '...' ? (
                  <span key={index} className="px-3 py-2 text-sm text-gray-500">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 text-sm border rounded-lg ${
                      page === current
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))
            })()}
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
      {!isLoading && !error && items.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ChartBarIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || Object.keys(filters).length ? 'No items found' : `No ${title.toLowerCase()} yet`}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || Object.keys(filters).length 
              ? 'Try adjusting your search or filter criteria.' 
              : `Get started by creating your first ${title.toLowerCase().slice(0, -1)}.`}
          </p>
          {addPath && (
            <Link
              href={addPath}
              className="btn-primary hover-lift inline-flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add New
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isLoading={deleteItem.isPending}
        type="danger"
      />
    </div>
  )
}