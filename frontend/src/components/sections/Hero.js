'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRightIcon, PlayIcon, TrophyIcon, UsersIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import RTLWrapper from '../ui/RTLWrapper'

const heroSlides = [
  {
    id: 1,
    titleKey: 'home.hero.slide1.title',
    subtitleKey: 'home.hero.slide1.subtitle',
    ctaKey: 'home.hero.slide1.cta',
    gradient: 'from-blue-900 via-blue-800 to-blue-900'
  },
  {
    id: 2,
    titleKey: 'home.hero.slide2.title',
    subtitleKey: 'home.hero.slide2.subtitle',
    ctaKey: 'home.hero.slide2.cta',
    gradient: 'from-emerald-900 via-emerald-800 to-emerald-900'
  },
  {
    id: 3,
    titleKey: 'home.hero.slide3.title',
    subtitleKey: 'home.hero.slide3.subtitle',
    ctaKey: 'home.hero.slide3.cta',
    gradient: 'from-purple-900 via-purple-800 to-purple-900'
  }
]

const stats = [
  { 
    icon: TrophyIcon, 
    valueKey: 'home.hero.stats.tournaments.value', 
    labelKey: 'home.hero.stats.tournaments.label' 
  },
  { 
    icon: UsersIcon, 
    valueKey: 'home.hero.stats.fans.value', 
    labelKey: 'home.hero.stats.fans.label' 
  },
  { 
    icon: CalendarIcon, 
    valueKey: 'home.hero.stats.matches.value', 
    labelKey: 'home.hero.stats.matches.label' 
  }
]

export default function Hero() {
  const { language, isRTL } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <RTLWrapper>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full animate-pulse delay-3000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight opacity-0 animate-fade-in-up ${isRTL ? 'font-arabic' : ''}`}>
                <span className="block">
                  {getTranslation(language, currentSlideData.titleKey)}
                </span>
              </h1>
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-300 ${isRTL ? 'font-arabic' : ''}`}>
                {getTranslation(language, currentSlideData.subtitleKey)}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-fade-in-up animation-delay-600">
              <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link
                  href="/news"
                  className={`group inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span className={isRTL ? 'ml-3' : 'mr-3'}>
                    {getTranslation(language, currentSlideData.ctaKey)}
                  </span>
                  <ChevronRightIcon className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
                <button className={`group inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105 text-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <PlayIcon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span>{getTranslation(language, 'home.hero.watchHighlights')}</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="opacity-0 animate-fade-in-up animation-delay-900">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                      {getTranslation(language, stat.valueKey)}
                    </div>
                    <div className={`text-blue-100 text-base lg:text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>
                      {getTranslation(language, stat.labelKey)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 animate-bounce ${isRTL ? 'left-8' : 'right-8'}`}>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Custom CSS for animations and fonts */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
          
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
          
          .animation-delay-900 {
            animation-delay: 0.9s;
          }
          
          .font-arabic {
            font-family: 'Noto Sans Arabic', 'Noto Naskh Arabic', 'Amiri', 'Vazir', 'Tahoma', sans-serif;
            line-height: 1.8;
            letter-spacing: 0.02em;
            font-weight: 600;
          }
          
          .font-arabic h1 {
            line-height: 1.3;
            font-weight: 700;
          }
          
          .font-arabic p {
            line-height: 1.9;
            font-weight: 500;
          }
          
          @media (max-width: 640px) {
            .font-arabic {
              line-height: 1.7;
            }
            
            .font-arabic h1 {
              line-height: 1.2;
            }
            
            .font-arabic p {
              line-height: 1.8;
            }
          }
          
          /* Enhanced RTL support */
          [dir="rtl"] .group-hover\\:translate-x-1:hover {
            transform: translateX(-0.25rem);
          }
          
          [dir="rtl"] .animate-bounce {
            left: 2rem;
            right: auto;
          }
          
          /* Better text rendering for Arabic */
          .font-arabic * {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </section>
    </RTLWrapper>
  )
}