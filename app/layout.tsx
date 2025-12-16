import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from './components/theme-provider'
import { getTheme } from './lib/theme'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | 0xjgv',
    default: '0xjgv'
  },
  description: 'About me & some thoughts.',
  openGraph: {
    description: 'About me & some thoughts.',
    siteName: '0xjgv',
    title: '0xjgv',
    locale: 'en_US',
    type: 'website',
    url: baseUrl
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/rss`,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = await getTheme()

  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
        theme === 'dark' && 'dark'
      )}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-xl mx-auto p-3 min-h-screen">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-black focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>
          <main className="flex-auto min-w-0 flex flex-col justify-center p-3">
            <Navbar />
            <div id="main-content">
              {children}
            </div>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
