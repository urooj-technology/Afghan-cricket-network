'use client'

import Link from 'next/link'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useFetchData } from '../../hooks'

export default function TeamSection() {
  const { language } = useLanguage()

  const { data: teamData, isLoading } = useFetchData('/team', {
    queryKey: ['team', 'featured'],
    params: {
      page_size: 4,
      ordering: '-created_at'
    }
  })

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'home.team.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslation(language, 'home.team.description')}
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {teamData?.results?.slice(0, 4).map((player) => (
                <Link key={player.id} href={`/team/${player.slug || player.id}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      {player.image ? (
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                          <UserGroupIcon className="w-20 h-20 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {player.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold mb-2">{player.role || 'Player'}</p>
                      <p className="text-gray-600 text-sm">{player.batting_style || ''}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="text-center">
          <Link
            href="/team"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {getTranslation(language, 'home.team.viewAllPlayers')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
