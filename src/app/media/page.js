'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'

const mediaData = [
  {
    id: 1,
    title: {
      ps: 'د افغانستان د کرکټ ټیم د T20 نړیوال جام لوبې',
      en: 'Afghanistan Cricket Team T20 World Cup Matches'
    },
    type: 'video',
    category: 'matches',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
  {
    id: 2,
    title: {
      ps: 'د کرکټ اکاډمۍ د جوړولو مراسم',
      en: 'Cricket Academy Opening Ceremony'
    },
    type: 'photo',
    category: 'events',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
  {
    id: 3,
    title: {
      ps: 'د لوبغاړو روزنه',
      en: 'Player Training Sessions'
    },
    type: 'photo',
    category: 'training',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
  {
    id: 4,
    title: {
      ps: 'د جايزو د ورکولو مراسم',
      en: 'Awards Ceremony'
    },
    type: 'photo',
    category: 'awards',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
  {
    id: 5,
    title: {
      ps: 'د افغانستان د کرکټ د تاریخ مهمې لوبې',
      en: 'Historic Matches in Afghan Cricket'
    },
    type: 'video',
    category: 'matches',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
  {
    id: 6,
    title: {
      ps: 'د ښځینه کرکټ لوبې',
      en: 'Women\'s Cricket Matches'
    },
    type: 'photo',
    category: 'matches',
    thumbnail: '/api/placeholder/400/250',
    url: '#',
  },
]

export default function Media() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'media.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'media.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaData.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      {item.type === 'video' ? '🎥' : '📷'}
                    </span>
                  </div>
                  {item.type === 'video' && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                      {language === 'ps' ? 'ویډیو' : 'Video'}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'ps' ? 'د عکسونو ګالري' : 'Photo Gallery'}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200">
                    {getTranslation(language, 'media.viewAll')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
