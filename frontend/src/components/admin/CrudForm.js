'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useAdd, useEdit, useFetchData } from '../../hooks'
import { 
  CheckIcon, 
  XMarkIcon,
  PhotoIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'

export default function CrudForm({ 
  endpoint, 
  fields, 
  title, 
  backPath,
  itemId = null,
  onSuccess,
  onError
}) {
  const router = useRouter()
  const { language, isRTL } = useLanguage()
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const [showSuccess, setShowSuccess] = useState(false)

  const isEdit = !!itemId

  // Fetch existing data for edit
  const { data: existingData, isLoading: loadingData } = useFetchData(
    `${endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint}/${itemId}`,
    {
      enabled: isEdit,
      queryKey: [endpoint, itemId]
    }
  )

  // Mutations
  const addMutation = useAdd(endpoint, {
    onSuccess: (data) => {
      // Reset form on successful creation
      const initialData = {}
      fields.forEach(field => {
        initialData[field.name] = field.defaultValue || ''
      })
      setFormData(initialData)
      setErrors({})
      setShowSuccess(true)
      
      // Hide success message and redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onSuccess?.(data)
        router.push(backPath)
      }, 2000)
    },
    onError: (error) => {
      setErrors(error.response?.data || {})
      setShowSuccess(false)
      onError?.(error)
    }
  })

  const editMutation = useEdit(endpoint, {
    onSuccess: (data) => {
      setErrors({})
      setShowSuccess(true)
      
      // Hide success message and redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onSuccess?.(data)
        router.push(backPath)
      }, 2000)
    },
    onError: (error) => {
      setErrors(error.response?.data || {})
      setShowSuccess(false)
      onError?.(error)
    }
  })

  // Initialize form data
  useEffect(() => {
    if (isEdit && existingData) {
      const initialData = {}
      fields.forEach(field => {
        let value = existingData[field.name]
        if (field.type === 'select' && typeof value === 'object' && value?.id) {
          value = value.id
        }
        initialData[field.name] = value !== undefined && value !== null ? value : (field.defaultValue || '')
      })
      setFormData(initialData)
    } else if (!isEdit) {
      const initialData = {}
      fields.forEach(field => {
        initialData[field.name] = field.defaultValue || ''
      })
      setFormData(initialData)
    }
  }, [existingData, isEdit, fields])

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const handleFileUpload = async (name, file) => {
    setUploadingFiles(prev => ({ ...prev, [name]: true }))
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      // Handle file upload logic here
      // For now, just set the file object
      handleInputChange(name, file)
    } catch (error) {
      console.error('File upload failed:', error)
    } finally {
      setUploadingFiles(prev => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    // Validate required fields
    const validationErrors = {}
    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name]
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          validationErrors[field.name] = `${field.label} is required`
        }
      }
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Check if form has files
    const hasFiles = fields.some(field => field.type === 'file' && formData[field.name] instanceof File)
    
    let submitData
    if (hasFiles) {
      // Use FormData for file uploads
      submitData = new FormData()
      fields.forEach(field => {
        const value = formData[field.name]
        if (field.type === 'file' && value instanceof File) {
          submitData.append(field.name, value)
        } else if (field.type === 'checkbox') {
          submitData.append(field.name, value ? 'true' : 'false')
        } else if (value !== undefined && value !== null && value !== '') {
          submitData.append(field.name, value)
        }
      })
    } else {
      // Use regular object for non-file forms
      submitData = {}
      fields.forEach(field => {
        const value = formData[field.name]
        if (field.type === 'checkbox') {
          submitData[field.name] = value || false
        } else if (value !== undefined && value !== null && value !== '') {
          submitData[field.name] = value
        }
      })
    }

    if (isEdit) {
      editMutation.mutate({ id: itemId, data: submitData })
    } else {
      addMutation.mutate(submitData)
    }
  }

  const renderField = (field) => {
    const value = formData[field.name] || ''
    const error = errors[field.name]
    const isUploading = false

    const baseClasses = `form-input ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseClasses}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseClasses}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
          />
        )

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseClasses}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">{field.label}</label>
          </div>
        )

      case 'date':
      case 'datetime-local':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseClasses}
            required={field.required}
          />
        )

      case 'file':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {false ? (
                    <>
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                      <p className="text-sm text-blue-600 font-medium">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-blue-50 rounded-full mb-3">
                        {field.accept?.includes('image') ? (
                          <PhotoIcon className="w-8 h-8 text-blue-500" />
                        ) : (
                          <DocumentIcon className="w-8 h-8 text-blue-500" />
                        )}
                      </div>
                      <p className="mb-2 text-sm text-gray-700">
                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {field.accept?.includes('image') ? 'PNG, JPG, GIF up to 10MB' : field.accept || 'Any file type'}
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept={field.accept}
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setFormData(prev => ({
                        ...prev,
                        [field.name]: file
                      }))
                    }
                  }}
                  disabled={false}
                />
              </label>
            </div>
            {value && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckIcon className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-700 font-medium">
                  Selected: {value instanceof File ? value.name : value}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseClasses}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
    }
  }

  if (isEdit && loadingData) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          {isEdit ? `Edit ${title}` : `Add New ${title}`}
        </h1>
        <p className="text-gray-600">
          {isEdit ? `Update the ${title.toLowerCase()} information` : `Create a new ${title.toLowerCase()}`}
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckIcon className="w-5 h-5" />
          <span className="font-medium">
            {isEdit ? 'Successfully updated!' : 'Successfully created!'}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-8">
          {/* Group fields by sections if they have section property */}
          {fields.reduce((sections, field) => {
            const section = field.section || 'General Information'
            if (!sections[section]) sections[section] = []
            sections[section].push(field)
            return sections
          }, {}) && Object.entries(fields.reduce((sections, field) => {
            const section = field.section || 'General Information'
            if (!sections[section]) sections[section] = []
            sections[section].push(field)
            return sections
          }, {})).map(([sectionName, sectionFields]) => (
            <div key={sectionName} className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                {sectionName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sectionFields.map((field) => (
                  <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                    {errors[field.name] && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">{errors[field.name]}</p>
                      </div>
                    )}
                    {field.help && (
                      <p className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                        💡 {field.help}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push(backPath)}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 mr-2 inline" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={addMutation.isPending || editMutation.isPending}
            className="btn-primary hover-lift inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(addMutation.isPending || editMutation.isPending) ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <CheckIcon className="w-5 h-5 mr-2" />
            )}
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}