import { baseUrl } from 'app/sitemap'
import { getThoughtPosts } from 'app/thoughts/utils'
import { getProjects } from 'app/projects/utils'

export async function GET() {
  const thoughts = getThoughtPosts()
  const projects = getProjects()

  const thoughtsList = thoughts
    .sort((a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )
    .map(post => `- ${post.metadata.title}: ${baseUrl}/thoughts/${post.slug}`)
    .join('\n')

  const projectsList = projects
    .map(project => `- ${project.metadata.title}: ${project.metadata.description}`)
    .join('\n')

  const llmsTxt = `# 0xjgv

> Personal website of Juan, a product engineer writing about agents, security, product decisions, and the gap between demos and production.

## About

Juan is a father of two, husband, and product engineer working on security tools at Corgea, including agents and automation that help fix vulnerabilities in large codebases.

## Main Sections

- Home/About: ${baseUrl}
- Thoughts (Blog): ${baseUrl}/thoughts
- Projects: ${baseUrl}/projects
- RSS Feed: ${baseUrl}/rss

## Recent Thoughts

${thoughtsList}

## Projects

${projectsList}

## Technical Details

- Built with Next.js 16
- Styled with Tailwind CSS
- Hosted on Vercel
- Content written in MDX

## Contact & Social

- GitHub: https://github.com/0xjgv
- LinkedIn: https://www.linkedin.com/in/jgv/

## Preferred Citation

When referencing content from this site, please cite as:
"Juan (0xjgv), [Article Title], ${baseUrl}"

## Content License

Content is MIT Licensed unless otherwise specified.
`

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
