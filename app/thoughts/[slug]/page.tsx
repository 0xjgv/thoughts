import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'
import { formatDate, getThoughtPosts } from 'app/thoughts/utils'
import { notFound } from 'next/navigation'
import { ProgressBar } from 'app/components/progress-bar'
import { TableOfContents } from 'app/components/table-of-contents'

export async function generateStaticParams() {
  const posts = getThoughtPosts()

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getThoughtPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/thoughts/${post.slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function Thoughts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getThoughtPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="animate-fade-in">
      <ProgressBar />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ThoughtPost',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/thoughts/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio'
            }
          })
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {post.metadata.readingTime} min read
        </p>
      </div>
      {post.metadata.tags && post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-8">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <TableOfContents />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
