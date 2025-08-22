'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { useLanguage } from '../../../contexts/LanguageContext'
import { getTranslation } from '../../../lib/translations'
import { UserIcon, CalendarIcon, TrophyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const teamMembersData = {
  1: {
    id: 1,
    nameKey: 'team.members.ahmadShah.name',
    positionKey: 'team.members.ahmadShah.position',
    bioKey: 'team.members.ahmadShah.bio',
    detailsBioKey: 'team.members.ahmadShah.detailsBio',
    experience: '15 years',
    achievementsKey: 'team.members.ahmadShah.achievements',
    category: 'management',
    image: '/api/placeholder/400/400',
    socialMedia: {
      twitter: '#',
      linkedin: '#',
      facebook: '#'
    }
  },
  2: {
    id: 2,
    nameKey: 'team.members.fatimaAhmadi.name',
    positionKey: 'team.members.fatimaAhmadi.position',
    bioKey: 'team.members.fatimaAhmadi.bio',
    detailsBioKey: 'team.members.fatimaAhmadi.detailsBio',
    experience: '8 years',
    achievementsKey: 'team.members.fatimaAhmadi.achievements',
    category: 'staff',
    image: '/api/placeholder/400/400',
    socialMedia: {
      twitter: '#',
      linkedin: '#',
      facebook: '#'
    }
  },
  3: {
    id: 3,
    nameKey: 'team.members.mohammadKarim.name',
    positionKey: 'team.members.mohammadKarim.position',
    bioKey: 'team.members.mohammadKarim.bio',
    detailsBioKey: 'team.members.mohammadKarim.detailsBio',
    experience: '12 years',
    achievementsKey: 'team.members.mohammadKarim.achievements',
    category: 'coaches',
    image: '/api/placeholder/400/400',
    socialMedia: {
      twitter: '#',
      linkedin: '#',
      facebook: '#'
    }
  },
  4: {
    id: 4,
    nameKey: 'team.members.rashidKhan.name',
    positionKey: 'team.members.rashidKhan.position',
    bioKey: 'team.members.rashidKhan.bio',
    detailsBioKey: 'team.members.rashidKhan.detailsBio',
    experience: '10 years',
    achievementsKey: 'team.members.rashidKhan.achievements',
    category: 'players',
    image: '/api/placeholder/400/400',
    socialMedia: {
      twitter: '#',
      linkedin: '#',
      facebook: '#'
    }
  }
}

export default function TeamMemberDetail() {
  const params = useParams()
  const { language } = useLanguage()
  const member = teamMembersData[params.id]

  if (!member) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900">
            {getTranslation(language, 'team.memberNotFound')}
          </h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getTranslation(language, member.nameKey)}
            </h1>
            <p className="text-xl text-blue-200 mb-2">
              {getTranslation(language, member.positionKey)}
            </p>
            <p className="text-lg text-blue-100">
              {member.experience} {getTranslation(language, 'team.experience')}
            </p>
          </div>
        </div>
      </section>

      {/* Member Details */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Biography */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {getTranslation(language, 'team.biography')}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {getTranslation(language, member.bioKey)}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {getTranslation(language, member.detailsBioKey)}
                  </p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrophyIcon className="w-6 h-6 text-yellow-500 mr-2" />
                  {getTranslation(language, 'team.achievements')}
                </h3>
                <div className="text-gray-700">
                  {getTranslation(language, member.achievementsKey)}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Member Info */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  {getTranslation(language, 'team.memberInfo')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">{getTranslation(language, 'team.position')}:</span>
                    <span className="font-semibold text-blue-900">
                      {getTranslation(language, member.positionKey)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">{getTranslation(language, 'team.experience')}:</span>
                    <span className="font-semibold text-blue-900">{member.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">{getTranslation(language, 'team.category')}:</span>
                    <span className="font-semibold text-blue-900">
                      {getTranslation(language, `team.categories.${member.category}`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {getTranslation(language, 'team.socialMedia')}
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href={member.socialMedia.twitter}
                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    title="Twitter"
                  >
                    T
                  </a>
                  <a 
                    href={member.socialMedia.linkedin}
                    className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                    title="LinkedIn"
                  >
                    L
                  </a>
                  <a 
                    href={member.socialMedia.facebook}
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    title="Facebook"
                  >
                    F
                  </a>
                </div>
              </div>

              {/* Back to Team */}
              <div className="bg-gray-50 rounded-lg p-6">
                <Link 
                  href="/team"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  {getTranslation(language, 'team.backToTeam')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
