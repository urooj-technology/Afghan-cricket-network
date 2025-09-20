'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, isRTL } = useLanguage()

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Afghan Cricket Network" 
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">A C N</h1>
                <p className="text-xs text-gray-600">د افغانستان کرکټ شبکه</p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {getTranslation(language, `common.nav.${item.key}`)}
            </Link>
          ))}
        </div>
        
        <div className={`hidden lg:flex lg:flex-1 lg:justify-end items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200">
            {getTranslation(language, 'common.nav.search')}
          </button>
          <Link
            href="/admin"
            className="text-sm font-semibold leading-6 text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            Admin
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50">
              <GlobeAltIcon className="w-4 h-4" />
              <span>{language === 'en' ? 'English' : language === 'ps' ? 'پښتو' : 'فارسی'}</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => setLanguage('ps')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'ps' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  🇦🇫 پښتو
                </button>
                <button
                  onClick={() => setLanguage('fa')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'fa' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  🇮🇷 فارسی
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo.jpg" 
                  alt="Afghan Cricket Network" 
                  className="w-8 h-8 object-contain rounded-lg"
                />
                <span className="text-lg font-bold text-gray-900">ACN</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {getTranslation(language, `common.nav.${item.key}`)}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Portal
                </Link>
                <div className="-mx-3 px-3 py-2">
                  <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg transition-colors ${language === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => setLanguage('ps')}
                      className={`w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg transition-colors ${language === 'ps' ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                      🇦🇫 پښتو
                    </button>
                    <button
                      onClick={() => setLanguage('fa')}
                      className={`w-full text-left px-3 py-2 text-base font-semibold leading-7 rounded-lg transition-colors ${language === 'fa' ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'}`}
                    >
                      🇮🇷 فارسی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
