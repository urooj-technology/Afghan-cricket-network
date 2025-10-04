// Professional Theme Configuration for Afghan Cricket Network

export const theme = {
  // Brand Colors
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    cricket: {
      green: '#22c55e',
      red: '#ef4444',
      gold: '#f59e0b',
      pitch: '#84cc16',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    }
  },

  // Typography
  fonts: {
    en: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
    },
    ps: {
      sans: ['Noto Sans Arabic', 'Amiri', 'Scheherazade New', 'Arial Unicode MS', 'Tahoma', 'sans-serif'],
      display: ['Amiri', 'Scheherazade New', 'Noto Sans Arabic', 'sans-serif'],
    },
    fa: {
      sans: ['Noto Sans Arabic', 'Vazirmatn', 'Sahel', 'Tahoma', 'Arial Unicode MS', 'sans-serif'],
      display: ['Vazirmatn', 'Sahel', 'Noto Sans Arabic', 'sans-serif'],
    }
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    hard: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(59, 130, 246, 0.15)',
    'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component Variants
  components: {
    button: {
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
      },
      variants: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50',
        success: 'bg-secondary-600 text-white hover:bg-secondary-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white',
      }
    },
    card: {
      variants: {
        default: 'bg-white rounded-2xl shadow-soft border border-neutral-200',
        elevated: 'bg-white rounded-2xl shadow-medium border border-neutral-200',
        glass: 'bg-white/90 backdrop-blur-xl border border-white/30 shadow-medium rounded-2xl',
      }
    },
    input: {
      sizes: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
      },
      variants: {
        default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        success: 'border-secondary-300 focus:border-secondary-500 focus:ring-secondary-500',
      }
    }
  }
}

// Utility functions for theme usage
export const getColor = (colorPath) => {
  const keys = colorPath.split('.')
  let value = theme.colors
  for (const key of keys) {
    value = value[key]
    if (!value) return null
  }
  return value
}

export const getFontFamily = (language, type = 'sans') => {
  return theme.fonts[language]?.[type] || theme.fonts.en[type]
}

export const getSpacing = (size) => {
  return theme.spacing[size] || size
}

export const getShadow = (type) => {
  return theme.shadows[type] || theme.shadows.soft
}

export const getTransition = (speed = 'normal') => {
  return theme.transitions[speed]
}

// CSS-in-JS helper for dynamic styles
export const createThemeStyles = (language = 'en') => ({
  fontFamily: getFontFamily(language),
  direction: language === 'en' ? 'ltr' : 'rtl',
  textAlign: language === 'en' ? 'left' : 'right',
})

export default theme