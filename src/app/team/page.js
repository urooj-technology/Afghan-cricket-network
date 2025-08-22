'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import Link from 'next/link'


const teamMembers = [
  {
    id: 1,
    nameKey: 'team.members.ahmadShah.name',
    positionKey: 'team.members.ahmadShah.position',
    bioKey: 'team.members.ahmadShah.bio',
    category: 'management',
    image: '/api/placeholder/200/200',
  },
  {
    id: 2,
    nameKey: 'team.members.fatimaAhmadi.name',
    positionKey: 'team.members.fatimaAhmadi.position',
    bioKey: 'team.members.fatimaAhmadi.bio',
    category: 'staff',
    image: '/api/placeholder/200/200',
  },
  {
    id: 3,
    nameKey: 'team.members.mohammadKarim.name',
    positionKey: 'team.members.mohammadKarim.position',
    bioKey: 'team.members.mohammadKarim.bio',
    category: 'coaches',
    image: '/api/placeholder/200/200',
  },
  {
    id: 4,
    nameKey: 'team.members.rashidKhan.name',
    positionKey: 'team.members.rashidKhan.position',
    bioKey: 'team.members.rashidKhan.bio',
    category: 'players',
    image: '/api/placeholder/200/200',
  },
]

export default function Team() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'team.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center bg-gray-50 rounded-lg p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {getTranslation(language, member.nameKey).charAt(0)}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getTranslation(language, member.nameKey)}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {getTranslation(language, member.positionKey)}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {getTranslation(language, member.bioKey)}
                </p>
                <Link 
                  href={`/team/${member.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {getTranslation(language, 'team.viewProfile')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
