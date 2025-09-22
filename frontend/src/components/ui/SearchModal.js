'use client'

import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const { language } = useLanguage()
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const searchData = async () => {
      if (query.length < 2) {
        setResults({})
        return
      }

      setLoading(true)
      try {
        const response = await api.get(`/search/?q=${encodeURIComponent(query)}&category=${category}`)
        setResults(response.data.results)
      } catch (error) {
        console.error('Search error:', error)
        setResults({})
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchData, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, category])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <div className="flex-1 flex items-center space-x-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg border-none outline-none placeholder-gray-400"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 p-4 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-4">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!loading && query.length >= 2 && Object.keys(results).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No results found for "{query}"
              </div>
            )}

            {!loading && Object.entries(results).map(([type, items]) => (
              items.length > 0 && (
                <div key={type} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 capitalize">
                    {type} ({items.length})
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          // Navigate to item
                          window.location.href = `/${type}/${item.slug || item.id}`
                          onClose()
                        }}
                      >
                        <h4 className="font-medium text-gray-900">
                          {item.title || item.name}
                        </h4>
                        {item.summary && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}