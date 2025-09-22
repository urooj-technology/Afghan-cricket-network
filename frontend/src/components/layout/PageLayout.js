'use client'

import Header from './Header'
import Footer from './Footer'

export default function PageLayout({ 
  children, 
  title, 
  subtitle, 
  heroImage,
  heroGradient = 'from-blue-900 via-blue-800 to-blue-900',
  showHero = true,
  className = ''
}) {
  return (
    <>
      <Header />
      <main className={`min-h-screen bg-gray-50 ${className}`}>
        {showHero && (
          <section className={`bg-gradient-to-br ${heroGradient} text-white py-16 lg:py-24 relative`}>
            {heroImage && (
              <div className="absolute inset-0 opacity-20">
                <img src={heroImage} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {title && (
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
        
        <div className="relative">
          {children}
        </div>
        
        <Footer />
      </main>
    </>
  )
}