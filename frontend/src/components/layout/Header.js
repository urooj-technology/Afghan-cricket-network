'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon, HomeIcon, NewspaperIcon, TrophyIcon, CalendarIcon, PhotoIcon, UserGroupIcon, InformationCircleIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import SearchModal from '../ui/SearchModal'

const navigation = [
  { key: 'home', href: '/', icon: HomeIcon },
  { key: 'news', href: '/news', icon: NewspaperIcon },
  { key: 'rankings', href: '/rankings', icon: TrophyIcon },
  { key: 'events', href: '/events', icon: CalendarIcon },
  { key: 'media', href: '/media', icon: PhotoIcon },
  { key: 'team', href: '/team', icon: UserGroupIcon },
  { key: 'about', href: '/about', icon: InformationCircleIcon },
  { key: 'contact', href: '/contact', icon: PhoneIcon },
]

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫' },
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی', flag: '🇮🇷' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const { isAuthenticated, isAdmin } = useAuth()
  const { language, setLanguage, isRTL, direction } = useLanguage()
  const dropdownRef = useRef(null)
  const profileDropdownRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  const isActiveRoute = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false)
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setLangDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-slate-800 to-slate-900 text-white" dir={direction}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">+93 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-slate-300">info@afghancricket.com</span>
              </div>
            </div>
            
            {/* Language Selector & Login */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <span className="text-base">{currentLang.flag}</span>
                  <span className="hidden sm:block">{currentLang.nativeName}</span>
                  <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-blue-50 transition-colors rounded-xl mx-2 ${
                          language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-xs text-gray-500">{lang.name}</div>
                        </div>
                        {language === lang.code && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Quick Login */}
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    router.push('/admin/dashboard')
                  } else {
                    router.push('/admin/login')
                  }
                }}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:block">{isAuthenticated ? 'Dashboard' : 'Login'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header 
        className={`fixed top-10 left-0 right-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
            : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50'
        }`} 
        dir={direction}
      >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3 hover:opacity-90 transition-all duration-200">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200 flex items-center justify-center">
                  <img 
                    src="/logo.jpg" 
                    alt="Afghan Cricket Network" 
                    className="w-8 h-8 object-contain rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">ACN</h1>
                <p className="text-xs text-gray-500 -mt-1 font-medium">{getTranslation(language, 'common.footer.forAfghanistan')}</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center gap-2">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <span>{getTranslation(language, `common.nav.${item.key}`)}</span>
                </Link>
              )
            })}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {/* Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className={`fixed top-0 bottom-0 z-50 w-80 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 shadow-2xl lg:hidden transform transition-transform duration-500 ease-out ${
            isRTL ? 'left-0' : 'right-0'
          }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-32 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '30s'}}></div>
            </div>
            {/* Mobile Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-6 py-6 border-b border-white/10">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl">
                      <img src="/logo.jpg" alt="ACN" className="w-10 h-10 rounded-xl" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-white font-bold text-2xl tracking-tight">ACN</span>
                    <p className="text-blue-100 text-sm font-medium">Cricket Network</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
            </div>
            
            {/* Mobile Navigation Card */}
            <div className="p-5 relative z-10">
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-3 space-y-2 border border-white/10 shadow-2xl">
                {navigation.map((item, index) => {
                  const isActive = isActiveRoute(item.href)
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`group flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25' 
                          : 'text-slate-200 hover:bg-white/20 hover:text-white hover:shadow-lg'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{animationDelay: `${index * 50}ms`}}
                    >
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-semibold">{getTranslation(language, `common.nav.${item.key}`)}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                    </Link>
                  )
                })}
              </div>
              
              {/* Profile Card */}
              <div className="mt-5 bg-white/15 backdrop-blur-xl rounded-3xl p-3 border border-white/10 shadow-2xl">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        router.push('/admin/dashboard')
                      }}
                      className="w-full group flex items-center space-x-4 px-5 py-4 rounded-2xl text-slate-200 hover:bg-white/20 hover:text-white transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="p-2 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-all duration-300">
                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold">Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        router.push('/admin/login')
                      }}
                      className="w-full group flex items-center space-x-4 px-5 py-4 rounded-2xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300 transform hover:scale-[1.02] mt-2"
                    >
                      <div className="p-2 rounded-xl bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold">Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      router.push('/admin/login')
                    }}
                    className="w-full group flex items-center space-x-4 px-5 py-4 rounded-2xl text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="p-2 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold">Login</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Language Selection */}
            <div className="absolute bottom-0 left-0 right-0 p-5 relative z-10">
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl">
                <p className="text-white/80 text-xs font-semibold mb-3 text-center">Language</p>
                <div className="flex space-x-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex-1 py-3 px-4 rounded-2xl text-center text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                        language === lang.code 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25' 
                          : 'text-slate-300 hover:bg-white/20 hover:text-white border border-white/10'
                      }`}
                    >
                      <div className="text-lg mb-1">{lang.flag}</div>
                      <div className="text-xs">{lang.code.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </>
  )
}