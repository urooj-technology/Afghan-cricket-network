'use client'

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]}`}></div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export function InlineLoader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  )
}