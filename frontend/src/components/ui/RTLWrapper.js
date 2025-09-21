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
          direction: rtl !important;
        }
        
        .rtl-content * {
          direction: rtl !important;
        }
        
        .rtl-content .flex-row-reverse {
          flex-direction: row-reverse !important;
        }
        
        .rtl-content .text-left {
          text-align: right !important;
        }
        
        .rtl-content .text-right {
          text-align: left !important;
        }
        
        .rtl-content .text-center {
          text-align: center !important;
        }
        
        .rtl-content .justify-start {
          justify-content: flex-end !important;
        }
        
        .rtl-content .justify-end {
          justify-content: flex-start !important;
        }
        
        .rtl-content .items-start {
          align-items: flex-end !important;
        }
        
        .rtl-content .items-end {
          align-items: flex-start !important;
        }
        
        .rtl-content .ml-1 { margin-left: 0 !important; margin-right: 0.25rem !important; }
        .rtl-content .mr-1 { margin-right: 0 !important; margin-left: 0.25rem !important; }
        .rtl-content .ml-2 { margin-left: 0 !important; margin-right: 0.5rem !important; }
        .rtl-content .mr-2 { margin-right: 0 !important; margin-left: 0.5rem !important; }
        .rtl-content .ml-3 { margin-left: 0 !important; margin-right: 0.75rem !important; }
        .rtl-content .mr-3 { margin-right: 0 !important; margin-left: 0.75rem !important; }
        .rtl-content .ml-4 { margin-left: 0 !important; margin-right: 1rem !important; }
        .rtl-content .mr-4 { margin-right: 0 !important; margin-left: 1rem !important; }
        .rtl-content .ml-6 { margin-left: 0 !important; margin-right: 1.5rem !important; }
        .rtl-content .mr-6 { margin-right: 0 !important; margin-left: 1.5rem !important; }
        .rtl-content .ml-8 { margin-left: 0 !important; margin-right: 2rem !important; }
        .rtl-content .mr-8 { margin-right: 0 !important; margin-left: 2rem !important; }
        
        .rtl-content .pl-1 { padding-left: 0 !important; padding-right: 0.25rem !important; }
        .rtl-content .pr-1 { padding-right: 0 !important; padding-left: 0.25rem !important; }
        .rtl-content .pl-2 { padding-left: 0 !important; padding-right: 0.5rem !important; }
        .rtl-content .pr-2 { padding-right: 0 !important; padding-left: 0.5rem !important; }
        .rtl-content .pl-3 { padding-left: 0 !important; padding-right: 0.75rem !important; }
        .rtl-content .pr-3 { padding-right: 0 !important; padding-left: 0.75rem !important; }
        .rtl-content .pl-4 { padding-left: 0 !important; padding-right: 1rem !important; }
        .rtl-content .pr-4 { padding-right: 0 !important; padding-left: 1rem !important; }
        .rtl-content .pl-6 { padding-left: 0 !important; padding-right: 1.5rem !important; }
        .rtl-content .pr-6 { padding-right: 0 !important; padding-left: 1.5rem !important; }
        .rtl-content .pl-8 { padding-left: 0 !important; padding-right: 2rem !important; }
        .rtl-content .pr-8 { padding-right: 0 !important; padding-left: 2rem !important; }
        .rtl-content .pl-10 { padding-left: 0 !important; padding-right: 2.5rem !important; }
        .rtl-content .pr-10 { padding-right: 0 !important; padding-left: 2.5rem !important; }
        
        .rtl-content .left-0 { left: auto !important; right: 0 !important; }
        .rtl-content .right-0 { right: auto !important; left: 0 !important; }
        .rtl-content .left-1 { left: auto !important; right: 0.25rem !important; }
        .rtl-content .right-1 { right: auto !important; left: 0.25rem !important; }
        .rtl-content .left-2 { left: auto !important; right: 0.5rem !important; }
        .rtl-content .right-2 { right: auto !important; left: 0.5rem !important; }
        .rtl-content .left-3 { left: auto !important; right: 0.75rem !important; }
        .rtl-content .right-3 { right: auto !important; left: 0.75rem !important; }
        .rtl-content .left-4 { left: auto !important; right: 1rem !important; }
        .rtl-content .right-4 { right: auto !important; left: 1rem !important; }
        
        .rtl-content .border-l { border-left: 0 !important; border-right: 1px solid !important; }
        .rtl-content .border-r { border-right: 0 !important; border-left: 1px solid !important; }
        .rtl-content .border-l-2 { border-left: 0 !important; border-right: 2px solid !important; }
        .rtl-content .border-r-2 { border-right: 0 !important; border-left: 2px solid !important; }
        .rtl-content .border-l-4 { border-left: 0 !important; border-right: 4px solid !important; }
        .rtl-content .border-r-4 { border-right: 0 !important; border-left: 4px solid !important; }
        
        .rtl-content .rounded-l { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; border-top-right-radius: 0.25rem !important; border-bottom-right-radius: 0.25rem !important; }
        .rtl-content .rounded-r { border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; border-top-left-radius: 0.25rem !important; border-bottom-left-radius: 0.25rem !important; }
        .rtl-content .rounded-l-lg { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; border-top-right-radius: 0.5rem !important; border-bottom-right-radius: 0.5rem !important; }
        .rtl-content .rounded-r-lg { border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; border-top-left-radius: 0.5rem !important; border-bottom-left-radius: 0.5rem !important; }
        
        .rtl-content .space-x-1 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 0.25rem !important; }
        .rtl-content .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 0.5rem !important; }
        .rtl-content .space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 0.75rem !important; }
        .rtl-content .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 1rem !important; }
        .rtl-content .space-x-6 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 1.5rem !important; }
        .rtl-content .space-x-8 > :not([hidden]) ~ :not([hidden]) { margin-left: 0 !important; margin-right: 2rem !important; }
        
        .rtl-content .space-x-reverse > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem !important; margin-right: 0 !important; }
        
        .ltr-content {
          direction: ltr !important;
        }
        
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Arial', sans-serif !important;
        }
        
        .rtl-content h1, .rtl-content h2, .rtl-content h3, .rtl-content h4, .rtl-content h5, .rtl-content h6 {
          text-align: right !important;
        }
        
        .rtl-content p {
          text-align: right !important;
        }
        
        .rtl-content input, .rtl-content select, .rtl-content textarea {
          text-align: right !important;
        }
        
        .rtl-content .text-center {
          text-align: center !important;
        }
        
        .rtl-content .text-right {
          text-align: right !important;
        }
        
        .rtl-content .text-left {
          text-align: left !important;
        }
        
        .rtl-content .hero-title {
          text-align: center !important;
        }
        
        .rtl-content .hero-subtitle {
          text-align: center !important;
        }
      `}</style>
    </div>
  )
}