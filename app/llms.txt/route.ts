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
    .sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0))
    .map(project => `- ${project.metadata.title}: ${project.metadata.description}`)
    .join('\n')

  const llmsTxt = `# 0xjgv

> Making AI agents trustworthy, secure, one tool at a time.

## About

Juan is a Product Security Engineer at Corgea, a father of two, and a husband. He builds tools for agent workflows, security, and code quality.

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
