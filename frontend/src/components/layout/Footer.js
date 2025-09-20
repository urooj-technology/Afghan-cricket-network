'use client'

import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  UserGroupIcon,
  TrophyIcon,
  CalendarIcon,
  NewspaperIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const navigation = {
  main: [
    { key: 'home', href: '/' },
    { key: 'news', href: '/news' },
    { key: 'rankings', href: '/rankings' },
    { key: 'events', href: '/events' },
    { key: 'media', href: '/media' },
    { key: 'about', href: '/about' },
    { key: 'team', href: '/team' },
    { key: 'contact', href: '/contact' },
  ],
  quickLinks: [
    { key: 'footer.playerRankings', href: '/rankings?tab=batting' },
    { key: 'footer.matchSchedule', href: '/events?filter=upcoming' },
    { key: 'footer.cricketAcademy', href: '/about#academy' },
    { key: 'footer.trainingPrograms', href: '/events?filter=training' },
    { key: 'footer.youthDevelopment', href: '/about#youth' },
  ],
  resources: [
    { key: 'footer.newsArchive', href: '/news/archive' },
    { key: 'footer.photoGallery', href: '/media?type=photo' },
    { key: 'footer.videoGallery', href: '/media?type=video' },
    { key: 'footer.pressReleases', href: '/news?category=press' },
    { key: 'footer.tournamentResults', href: '/rankings?tab=teams' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/afghancricketnetwork',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/afghancricketnetwork',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/afghancricketnetwork',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 715.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/afghancricketnetwork',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/afghancricketnetwork',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'common.email',
    value: 'info@afghancricketnetwork.com',
    href: 'mailto:info@afghancricketnetwork.com'
  },
  {
    icon: PhoneIcon,
    label: 'common.phone',
    value: '+93 700 123 456',
    href: 'tel:+93700123456'
  },
  {
    icon: MapPinIcon,
    label: 'common.address',
    value: 'Kabul Cricket Stadium, District 6, Kabul, Afghanistan',
    href: 'https://maps.google.com/?q=Kabul,Afghanistan'
  },
  {
    icon: ClockIcon,
    label: 'common.officeHours',
    value: 'common.officeHoursValue',
    href: null
  }
]

const achievements = [
  {
    icon: TrophyIcon,
    title: 'ICC Full Member',
    subtitle: 'Since 2017',
    titleKey: 'iccFullMember',
    subtitleKey: 'since2017'
  },
  {
    icon: UserGroupIcon,
    title: '50+ Players',
    subtitle: 'Active Squad',
    titleKey: 'activePlayers',
    subtitleKey: 'activeSquad'
  },
  {
    icon: CalendarIcon,
    title: '100+ Matches',
    subtitle: 'International Games',
    titleKey: 'internationalMatches',
    subtitleKey: 'internationalGames'
  },
  {
    icon: NewspaperIcon,
    title: '500+ Articles',
    subtitle: 'News Coverage',
    titleKey: 'newsArticles',
    subtitleKey: 'newsCoverage'
  }
]

export default function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Afghan Cricket Network" 
                className="w-16 h-16 object-contain rounded-lg shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {getTranslation(language, 'home.hero.title')}
                </h3>
                {/* <p className="text-sm text-gray-400">د افغانستان کرکټ شبکه</p> */}
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {getTranslation(language, 'common.footer.description')}
            </p>
            
            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-3 bg-gray-800 rounded-lg">
                  <achievement.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm font-semibold text-white">{getTranslation(language, `common.achievements.${achievement.titleKey}`) || achievement.title}</div>
                  <div className="text-xs text-gray-400">{getTranslation(language, `common.achievements.${achievement.subtitleKey}`) || achievement.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {getTranslation(language, 'common.footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {navigation.quickLinks.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {getTranslation(language, `common.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {getTranslation(language, 'common.footer.resources')}
            </h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {getTranslation(language, `common.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {getTranslation(language, 'common.footer.contactInfo')}
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <info.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white">{getTranslation(language, `common.${info.label}`)}</div>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {typeof info.value === 'string' && info.value.startsWith('common.') 
                          ? getTranslation(language, info.value) 
                          : info.value}
                      </a>
                    ) : (
                      <div className="text-sm text-gray-400">
                        {typeof info.value === 'string' && info.value.startsWith('common.') 
                          ? getTranslation(language, info.value) 
                          : info.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-3">
                {getTranslation(language, 'common.footer.newsletter')}
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={getTranslation(language, 'common.footer.emailPlaceholder')}
                  className="flex-1 px-3 py-2 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap">
                  {getTranslation(language, 'common.footer.subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center md:justify-start gap-6">
              {navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {getTranslation(language, `common.nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
              
              <div className="text-gray-400 text-sm text-center md:text-left">
                <p className="mb-2">
                  {getTranslation(language, 'common.copyright.year')} 
                  {getTranslation(language, 'common.copyright.allRightsReserved')}
                </p>
                <p>
                  {getTranslation(language, 'common.copyright.madeWith')} : <a href="https://urooj-tech.com" className="text-white hover:text-gray-300 transition-colors">Urooj Technology</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}