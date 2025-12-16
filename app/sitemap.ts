import { getThoughtPosts } from 'app/thoughts/utils'
import { getProjects } from 'app/projects/utils'

export const baseUrl = 'https://0xjgv.vercel.app'

export default async function sitemap() {
  const thoughts = getThoughtPosts().map((post) => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }))

  // Include projects page in sitemap
  const routes = ['', '/thoughts', '/projects'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...thoughts]
}
