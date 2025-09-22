const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export const trackCardView = async (type, id) => {
  try {
    if (type === 'news') {
      await fetch(`${API_BASE_URL}/news/${id}/`, {
        method: 'GET',
      })
    } else if (type === 'media') {
      await fetch(`${API_BASE_URL}/media/${id}/`, {
        method: 'GET',
      })
    }
  } catch (error) {
    console.error('Failed to track card view:', error)
  }
}