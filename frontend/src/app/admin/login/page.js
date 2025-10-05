'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 sm:px-6 lg:px-8" dir={direction}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className={`mt-6 text-3xl font-bold text-gray-900 text-center ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'admin.login.title')}</h2>
          <p className={`mt-2 text-sm text-gray-600 text-center ${isRTL ? 'font-arabic' : ''}`}>{getTranslation(language, 'admin.login.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {message.text && (
            <div className={`rounded-lg p-4 flex items-center space-x-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right font-arabic' : ''}`}>
                {getTranslation(language, 'admin.login.email')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full ${isRTL ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3'} py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isRTL ? 'font-arabic' : ''} ${
                    errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder={getTranslation(language, 'admin.login.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className={`mt-2 text-sm text-red-600 flex items-center ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                  <ExclamationCircleIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right font-arabic' : ''}`}>
                {getTranslation(language, 'admin.login.password')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full ${isRTL ? 'pr-10 pl-12 text-right' : 'pl-10 pr-12'} py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isRTL ? 'font-arabic' : ''} ${
                    errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder={getTranslation(language, 'admin.login.passwordPlaceholder')}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={`mt-2 text-sm text-red-600 flex items-center ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                  <ExclamationCircleIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${isRTL ? 'font-arabic' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white ${isRTL ? 'ml-2' : 'mr-2'}`}></div>
                  {getTranslation(language, 'admin.login.signingIn')}
                </div>
              ) : (
                getTranslation(language, 'admin.login.signIn')
              )}
            </button>
          </form>
        </div>

        <div className="text-center space-y-3">
          <Link 
            href="/"
            className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-200 hover:shadow-sm ${isRTL ? 'font-arabic' : ''}`}
          >
            <HomeIcon className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {getTranslation(language, 'admin.login.goHome')}
          </Link>
          <p className={`text-xs text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
            Afghan Cricket Network Admin Portal
          </p>
        </div>
      </div>
    </div>
  )
}