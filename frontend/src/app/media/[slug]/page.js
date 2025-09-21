'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import RTLWrapper from '../../../components/ui/RTLWrapper'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useFetchData } from '../../../hooks'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  EyeIcon,
  PlayIcon,
  PhotoIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'

export default function MediaDetailPage() {
  const { slug } = useParams()
  const { language, isRTL } = useLanguage()

  const { data: media, isLoading, error } = useFetchData(`/media/${slug}`, {
    queryKey: ['media', slug],
    enabled: !!slug
  })

  const { data: relatedMedia } = useFetchData('/media', {
    queryKey: ['media', 'related'],
    params: { page_size: 6 },
    enabled: !!media
  })

  if (isLoading) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <LoadingSpinner size="lg" />
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  if (error || !media) {
    return (
      <RTLWrapper>
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Media not found</h1>
              <Link href="/media" className="text-blue-600 hover:text-blue-800">
                Back to Media
              </Link>
            </div>
          </div>
          <Footer />
        </main>
      </RTLWrapper>
    )
  }

  return (
    <RTLWrapper>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link href="/media" className="inline-flex items-center text-purple-200 hover:text-white mb-6">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Media
            </Link>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full">
                {media.media_type}
              </span>
              <span className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full">
                {media.category_name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{media.title}</h1>
            
            <div className="flex items-center space-x-8 text-purple-200">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <span>{new Date(media.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <EyeIcon className="w-5 h-5 mr-2" />
                <span>{media.views?.toLocaleString() || 0} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Media Content */}
            <div className="lg:col-span-3">
              {/* Media Player/Viewer */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                {media.media_type === 'video' ? (
                  <div className="relative aspect-video bg-black">
                    {media.file_url ? (
                      <video
                        controls
                        className="w-full h-full"
                        poster={media.thumbnail || '/api/placeholder/800/450'}
                      >
                        <source src={media.file_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <PlayIcon className="w-16 h-16 mx-auto mb-4 opacity-70" />
                          <p>Video not available</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={media.file_url || '/api/placeholder/800/600'}
                      alt={media.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute top-4 right-4">
                      <PhotoIcon className="w-8 h-8 text-white bg-black/50 rounded-full p-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {media.description || `${media.title} - A captivating piece from our media collection showcasing the best of Afghan cricket.`}
                  </p>
                </div>

                {/* Tags */}
                {media.tags && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {media.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Media Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Media Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-medium capitalize">{media.media_type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Category</div>
                    <div className="font-medium">{media.category_name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Published</div>
                    <div className="font-medium">{new Date(media.created_at).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Views</div>
                    <div className="font-medium">{media.views?.toLocaleString() || 0}</div>
                  </div>
                  {media.file_size && (
                    <div>
                      <div className="text-sm text-gray-600">File Size</div>
                      <div className="font-medium">{media.file_size}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Download/Share */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  {media.file_url && (
                    <a
                      href={media.file_url}
                      download
                      className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </a>
                  )}
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Share
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Collection
                  </button>
                </div>
              </div>

              {/* Related Media */}
              {relatedMedia && relatedMedia.results && relatedMedia.results.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Media</h3>
                  <div className="space-y-4">
                    {relatedMedia.results.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/media/${item.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.thumbnail || item.file_url || '/api/placeholder/100/75'}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.media_type} • {item.views || 0} views
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </RTLWrapper>
  )
}