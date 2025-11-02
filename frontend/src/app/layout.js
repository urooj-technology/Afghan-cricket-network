import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import { AuthProvider } from '../contexts/AuthContext'
import DynamicLayout from '../components/layout/DynamicLayout'
import QueryProvider from '../providers/QueryProvider'

export const metadata = {
  title: 'Afghan Cricket Network - د افغانستان کرکټ شبکه',
  description: 'Official website of Afghan Cricket Network - featuring news, rankings, events, and media coverage of cricket in Afghanistan',
  keywords: 'Afghanistan, Cricket, Afghan Cricket, Cricket Network, Cricket News, Cricket Rankings',
  authors: [{ name: 'Afghan Cricket Network' }],
  openGraph: {
    title: 'Afghan Cricket Network - د افغانستان کرکټ شبکه',
    description: 'Official website of Afghan Cricket Network',
    url: 'https://afghancricketnetwork.com',
    siteName: 'Afghan Cricket Network',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Afghan Cricket Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afghan Cricket Network - د افغانستان کرکټ شبکه',
    description: 'Official website of Afghan Cricket Network',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-en" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <LanguageProvider>
              <DynamicLayout>
                {children}
              </DynamicLayout>
            </LanguageProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}


