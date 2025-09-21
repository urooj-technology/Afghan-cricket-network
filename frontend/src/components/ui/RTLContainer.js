'use client'

import { useLanguage } from '../../contexts/LanguageContext'
import { getFlexDirection, getDirection } from '../../utils/rtl'

export function RTLContainer({ children, className = '', ...props }) {
  const { isRTL } = useLanguage()
  
  return (
    <div 
      dir={getDirection(isRTL)}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

export function RTLFlex({ children, className = '', reverse = false, ...props }) {
  const { isRTL } = useLanguage()
  
  return (
    <div 
      className={`flex ${getFlexDirection(isRTL, reverse)} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function RTLGrid({ children, className = '', ...props }) {
  const { isRTL } = useLanguage()
  
  return (
    <div 
      dir={getDirection(isRTL)}
      className={`grid ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}