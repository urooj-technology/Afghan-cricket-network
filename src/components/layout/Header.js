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
  const { language, toggleLanguage } = useLanguage()

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
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200">
            {getTranslation(language, 'common.nav.search')}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
          >
            <GlobeAltIcon className="w-4 h-4" />
            <span>{language === 'ps' ? 'EN' : 'پښ'}</span>
          </button>
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
                <button
                  onClick={toggleLanguage}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-right"
                >
                  {language === 'ps' ? 'English' : 'پښتو'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
