'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { 
  HomeIcon, 
  NewspaperIcon, 
  CalendarDaysIcon, 
  TrophyIcon, 
  UsersIcon, 
  PhotoIcon, 
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const getNavigation = (language) => [
  { key: 'dashboard', href: '/admin/dashboard', icon: HomeIcon, badge: null },
  { key: 'news', href: '/admin/news', icon: NewspaperIcon, badge: '12' },
  { key: 'events', href: '/admin/events', icon: CalendarDaysIcon, badge: '3' },
  { key: 'rankings', href: '/admin/rankings', icon: TrophyIcon, badge: null },
  { key: 'team', href: '/admin/team', icon: UsersIcon, badge: '25' },
  { key: 'media', href: '/admin/media', icon: PhotoIcon, badge: '45' },
  { key: 'contact', href: '/admin/contact', icon: EnvelopeIcon, badge: '2' },
]

export default function AdminLayout({ children, title = 'Admin Panel' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage, isRTL, direction } = useLanguage()
  const navigation = getNavigation(language)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20" dir={direction}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20">
            {/* Mobile header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ACN</span>
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Admin</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Mobile navigation */}
            <nav className="mt-6 px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-white/80 hover:shadow-sm'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      {getTranslation(language, `admin.nav.${item.key}`)}
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl" dir={direction}>
          {/* Desktop header */}
          <div className="flex h-16 items-center px-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">ACN</span>
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Admin Panel</h2>
                <p className="text-xs text-gray-500">Cricket Network</p>
              </div>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="mt-6 flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-sm hover:transform hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    {getTranslation(language, `admin.nav.${item.key}`)}
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* User section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 mb-3">
              <UserCircleIcon className="h-8 w-8 text-gray-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@acn.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
              {getTranslation(language, 'admin.nav.logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72" dir={direction}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{title}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Manage your content efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Dropdown */}
              <div className="relative group">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Change Language">
                  <GlobeAltIcon className="h-5 w-5 text-gray-600" />
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => setLanguage('ps')}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'ps' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      🇦🇫 پښتو
                    </button>
                    <button
                      onClick={() => setLanguage('fa')}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'fa' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      🇮🇷 فارسی
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder={getTranslation(language, 'admin.common.search')}
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-500 border-none outline-none w-32 lg:w-48"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <BellIcon className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">3</span>
                </span>
              </button>
              
              {/* Mobile logout */}
              <button
                onClick={handleLogout}
                className="lg:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8" dir={direction}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}