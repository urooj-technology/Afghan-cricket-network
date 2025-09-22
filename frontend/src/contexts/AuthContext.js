'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('userData')
        
        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser)
          setToken(storedToken)
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('adminAuth')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials.email)
      const response = await api.post('/login/', credentials)
      console.log('Login response:', response.data)
      
      const { token: authToken, user: userData } = response.data

      // Store in localStorage
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('adminAuth', 'true')

      // Update state
      setToken(authToken)
      setUser(userData)
      setIsAuthenticated(true)

      console.log('Login successful, user:', userData)
      return { success: true, user: userData }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      return {
        success: false,
        error: error.response?.data?.non_field_errors?.[0] || error.response?.data?.detail || 'Login failed'
      }
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout/', {}, {
          headers: {
            'Authorization': `Token ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('adminAuth')

      // Clear state
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const isAdmin = () => {
    if (!user) return false
    return user.is_admin || user.is_staff || user.is_superuser || false
  }

  const hasPermission = (permission) => {
    if (!user) return false
    if (isAdmin()) return true
    return user[permission] || false
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext