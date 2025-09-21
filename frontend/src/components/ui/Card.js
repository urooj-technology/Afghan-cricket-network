'use client'

import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6', 
  rounded = 'rounded-xl', 
  shadow = 'shadow-md',
  background = 'bg-white',
  border = 'border border-gray-200',
  ...props 
}, ref) => {
  const hoverEffect = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''
  
  return (
    <div
      ref={ref}
      className={`${background} ${rounded} ${shadow} ${border} ${padding} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', size = 'text-xl' }) => (
  <h3 className={`font-bold text-gray-900 ${size} ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 ${className}`}>
    {children}
  </p>
)

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
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
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