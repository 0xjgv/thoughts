import { formatDate, getThoughtPosts } from 'app/thoughts/utils'
import Link from 'next/link'

export function ThoughtsPosts({
  limit,
  excludeSlugs = [],
  order = 'featured',
}: {
  limit?: number
  excludeSlugs?: string[]
  order?: 'featured' | 'recent'
} = {}) {
  let allThoughts = getThoughtPosts()

  return (
    <div className="animate-stagger space-y-7">
      {allThoughts
        .filter((post) => !excludeSlugs.includes(post.slug))
        .sort((a, b) => {
          if (order === 'featured') {
            if (a.metadata.featured && !b.metadata.featured) return -1
            if (!a.metadata.featured && b.metadata.featured) return 1
          }
          return Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt)
        })
        .slice(0, limit)
        .map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col space-y-2"
            href={`/thoughts/${post.slug}`}
          >
            <div className="w-full flex flex-col gap-1 md:flex-row md:gap-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 md:w-36 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 flex flex-col">
                <span className="flex items-center gap-2">
                  <span className="transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
                    {post.metadata.title}
                  </span>
                </span>
                {post.metadata.summary && (
                  <span className="text-sm leading-6 text-neutral-500 dark:text-neutral-400 font-normal">
                    {post.metadata.summary}
                  </span>
                )}
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm tabular-nums">
                {post.metadata.readingTime} min
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
