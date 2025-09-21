'use client'

import { useLanguage } from '../../contexts/LanguageContext'
import { getTextAlign, getFontClass } from '../../utils/rtl'

export function RTLText({ children, className = '', align = 'left', ...props }) {
  const { isRTL } = useLanguage()
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children !== null && children?.title ? children.title :
                      typeof children === 'object' && children !== null ? JSON.stringify(children) :
                      String(children || '')
  
  return (
    <span 
      className={`${getTextAlign(isRTL, align)} ${getFontClass(isRTL)} ${className}`}
      {...props}
    >
      {safeChildren}
    </span>
  )
}

export function RTLHeading({ children, className = '', align = 'left', level = 'h2', ...props }) {
  const { isRTL } = useLanguage()
  const Component = level
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children !== null && children?.title ? children.title :
                      typeof children === 'object' && children !== null ? JSON.stringify(children) :
                      String(children || '')
  
  return (
    <Component 
      className={`${getTextAlign(isRTL, align)} ${getFontClass(isRTL)} ${className}`}
      {...props}
    >
      {safeChildren}
    </Component>
  )
}

export function RTLParagraph({ children, className = '', align = 'left', ...props }) {
  const { isRTL } = useLanguage()
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children !== null && children?.description ? children.description :
                      typeof children === 'object' && children !== null ? JSON.stringify(children) :
                      String(children || '')
  
  return (
    <p 
      className={`${getTextAlign(isRTL, align)} ${getFontClass(isRTL)} ${className}`}
      {...props}
    >
      {safeChildren}
    </p>
  )
}

export function RTLButton({ children, className = '', ...props }) {
  const { isRTL } = useLanguage()
  
  return (
    <button 
      className={`${getFontClass(isRTL)} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}