'use client'

import { useLanguage } from '../../contexts/LanguageContext'

export default function RTLWrapper({ children }) {
  const { direction } = useLanguage()
  
  return (
    <div dir={direction} className="min-h-screen">
      {children}
    </div>
  )
}