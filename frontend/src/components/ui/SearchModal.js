'use client'

import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon, CalendarIcon, UserIcon, PlayIcon, NewspaperIcon, EyeIcon, MapPinIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import api from '../../lib/api'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'news', label: 'News' },
  { key: 'events', label: 'Events' },
  { key: 'players', label: 'Players' },
  { key: 'team', label: 'Team' },
  { key: 'media', label: 'Media' }
]

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { language, direction } = useLanguage()
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const searchData = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const response = await api.get(`/search/?q=${encodeURIComponent(query)}&category=${category}`)
        setResults(response.data.results)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchData, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, category])

  const getTypeIcon = (type) => {
    const icons = {
      news: NewspaperIcon,
      events: CalendarIcon,
      players: UserIcon,
      team: UserIcon,
      media: PlayIcon
    }
    return icons[type] || NewspaperIcon
  }

  const getTypeColor = (type) => {
    const colors = {
      news: 'from-blue-500 to-indigo-600',
      events: 'from-green-500 to-emerald-600',
      players: 'from-purple-500 to-violet-600',
      team: 'from-orange-500 to-red-600',
      media: 'from-pink-500 to-rose-600'
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Search Modal */}
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden" dir={direction}>
            {/* Header */}
            <div className="flex items-center p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-4 flex-1">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={getTranslation(language, 'common.search.placeholder') || 'Search...'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`flex-1 text-lg border-none outline-none placeholder-gray-400 ${direction === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg flex-shrink-0 ml-4"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${direction === 'rtl' ? 'font-arabic' : ''} ${
                    category === cat.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getTranslation(language, `common.search.category.${cat.key}`) || getTranslation(language, `common.${cat.key}`) || cat.label}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="overflow-y-auto p-4 flex-1" onWheel={(e) => {
              const element = e.currentTarget
              const atTop = element.scrollTop === 0
              const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
              if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault()
              }
            }}>
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {getTranslation(language, 'common.search.noResults') || getTranslation(language, 'common.noResults') || `No results found for "${query}"`}
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((item) => {
                    const IconComponent = getTypeIcon(item.type)
                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300"
                        onClick={() => {
                          if (item.type === 'news') {
                            window.location.href = `/news/${item.id}`
                          } else if (item.type === 'events') {
                            window.location.href = `/events/${item.id}`
                          } else if (item.type === 'players' || item.type === 'team') {
                            window.location.href = `/team/${item.id}`
                          } else if (item.type === 'media') {
                            window.location.href = `/media/${item.id}`
                          }
                        }}
                      >
                        <div className={`flex items-start ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
                          {item.image && (
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={`flex items-center mb-2 ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
                              <div className={`p-1.5 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)}`}>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <span className={`text-xs font-medium text-gray-500 uppercase tracking-wide ${direction === 'rtl' ? 'font-arabic' : ''}`}>
                                {getTranslation(language, `common.${item.type}`) || item.type}
                              </span>
                            </div>
                            <h3 className={`text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors ${direction === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}>
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className={`text-xs text-gray-600 line-clamp-2 mb-2 ${direction === 'rtl' ? 'text-right font-arabic' : 'text-left'}`}>
                                {item.description}
                              </p>
                            )}
                            <div className={`flex items-center justify-between text-xs text-gray-500`}>
                              <div className={`flex items-center ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-3`}>
                                {item.date && (
                                  <div className={`flex items-center ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-1`}>
                                    <ClockIcon className="w-3 h-3" />
                                    <span className={direction === 'rtl' ? 'font-arabic' : ''}>{formatDate(item.date)}</span>
                                  </div>
                                )}
                                {item.views && (
                                  <div className={`flex items-center ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-1`}>
                                    <EyeIcon className="w-3 h-3" />
                                    <span className={direction === 'rtl' ? 'font-arabic' : ''}>{item.views}</span>
                                  </div>
                                )}
                              </div>
                              {item.is_featured && (
                                <div className={`flex items-center ${direction === 'rtl' ? 'space-x-reverse' : ''} space-x-1`}>
                                  <TrophyIcon className="w-3 h-3 text-yellow-500" />
                                  <span className={`text-yellow-600 ${direction === 'rtl' ? 'font-arabic' : ''}`}>{getTranslation(language, 'common.featured') || 'Featured'}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Full Screen Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" dir={direction}>
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${getTypeColor(selectedItem.type)}`}>
                      {(() => {
                        const IconComponent = getTypeIcon(selectedItem.type)
                        return <IconComponent className="w-6 h-6 text-white" />
                      })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
                      <p className="text-sm text-gray-500 capitalize">{getTranslation(language, `common.${selectedItem.type}`) || selectedItem.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {selectedItem.image && (
                  <div className="mb-6">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{getTranslation(language, 'common.description') || 'Description'}</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {selectedItem.description || getTranslation(language, 'common.noDescription') || 'No description available.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{getTranslation(language, 'common.details') || 'Details'}</h3>
                    
                    {selectedItem.type === 'news' && (
                      <div className="space-y-3">
                        {selectedItem.author && (
                          <div className="flex items-center space-x-2">
                            <UserIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{getTranslation(language, 'common.by') || 'By'} {selectedItem.author}</span>
                          </div>
                        )}
                        {selectedItem.category && (
                          <div className="flex items-center space-x-2">
                            <NewspaperIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedItem.category}</span>
                          </div>
                        )}
                        {selectedItem.views && (
                          <div className="flex items-center space-x-2">
                            <EyeIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedItem.views} {getTranslation(language, 'common.views') || 'views'}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedItem.type === 'events' && (
                      <div className="space-y-3">
                        {selectedItem.venue && (
                          <div className="flex items-center space-x-2">
                            <MapPinIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{selectedItem.venue}</span>
                          </div>
                        )}
                        {selectedItem.date && (
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{formatDate(selectedItem.date)}</span>
                          </div>
                        )}
                        {selectedItem.ticket_price && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{getTranslation(language, 'common.price') || 'Price'}: ${selectedItem.ticket_price}</span>
                          </div>
                        )}
                        {selectedItem.is_free && (
                          <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {getTranslation(language, 'common.freeEvent') || 'Free Event'}
                          </div>
                        )}
                      </div>
                    )}

                    {selectedItem.type === 'players' && (
                      <div className="space-y-3">
                        {selectedItem.position && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{getTranslation(language, 'common.position') || 'Position'}: {selectedItem.position}</span>
                          </div>
                        )}
                        {selectedItem.jersey_number && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{getTranslation(language, 'common.jersey') || 'Jersey'}: #{selectedItem.jersey_number}</span>
                          </div>
                        )}
                        {selectedItem.matches_played && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{getTranslation(language, 'common.matches') || 'Matches'}: {selectedItem.matches_played}</span>
                          </div>
                        )}
                        {selectedItem.is_captain && (
                          <div className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            {getTranslation(language, 'common.captain') || 'Captain'}
                          </div>
                        )}
                      </div>
                    )}

                    {selectedItem.date && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3" />
                          <span>{formatDate(selectedItem.date)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      if (selectedItem.type === 'news') {
                        window.location.href = `/news/${selectedItem.id}`
                      } else if (selectedItem.type === 'events') {
                        window.location.href = `/events/${selectedItem.id}`
                      } else if (selectedItem.type === 'players' || selectedItem.type === 'team') {
                        window.location.href = `/team/${selectedItem.id}`
                      } else if (selectedItem.type === 'media') {
                        window.location.href = `/media/${selectedItem.id}`
                      }
                      setSelectedItem(null)
                      onClose()
                    }}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${getTypeColor(selectedItem.type)} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300`}
                  >
                    {getTranslation(language, 'common.search.viewDetails') || 'View Full Details'}
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  )
}