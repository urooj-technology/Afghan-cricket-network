'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import { ArrowLeftIcon, PhotoIcon, VideoCameraIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AddMedia() {
  const router = useRouter()
  const { language, isRTL, direction } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'photo',
    category: 'match',
    tags: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/admin/media')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AdminLayout title={getTranslation(language, 'admin.common.add') + ' Media'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href="/admin/media"
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isRTL ? 'ml-3' : 'mr-3'}`}
            >
              <ArrowLeftIcon className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">
              {getTranslation(language, 'admin.common.add')} Media
            </h1>
          </div>
          <p className="text-gray-600">
            Upload and manage photos and videos
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Media Files</h3>
              <p className="text-gray-600 mb-4">Drag and drop your files here, or click to browse</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="btn-primary cursor-pointer inline-flex items-center"
              >
                <CloudArrowUpIcon className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                Choose Files
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  dir={direction}
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="photo">
                    📷 {getTranslation(language, 'media.photos')}
                  </option>
                  <option value="video">
                    🎥 {getTranslation(language, 'media.videos')}
                  </option>
                </select>
              </div>

              <div>
                <label className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="match">Match</option>
                  <option value="training">Training</option>
                  <option value="event">Event</option>
                  <option value="team">Team</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="form-input"
                  dir={direction}
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="cricket, afghanistan, match, victory"
                  className="form-input"
                  dir={direction}
                />
              </div>
            </div>

            {/* Actions */}
            <div className={`flex gap-4 pt-6 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? getTranslation(language, 'admin.common.loading') : getTranslation(language, 'admin.common.save')}
              </button>
              <Link
                href="/admin/media"
                className="btn-secondary"
              >
                {getTranslation(language, 'admin.common.cancel')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}