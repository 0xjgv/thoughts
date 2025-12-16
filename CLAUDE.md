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

```markdown
app/
├── components/    # Reusable components (nav, footer, theme-*)
├── lib/           # Utilities (theme.ts)
├── thoughts/      # Blog section with MDX posts
├── og/, rss/      # API routes (OG images, RSS feed)
└── layout.tsx     # Root layout with metadata
```

## Voice & Tone

This is a corner of the internet where we overthink things in public. Our voice:

- **Self-aware** - acknowledge the absurdity of what we do
- **Relatable** - speak to engineers who've been there at 3 AM
- **Humble** - professional overthinker, not guru
- **Warm** - like chatting with a colleague over coffee
- **Smart casual** - thoughtful without being pretentious

Write as if your audience is principal/staff engineers from SF who appreciate wit and substance in equal measure. No corporate speak, no jargon for jargon's sake.

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
