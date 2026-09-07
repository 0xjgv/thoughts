# Improve the personal website's reading and project paths

This ExecPlan follows `/Users/juan/.codex/PLANS.md`. Keep Progress, Surprises & Discoveries, Decision Log, and Outcomes & Retrospective current.

## Purpose / Big Picture

Visitors should understand Juan's focus immediately, find distinct selected and recent writing, inspect two concrete project examples, navigate a long essay by sections, continue to a related article or project, and find an invitation to talk. A dependency-free link check should report persistent broken destinations without treating blocked automated requests as dead websites. Project maintenance labels require confirmation from Juan.

## Progress

- [x] (2026-09-07) Reviewed deployed source and the seven accepted recommendations; read project guidance and reference READMEs.
- [x] (2026-09-07) Assigned only link-checker scripts and package commands to a separate worker; requested project status confirmation.
- [x] (2026-09-07) Implemented homepage, project case studies, article sections, and all nine curated reading paths.
- [x] (2026-09-07) Integrated the dependency-free checker, three tests, documentation, and pull-request/push/manual CI workflow.
- [x] (2026-09-07) Production build, types, all three checker tests, 16 route smoke checks, mobile/desktop layout, native disclosure keyboard controls, contents anchors, and next-read navigation passed.
- [x] (2026-09-07) Recorded final implementation outcome; independent integration inspection found no actionable defects. Project status labels remain pending user confirmation.

## Surprises & Discoveries

The homepage renders the selected article a second time in its post list because the shared list puts featured posts before date order. Project MDX bodies already exist in the parser's output but are not rendered; these can hold case studies without new routes. Article MDX files often repeat the page title as an h2. The contents component only appears with at least three h2/h3 headings, so the longest essay currently has no contents navigation.

## Decision Log

Use existing project MDX bodies, shown in native expandable details on `/projects`, rather than introducing project detail routes. This preserves the compact project list and gives each case study a stable project anchor. Use Harness and Spok, whose public READMEs and local implementations provide concrete examples; do not invent adoption figures or measured outcomes. Date: 2026-09-07, Codex.

Store handpicked next-article and related-project slugs in article frontmatter (the key/value block above each MDX body). Resolve them against loaded content before rendering. This keeps editorial choices with the article and avoids a recommendation algorithm or another service. Date: 2026-09-07, Codex.

Keep featured selection on the homepage separate from a strictly chronological recent list. Preserve the current featured-first archive default. The homepage excludes the selected slug and labels the other section Recent writing. Date: 2026-09-07, Codex.

Use existing LinkedIn as the contact destination. Do not add a form, email address, newsletter, or new dependency. Leave project maintenance labels absent until the user confirms them. Date: 2026-09-07, Codex.

## Outcomes & Retrospective

The six content/navigation improvements and link-checking portion of the seventh recommendation are implemented and verified. No project status labels have been asserted without confirmation. The deployed baseline for rollback is commit 9ecffb2 on main. Independent integration inspection found no actionable defects. The changes are ready for the existing Vercel deployment path; project labels are the only deferred item.

## Context and Orientation

The working directory is `/Users/juan/Code/thoughts`. This is a Next.js 16 and React 19 website with Tailwind CSS and local MDX content. `app/page.tsx` is the homepage; `app/components/posts.tsx` renders the reusable article list. `app/projects/page.tsx` reads descriptions from `app/projects/posts/*.mdx` through `app/projects/utils.ts`. `app/thoughts/[slug]/page.tsx` renders article metadata, contents, MDX, and share links. `app/thoughts/utils.ts` parses article frontmatter. `app/components/mdx.tsx` provides consistent headings, code, and links. `app/components/table-of-contents.tsx` discovers article headings in the browser. There is no existing CI workflow or test framework; Node's test runner is available without installation. npm works locally; Bun commands remain documented for existing users.

## Plan of Work

First revise the homepage lead and add a concise LinkedIn invitation. Extend ThoughtsPosts with optional exclusions and recent ordering so the homepage renders one selected article and three different recent articles. Keep archive behavior unchanged by default.

Then write two short project case studies in existing Harness and Spok MDX bodies. Each explains the problem, the implemented approach, a concrete trade-off evident in its design, and a working usage example with a primary source link. Render nonempty bodies inside native details on project cards, with anchors matching project slugs.

Next remove duplicate title headings from article bodies and add meaningful section breaks to the long self-healing essay. Preserve the original title anchor on the page heading. Add nextThought and relatedProject metadata where editorially relevant. Resolve destinations in the article page and display one Read next link on every article plus a project link when applicable. Existing paragraph content and publication dates remain intact.

Finally integrate `scripts/check-links.mjs`, its built-in Node tests, package commands, and a GitHub workflow. Run on pull requests, pushes to main, and manual dispatch; avoid an unsolicited recurring automation. The workflow needs only source checkout and Node, not dependency installation. A command documents successful links, persistent DNS/404/410 failures, and inconclusive access/network warnings separately.

## Concrete Steps

Run commands from `/Users/juan/Code/thoughts`:

    npm run test:links
    npm run check:links
    npm run build
    node node_modules/typescript/bin/tsc --noEmit --incremental false
    npm run start -- --hostname 127.0.0.1 --port 3217

Use the production server to inspect `/`, `/projects`, `/thoughts`, all nine article routes, `/rss`, `/llms.txt`, `/robots.txt`, and `/sitemap.xml`. Inspect the homepage, expanded case studies, and contents/read-next controls in a browser at desktop and narrow widths. Build-generated unrelated configuration edits must not be retained.

## Validation and Acceptance

The homepage presents the demo/production focus in its opening copy, keeps family context, links to LinkedIn with a conversational invitation, and shows four unique article destinations across selected and recent sections. Recent entries are newest first.

Both case studies open with native keyboard-accessible controls and have distinct stable anchors. All next-article links resolve to another existing article; project links reach the correct project anchor. Every article has one visible title, and the long essay's contents links reach named sections. Existing RSS entry IDs remain stable.

The link checker tests prove redirect success, repeated missing-page failure, transient failure recovery, blocked-access warnings, and network/DNS classification. Live checking must not misreport LinkedIn's automated-access denial as a missing destination. Build and type checks pass. Browser inspection confirms no horizontal overflow and usable article navigation in both light and dark themes.

## Idempotence and Recovery

All changes are source-only and can be reverted. No migrations, stored user data, deployment configuration, or new application dependencies are introduced. The link checker is read-only and can be rerun. GitHub deployment remains the existing Vercel integration; a source revert restores prior site behavior.

## Artifacts and Notes

Verification output:

    3 checker tests passed.
    12 external links: 11 passed, 0 failed, 1 uncertain (LinkedIn HTTP 999 twice).
    PASS: 16 routes; homepage uniqueness and dates; two case studies; all nine curated reading paths; unique IDs and titles; internal links and anchors; canonical URLs; stable RSS IDs.

Browser verification showed native Enter-key expansion of both case studies, working contents URL fragments, a correct next-article transition without stale contents, and no horizontal overflow at 390px or 1280px widths.

The two public evidence sources are `https://github.com/0xjgv/harness` and `https://github.com/0xjgv/spok`, read on 2026-09-07. Harness documents a common command contract across language templates, including mutating local checks and read-only CI checks. Spok documents explore/propose/apply/archive and one chunk per apply invocation, with specifications stored in the project.

## Interfaces and Dependencies

ThoughtsPosts gains optional `excludeSlugs: string[]` and `order: 'featured' | 'recent'` props. Article metadata gains optional `nextThought: string` and `relatedProject: string` fields. All UI uses existing Next Link, CustomMDX, and Tailwind classes. The link checker uses Node standard modules and fetch with bounded retries; no packages are added. Project status support is conditional on a confirmed user response.

Revision: initial executable plan, written before editing application behavior.

Revision: recorded implementation and verification. Contents links now use native fragment navigation so URLs, browser history, and keyboard behavior work; the component remounts per article to discard old headings. Existing article-title fragment IDs remain on h1, and The Gradient section headings were promoted to h2 after removing its repeated title.

Revision: independent integration inspection completed with no findings; implementation is complete within the confirmed content scope. Publication and live verification use the existing main-branch deployment.
