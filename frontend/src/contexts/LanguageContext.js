'use client'

import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ps') // Default to Pashto

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ps' ? 'en' : 'ps')
  }

  // Get direction based on language
  const direction = language === 'ps' ? 'rtl' : 'ltr'
  const isRTL = language === 'ps'

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    direction,
    isRTL,
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
