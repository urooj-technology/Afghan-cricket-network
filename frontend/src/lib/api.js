import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token only for admin operations
api.interceptors.request.use(
  (config) => {
    // Only add token for admin operations (POST, PUT, PATCH, DELETE)
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Token ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && ['post', 'put', 'patch', 'delete'].includes(error.config?.method?.toLowerCase())) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('adminAuth')
      if (window.location.pathname.includes('/admin')) {
        window.location.href = '/admin'
      }
    }
    return Promise.reject(error)
  }
)

export default api