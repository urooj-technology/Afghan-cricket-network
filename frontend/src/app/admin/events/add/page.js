'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AddEvent() {
  const router = useRouter()
  const { language, isRTL, direction } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    teams: '',
    status: 'upcoming'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/admin/events')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AdminLayout title={getTranslation(language, 'admin.events.create')}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href="/admin/events"
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isRTL ? 'ml-3' : 'mr-3'}`}
            >
              <ArrowLeftIcon className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">
              {getTranslation(language, 'admin.events.create')}
            </h1>
          </div>
          <p className="text-gray-600">
            {getTranslation(language, 'admin.events.subtitle')}
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="form-label">
                  Event Title
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
                  <CalendarIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  <ClockIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  <MapPinIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="form-input"
                  dir={direction}
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Teams
                </label>
                <input
                  type="text"
                  name="teams"
                  value={formData.teams}
                  onChange={handleChange}
                  placeholder="e.g., Afghanistan vs Pakistan"
                  className="form-input"
                  dir={direction}
                  required
                />
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
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="upcoming">{getTranslation(language, 'admin.events.upcoming')}</option>
                  <option value="live">{getTranslation(language, 'admin.events.live')}</option>
                  <option value="completed">{getTranslation(language, 'admin.events.completed')}</option>
                  <option value="cancelled">{getTranslation(language, 'admin.events.cancelled')}</option>
                </select>
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
                href="/admin/events"
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