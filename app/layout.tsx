import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Footer from './components/footer'
import { Navbar } from './components/nav'
import { ThemeProvider } from './components/theme-provider'
import './global.css'
import { getTheme } from './lib/theme'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | 0xjgv',
    default: '0xjgv'
  },
  description: 'My corner of the internet where I overthink things in public.',
  openGraph: {
    description: 'My corner of the internet where I overthink things in public.',
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
  }
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
          <main className="flex-auto min-w-0 flex flex-col justify-center p-3">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
