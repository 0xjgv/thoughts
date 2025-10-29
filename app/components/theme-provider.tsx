'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  systemPrefersDark: boolean
} | undefined>(undefined)

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`
}

function getInitialTheme(): Theme {
  const cookie = getCookie('theme')
  return cookie === 'light' || cookie === 'dark' || cookie === 'system' ? cookie : 'system'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)

  // Track system preference and apply theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const root = document.documentElement

    const updateTheme = () => {
      const prefersDark = mediaQuery.matches
      setSystemPrefersDark(prefersDark)

      root.classList.remove('dark')
      const shouldBeDark = theme === 'dark' || (theme === 'system' && prefersDark)
      if (shouldBeDark) root.classList.add('dark')
    }

    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setCookie('theme', newTheme)
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemPrefersDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
