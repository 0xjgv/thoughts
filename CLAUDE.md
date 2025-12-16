# Thoughts - Personal Website

Personal website showcasing thoughts and projects. Values: **simplicity, kindness, and accessibility** (POUR: Perceivable, Operable, Understandable, Robust).

## Commands

```bash
bun dev      # Development server at localhost:3000
bun build    # Production build
bun start    # Run production server
```

## Tech Stack

- Next.js 16 (App Router, Server Components)
- React 19, TypeScript
- Tailwind CSS 4 (utility-first, `dark:` prefix for dark mode)
- MDX for blog content (`app/thoughts/posts/`)

## Project Structure

```
app/
├── components/    # Reusable components (nav, footer, theme-*)
├── lib/           # Utilities (theme.ts)
├── thoughts/      # Blog section with MDX posts
├── og/, rss/      # API routes (OG images, RSS feed)
└── layout.tsx     # Root layout with metadata
```

## Code Patterns

- **Server Components by default** - only add `'use client'` when needed
- **Semantic HTML** - use `<main>`, `<nav>`, `<article>`, `<section>`
- **Accessibility first** - include `aria-label` on icon buttons, `lang` on html
- **Dark mode** - class-based (`dark` on `<html>`), cookie-persisted
- **Styling** - Tailwind utilities only, `neutral-*` color palette
- **Exports** - named exports for components, default for pages

## Accessibility Checklist

- Semantic HTML structure
- ARIA labels for interactive elements without visible text
- `rel="noopener noreferrer"` on external links
- Color contrast for readability
- Keyboard navigable (focus styles)
