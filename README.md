# Thoughts — Personal Website

Juan's personal website at [0xjgv.space](https://0xjgv.space), with thoughts and projects.

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Dark mode toggle with theme persistence
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

## How to Use

Develop the app:
```bash
bun dev
```

Build and run the production app locally:
```bash
bun build
bun start
```

## Content checks

Run `npm run check:links` (or `bun run check:links`) to check literal external
URLs in the site's source. The checker retries each unsuccessful request once.
Repeated missing pages (404/410) or DNS-not-found errors fail the check; blocked
requests, rate limits, and other network errors are reported as uncertain and
need manual verification. It does not check page fragments, dynamic URLs, or
error pages that return HTTP 200.

Run `npm run test:links` for the checker's local tests. Both commands also run
in GitHub Actions on pull requests and pushes to `main`, or by manual dispatch.

Article frontmatter can specify `nextThought` with another article's filename
(without `.mdx`) and `relatedProject` with a project filename. These control
the handpicked links below each essay. Case studies live in the body of project
MDX files and appear as expandable sections on the projects page.
