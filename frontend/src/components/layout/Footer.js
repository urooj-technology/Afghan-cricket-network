'use client'

import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const footerLinks = {
  quickLinks: [
    { key: 'home', href: '/' },
    { key: 'news', href: '/news' },
    { key: 'events', href: '/events' },
    { key: 'team', href: '/team' },
  ],
  cricket: [
    { key: 'rankings', href: '/rankings' },
    { key: 'media', href: '/media' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ],
  legal: [
    { key: 'privacy', href: '/privacy' },
    { key: 'terms', href: '/terms' },
    { key: 'cookies', href: '/cookies' },
    { key: 'disclaimer', href: '/disclaimer' },
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: '📘', href: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: '🐦', href: '#', color: 'hover:text-sky-500' },
  { name: 'Instagram', icon: '📷', href: '#', color: 'hover:text-pink-600' },
  { name: 'YouTube', icon: '📺', href: '#', color: 'hover:text-red-600' },
]

export default function Footer() {
  const { language, isRTL, direction } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white" dir={direction}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Afghan Cricket Network" 
                className="w-12 h-12 rounded-lg shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold">Afghan Cricket Network</h3>
                <p className="text-sm text-gray-400">د افغانستان کرکټ شبکه</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {getTranslation(language, 'common.footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`p-3 bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 ${social.color} hover:bg-gray-700 text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-indigo-300">
              {getTranslation(language, 'common.footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {getTranslation(language, `common.nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cricket Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-300">
              {getTranslation(language, 'common.footer.cricket')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.cricket.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {getTranslation(language, `common.nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-300">
              {getTranslation(language, 'common.footer.contact')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Kabul Cricket Stadium</p>
                  <p>Kabul, Afghanistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+93 (0) 20 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@afghancricket.af</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-200">
                {getTranslation(language, 'common.footer.newsletter')}
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={getTranslation(language, 'common.footer.emailPlaceholder')}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-pink-500 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-r-lg transition-colors">
                  <EnvelopeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2024 Afghan Cricket Network.</span>
              <span className="flex items-center">
                {getTranslation(language, 'common.footer.madeWith')}
                <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
                {getTranslation(language, 'common.footer.forAfghanistan')}
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {getTranslation(language, `common.footer.${link.key}`)}
                </Link>
              ))}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 rounded-full transition-all duration-300 transform hover:scale-110 group"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>


    </footer>
  )
}