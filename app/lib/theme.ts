import { cookies } from 'next/headers'

export type Theme = 'light' | 'dark' | 'system'

export const THEME_COOKIE = 'theme'

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_COOKIE)?.value
  return theme === 'light' || theme === 'dark' || theme === 'system' ? theme : 'system'
}
