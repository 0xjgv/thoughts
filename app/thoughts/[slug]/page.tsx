import { CustomMDX, slugify } from 'app/components/mdx'
import Link from 'next/link'
import { getProjects } from 'app/projects/utils'
import { ShareButtons } from 'app/components/share-buttons'
import { baseUrl } from 'app/sitemap'
import { formatDate, getThoughtPosts } from 'app/thoughts/utils'
import { notFound } from 'next/navigation'
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
    },
    alternates: {
      canonical: `${baseUrl}/thoughts/${post.slug}`,
    },
  }
}

export default async function Thoughts({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = getThoughtPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const nextThought = posts.find(
    (candidate) => candidate.slug === post.metadata.nextThought && candidate.slug !== slug
  )
  const relatedProject = post.metadata.relatedProject
    ? getProjects().find((project) => project.slug === post.metadata.relatedProject)
    : undefined

  return (
    <section className="animate-fade-in">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/thoughts/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Juan',
              url: baseUrl
            },
            publisher: {
              '@type': 'Person',
              name: 'Juan',
              url: baseUrl
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/thoughts/${post.slug}`
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Thoughts',
                item: `${baseUrl}/thoughts`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.metadata.title,
                item: `${baseUrl}/thoughts/${post.slug}`
              }
            ]
          })
        }}
      />
      <h1 id={slugify(post.metadata.title)} className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-3 mb-10 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          {post.metadata.readingTime} min read
        </p>
      </div>
      {post.metadata.tags && post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-500 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <TableOfContents key={post.slug} />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        {nextThought && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">Read next</h2>
            <Link
              href={`/thoughts/${nextThought.slug}`}
              className="font-medium underline decoration-neutral-400 underline-offset-4 hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300"
            >
              {nextThought.metadata.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {nextThought.metadata.summary}
            </p>
          </div>
        )}
        {relatedProject && (
          <p className="mb-8 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            Put this into practice:{' '}
            <Link
              href={`/projects#${relatedProject.slug}`}
              className="text-neutral-800 underline decoration-neutral-400 underline-offset-4 hover:text-neutral-600 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:text-neutral-300"
            >
              {relatedProject.metadata.title}
            </Link>
            {' — '}{relatedProject.metadata.description}
          </p>
        )}
        <ShareButtons
          title={post.metadata.title}
          url={`${baseUrl}/thoughts/${post.slug}`}
        />
      </div>
    </section>
  )
}
