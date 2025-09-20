'use client'

import { useLanguage } from '../../contexts/LanguageContext'

export default function DynamicLayout({ children }) {
  const { language, direction, mounted } = useLanguage()
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 font-en">
        {children}
      </div>
    )
  }
  
  return (
    <div 
      lang={language} 
      dir={direction}
      className={`min-h-screen bg-gray-50 font-${language} transition-all duration-300`}
    >
      {children}
    </div>
  )
}
