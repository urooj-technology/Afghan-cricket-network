'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ps') // Default to Pashto
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && ['en', 'ps', 'fa'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Save language to localStorage and update document attributes
      localStorage.setItem('language', language)
      document.documentElement.lang = language
      document.documentElement.dir = direction
      
      // Update body class for font switching
      document.body.className = document.body.className.replace(/font-(en|ps|fa)/g, '')
      document.body.classList.add(`font-${language}`)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    const languages = ['en', 'ps', 'fa']
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const changeLanguage = (newLanguage) => {
    if (['en', 'ps', 'fa'].includes(newLanguage)) {
      setLanguage(newLanguage)
    }
  }

  // Get direction based on language
  const direction = (language === 'ps' || language === 'fa') ? 'rtl' : 'ltr'
  const isRTL = language === 'ps' || language === 'fa'

  const value = {
    language,
    setLanguage: changeLanguage,
    toggleLanguage,
    direction,
    isRTL,
    mounted,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
