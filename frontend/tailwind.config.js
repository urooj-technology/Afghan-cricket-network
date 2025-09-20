/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        en: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        ps: ['Noto Sans Arabic', 'Tahoma', 'Arial Unicode MS', 'sans-serif'],
        fa: ['Noto Sans Arabic', 'Tahoma', 'Arial Unicode MS', 'sans-serif'],
      },
      spacing: {
        'rtl-1': '0.25rem',
        'rtl-2': '0.5rem',
        'rtl-3': '0.75rem',
        'rtl-4': '1rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl-space-x-1 > :not([hidden]) ~ :not([hidden])': {
          'margin-right': '0.25rem',
          'margin-left': '0',
        },
        '.rtl-space-x-2 > :not([hidden]) ~ :not([hidden])': {
          'margin-right': '0.5rem',
          'margin-left': '0',
        },
        '.rtl-space-x-3 > :not([hidden]) ~ :not([hidden])': {
          'margin-right': '0.75rem',
          'margin-left': '0',
        },
        '.rtl-space-x-4 > :not([hidden]) ~ :not([hidden])': {
          'margin-right': '1rem',
          'margin-left': '0',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
