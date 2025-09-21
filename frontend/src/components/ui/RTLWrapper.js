'use client'

import { useLanguage } from '../../contexts/LanguageContext'

export default function RTLWrapper({ children, className = '' }) {
  const { isRTL, direction } = useLanguage()
  
  return (
    <div 
      dir={direction} 
      className={`${className} ${isRTL ? 'rtl-content' : 'ltr-content'}`}
    >
      {children}
      <style jsx global>{`
        .rtl-content {
          direction: rtl;
        }
        
        .rtl-content .flex-row-reverse {
          flex-direction: row-reverse;
        }
        
        .rtl-content .text-left {
          text-align: right;
        }
        
        .rtl-content .text-right {
          text-align: left;
        }
        
        .rtl-content .ml-2 {
          margin-left: 0;
          margin-right: 0.5rem;
        }
        
        .rtl-content .mr-2 {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        
        .rtl-content .ml-3 {
          margin-left: 0;
          margin-right: 0.75rem;
        }
        
        .rtl-content .mr-3 {
          margin-right: 0;
          margin-left: 0.75rem;
        }
        
        .rtl-content .ml-4 {
          margin-left: 0;
          margin-right: 1rem;
        }
        
        .rtl-content .mr-4 {
          margin-right: 0;
          margin-left: 1rem;
        }
        
        .rtl-content .pl-3 {
          padding-left: 0;
          padding-right: 0.75rem;
        }
        
        .rtl-content .pr-3 {
          padding-right: 0;
          padding-left: 0.75rem;
        }
        
        .rtl-content .pl-4 {
          padding-left: 0;
          padding-right: 1rem;
        }
        
        .rtl-content .pr-4 {
          padding-right: 0;
          padding-left: 1rem;
        }
        
        .rtl-content .pl-10 {
          padding-left: 0;
          padding-right: 2.5rem;
        }
        
        .rtl-content .left-3 {
          left: auto;
          right: 0.75rem;
        }
        
        .rtl-content .right-3 {
          right: auto;
          left: 0.75rem;
        }
        
        .rtl-content .left-4 {
          left: auto;
          right: 1rem;
        }
        
        .rtl-content .right-4 {
          right: auto;
          left: 1rem;
        }
        
        .rtl-content .border-l-4 {
          border-left: 0;
          border-right: 4px solid;
        }
        
        .rtl-content .rounded-l-lg {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        
        .rtl-content .rounded-r-lg {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }
        
        .ltr-content {
          direction: ltr;
        }
      `}</style>
    </div>
  )
}