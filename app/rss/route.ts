import { baseUrl } from 'app/sitemap'
import { getThoughtPosts } from 'app/thoughts/utils'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const allThoughts = await getThoughtPosts()

  const itemsXml = allThoughts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${baseUrl}/thoughts/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/thoughts/${post.slug}</guid>
          <description><![CDATA[${post.metadata.summary || ''}]]></description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
          <author>juan@0xjgv.com (Juan)</author>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>0xjgv - Thoughts</title>
        <link>${baseUrl}</link>
        <description>Personal thoughts and articles by Juan</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
        <managingEditor>juan@0xjgv.com (Juan)</managingEditor>
        <webMaster>juan@0xjgv.com (Juan)</webMaster>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  })
}
