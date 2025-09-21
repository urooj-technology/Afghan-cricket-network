'use client'

import { forwardRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6', 
  rounded = 'rounded-xl', 
  shadow = 'shadow-md',
  background = 'bg-white',
  border = 'border-0',
  ...props 
}, ref) => {
  const { isRTL } = useLanguage()
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-2 transition-all duration-300 transform' : ''
  const rtlClass = isRTL ? 'rtl-card' : 'ltr-card'
  
  return (
    <div
      ref={ref}
      className={`${background} ${rounded} ${shadow} ${border} ${padding} ${hoverEffect} ${rtlClass} ${className}`}
      {...props}
    >
      {children}
      <style jsx>{`
        .rtl-card {
          direction: rtl;
        }
        .ltr-card {
          direction: ltr;
        }
      `}</style>
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', size = 'text-xl' }) => {
  const { isRTL } = useLanguage()
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children?.title ? children.title :
                      String(children || '')
  
  return (
    <h3 className={`font-bold text-gray-900 ${size} ${isRTL ? 'font-arabic text-right' : ''} ${className}`}>
      {safeChildren}
    </h3>
  )
}

const CardDescription = ({ children, className = '' }) => {
  const { isRTL } = useLanguage()
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children?.description ? children.description :
                      String(children || '')
  
  return (
    <p className={`text-gray-600 ${isRTL ? 'font-arabic text-right' : ''} ${className}`}>
      {safeChildren}
    </p>
  )
}

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
)

const CardImage = ({ src, alt, className = '', aspectRatio = 'aspect-video' }) => (
  <div className={`${aspectRatio} overflow-hidden rounded-lg mb-4 ${className}`}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>
)

const CardBadge = ({ children, variant = 'primary', className = '' }) => {
  const { isRTL } = useLanguage()
  const variants = {
    primary: 'bg-blue-500 text-white shadow-lg',
    secondary: 'bg-gray-500 text-white shadow-lg',
    success: 'bg-green-500 text-white shadow-lg',
    warning: 'bg-yellow-500 text-white shadow-lg',
    danger: 'bg-red-500 text-white shadow-lg',
    info: 'bg-cyan-500 text-white shadow-lg',
  }
  
  // Ensure children is always a string
  const safeChildren = typeof children === 'string' ? children : 
                      typeof children === 'object' && children?.title ? children.title :
                      String(children || '')
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${isRTL ? 'font-arabic' : ''} ${className}`}>
      {safeChildren}
    </span>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardBadge
}