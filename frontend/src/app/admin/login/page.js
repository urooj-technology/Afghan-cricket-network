'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAuth()
  const { language, isRTL, direction } = useLanguage()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin/dashboard')
    }
  }, [isAuthenticated, isLoading])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = getTranslation(language, 'admin.login.emailRequired')
    }
    
    if (!formData.password) {
      newErrors.password = getTranslation(language, 'admin.login.passwordRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })
    
    try {
      const result = await login(formData)
      
      if (result.success) {
        setMessage({ type: 'success', text: getTranslation(language, 'admin.login.loginSuccess') })
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 500)
      } else {
        setMessage({ type: 'error', text: result.error || getTranslation(language, 'admin.login.loginFailed') })
      }
    } catch (error) {
      setMessage({ type: 'error', text: getTranslation(language, 'admin.login.loginFailed') })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 text-center ${isRTL ? 'font-arabic' : ''}`}>
            {getTranslation(language, 'admin.login.title')}
          </h1>
          <p className={`text-gray-600 text-center ${isRTL ? 'font-arabic' : ''}`}>
            {getTranslation(language, 'admin.login.subtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} ${isRTL ? 'font-arabic' : ''}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {getTranslation(language, 'admin.login.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${isRTL ? 'font-arabic' : ''}`}
                placeholder={getTranslation(language, 'admin.login.emailPlaceholder')}
              />
              {errors.email && (
                <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'font-arabic' : ''}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                {getTranslation(language, 'admin.login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  dir={isRTL ? 'rtl' : 'ltr'}
                  style={{ textAlign: isRTL ? 'right' : 'left', paddingRight: isRTL ? '1rem' : '3.5rem', paddingLeft: isRTL ? '3.5rem' : '1rem' }}
                  className={`w-full py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${isRTL ? 'font-arabic' : ''}`}
                  placeholder={getTranslation(language, 'admin.login.passwordPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${isRTL ? 'left-4' : 'right-4'}`}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={`mt-1 text-sm text-red-600 ${isRTL ? 'font-arabic' : ''}`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ textAlign: 'center' }}
              className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 ${isRTL ? 'font-arabic' : ''}`}
            >
              {isSubmitting ? getTranslation(language, 'admin.login.signingIn') : getTranslation(language, 'admin.login.signIn')}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-6">
          <Link href="/" className={`flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium ${isRTL ? 'font-arabic' : ''}`}>
            <HomeIcon className="w-5 h-5" />
            <span>{getTranslation(language, 'admin.login.goHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}