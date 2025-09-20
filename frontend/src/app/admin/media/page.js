'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  DocumentIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function MediaAdmin() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [media, setMedia] = useState([
    { id: 1, title: 'Team Training Session', type: 'Image', url: '/images/training.jpg', uploadDate: '2024-01-15', size: '2.5 MB', category: 'Training' },
    { id: 2, title: 'Match Highlights Video', type: 'Video', url: '/videos/highlights.mp4', uploadDate: '2024-01-14', size: '45.2 MB', category: 'Match' },
    { id: 3, title: 'Player Interview', type: 'Audio', url: '/audio/interview.mp3', uploadDate: '2024-01-13', size: '8.7 MB', category: 'Interview' },
    { id: 4, title: 'Stadium Photo', type: 'Image', url: '/images/stadium.jpg', uploadDate: '2024-01-12', size: '3.1 MB', category: 'Venue' }
  ])

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this media file?')) {
      setMedia(media.filter(item => item.id !== id))
    }
  }

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || item.type.toLowerCase() === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Image': return PhotoIcon
      case 'Video': return VideoCameraIcon
      case 'Audio': return SpeakerWaveIcon
      default: return DocumentIcon
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'Image': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Video': return 'bg-green-100 text-green-800 border-green-200'
      case 'Audio': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const stats = [
    { name: 'Total Files', value: media.length, icon: DocumentIcon, color: 'blue' },
    { name: 'Images', value: media.filter(m => m.type === 'Image').length, icon: PhotoIcon, color: 'emerald' },
    { name: 'Videos', value: media.filter(m => m.type === 'Video').length, icon: VideoCameraIcon, color: 'amber' },
    { name: 'Audio Files', value: media.filter(m => m.type === 'Audio').length, icon: SpeakerWaveIcon, color: 'purple' }
  ]

  return (
    <AdminLayout title="Media Management">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">Media Management</h1>
            <p className="text-gray-600">Upload and organize photos, videos, and audio files</p>
          </div>
          <Link
            href="/admin/media/add"
            className="btn-primary hover-lift inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Upload Media
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass rounded-2xl p-6 hover-glow group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="space-y-6">
        {filteredMedia.map((item) => {
          const IconComponent = getTypeIcon(item.type)
          return (
            <div key={item.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className={`badge ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>Uploaded: {new Date(item.uploadDate).toLocaleDateString()}</span>
                    <span>Size: {item.size}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{item.category}</span>
                  </div>
                  
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View File →
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/admin/media/edit/${item.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover-lift"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-all duration-200 hover-lift"
                  >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <PhotoIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterType !== 'all' ? 'No media found' : 'No media files'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start by uploading your first media file.'}
          </p>
          <Link
            href="/admin/media/add"
            className="btn-primary hover-lift inline-flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Upload First File
          </Link>
        </div>
      )}
    </AdminLayout>
  )
}