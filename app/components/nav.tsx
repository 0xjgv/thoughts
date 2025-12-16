'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const navItems = {
  '/': {
    name: 'about'
  },
  '/thoughts': {
    name: 'thoughts'
  },
  '/projects': {
    name: 'projects'
  }
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
          aria-label="Main navigation"
        >
          <div className="flex flex-row items-center space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? 'font-bold text-neutral-800 dark:text-neutral-200' : 'text-neutral-500'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {name}
                </Link>
              )
            })}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
