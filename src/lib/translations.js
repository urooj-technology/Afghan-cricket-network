// Import all translation files
import { common as enCommon } from '../locales/en/common'
import { home as enHome } from '../locales/en/home'
import { about as enAbout } from '../locales/en/about'
import { contact as enContact } from '../locales/en/contact'
import { events as enEvents } from '../locales/en/events'
import { media as enMedia } from '../locales/en/media'
import { news as enNews } from '../locales/en/news'
import { rankings as enRankings } from '../locales/en/rankings'
import { team as enTeam } from '../locales/en/team'

import { common as psCommon } from '../locales/ps/common'
import { home as psHome } from '../locales/ps/home'
import { about as psAbout } from '../locales/ps/about'
import { contact as psContact } from '../locales/ps/contact'
import { events as psEvents } from '../locales/ps/events'
import { media as psMedia } from '../locales/ps/media'
import { news as psNews } from '../locales/ps/news'
import { rankings as psRankings } from '../locales/ps/rankings'
import { team as psTeam } from '../locales/ps/team'

// Combine all translations for each language
const translations = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    contact: enContact,
    events: enEvents,
    media: enMedia,
    news: enNews,
    rankings: enRankings,
    team: enTeam,
  },
  ps: {
    common: psCommon,
    home: psHome,
    about: psAbout,
    contact: psContact,
    events: psEvents,
    media: psMedia,
    news: psNews,
    rankings: psRankings,
    team: psTeam,
  },
}

/**
 * Get translation for a given key and language
 * @param {string} language - The language code ('en' or 'ps')
 * @param {string} key - The translation key (e.g., 'nav.home', 'hero.title')
 * @returns {string} The translated text or the key if not found
 */
export function getTranslation(language, key) {
  const langTranslations = translations[language] || translations.en
  
  // Split the key by dots to access nested properties
  const keys = key.split('.')
  let value = langTranslations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // If translation not found, try English as fallback
      if (language !== 'en') {
        const enValue = getTranslation('en', key)
        if (enValue !== key) {
          return enValue
        }
      }
      // Return the key if no translation found
      return key
    }
  }
  
  return value || key
}
