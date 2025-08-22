'use client'

import { useLanguage } from '../../contexts/LanguageContext'

export default function DynamicLayout({ children }) {
  const { language, direction } = useLanguage()
  
  return (
    <div 
      lang={language} 
      dir={direction}
      className={`min-h-screen bg-gray-50 ${direction === 'rtl' ? 'font-ps' : 'font-en'}`}
    >
      {children}
    </div>
  )
}
