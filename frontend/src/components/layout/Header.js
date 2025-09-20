'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, GlobeAltIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const navigation = [
  { key: 'home', href: '/' },
  { key: 'news', href: '/news' },
  { key: 'rankings', href: '/rankings' },
  { key: 'events', href: '/events' },
  { key: 'media', href: '/media' },
  { key: 'about', href: '/about' },
  { key: 'team', href: '/team' },
  { key: 'contact', href: '/contact' },
]

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫' },
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی', flag: '🇮🇷' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const { language, setLanguage, isRTL, direction } = useLanguage()
  const dropdownRef = useRef(null)

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setLangDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100" dir={direction}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="Afghan Cricket Network" 
                className="w-10 h-10 object-contain rounded-lg shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">ACN</h1>
              <p className="text-xs text-gray-500 -mt-1">{getTranslation(language, 'common.footer.forAfghanistan')}</p>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 py-2 px-1 group"
            >
              {getTranslation(language, `common.nav.${item.key}`)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          {/* Search */}
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          
          {/* Admin Link */}
          <Link
            href="/admin"
            className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            {getTranslation(language, 'admin.nav.dashboard')}
          </Link>
          
          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200"
            >
              <span className="text-base">{currentLang.flag}</span>
              <span className="hidden sm:block">{currentLang.nativeName}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
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
        </div>
        
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className={`fixed inset-y-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden transition-transform duration-300 ${isRTL ? 'left-0' : 'right-0'}`}>
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.jpg" alt="ACN" className="w-8 h-8 rounded-lg" />
                <span className="text-lg font-bold text-gray-900">ACN</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getTranslation(language, `common.nav.${item.key}`)}
                </Link>
              ))}
              
              <Link
                href="/admin"
                className="block px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {getTranslation(language, 'admin.nav.dashboard')}
              </Link>
            </div>
            
            {/* Mobile Language Selection */}
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-3">{getTranslation(language, 'common.language.english')}</p>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                      language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
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
            </div>
          </div>
        </>
      )}
    </header>
  )
}
