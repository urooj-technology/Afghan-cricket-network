'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../contexts/LanguageContext'
import { getTranslation } from '../../../../lib/translations'
import AdminLayout from '../../../../components/admin/AdminLayout'
import { ArrowLeftIcon, TrophyIcon, UserIcon, HashtagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AddRanking() {
  const router = useRouter()
  const { language, isRTL, direction } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    playerName: '',
    position: '',
    points: '',
    matches: '',
    category: 'batting',
    team: 'Afghanistan'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/admin/rankings')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AdminLayout title={getTranslation(language, 'admin.common.add') + ' ' + getTranslation(language, 'rankings.title')}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              href="/admin/rankings"
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isRTL ? 'ml-3' : 'mr-3'}`}
            >
              <ArrowLeftIcon className={`w-5 h-5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <h1 className="text-3xl font-bold gradient-text">
              {getTranslation(language, 'admin.common.add')} {getTranslation(language, 'rankings.title')}
            </h1>
          </div>
          <p className="text-gray-600">
            Add player ranking information
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  <UserIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {getTranslation(language, 'rankings.name')}
                </label>
                <input
                  type="text"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  className="form-input"
                  dir={direction}
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  <HashtagIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {getTranslation(language, 'rankings.position')}
                </label>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  <TrophyIcon className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {getTranslation(language, 'rankings.points')}
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  {getTranslation(language, 'rankings.matches')}
                </label>
                <input
                  type="number"
                  name="matches"
                  value={formData.matches}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
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
                  <option value="batting">{getTranslation(language, 'rankings.batting')}</option>
                  <option value="bowling">{getTranslation(language, 'rankings.bowling')}</option>
                  <option value="allRounder">{getTranslation(language, 'rankings.allRounder')}</option>
                </select>
              </div>

              <div>
                <label className="form-label">
                  Team
                </label>
                <select
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="England">England</option>
                  <option value="Australia">Australia</option>
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
                href="/admin/rankings"
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