import { formatDate, getThoughtPosts } from 'app/thoughts/utils'
import Link from 'next/link'

export function ThoughtsPosts() {
  let allThoughts = getThoughtPosts()

  return (
    <div className="animate-stagger">
      {allThoughts
        .sort((a, b) => {
          // Featured posts come first
          if (a.metadata.featured && !b.metadata.featured) return -1
          if (!a.metadata.featured && b.metadata.featured) return 1
          // Then sort by date
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/thoughts/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[175px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1 flex flex-col">
                <span className="flex items-center gap-2">
                  {post.metadata.title}
                  {post.metadata.featured && (
                    <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </span>
                {post.metadata.summary && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                    {post.metadata.summary}
                  </span>
                )}
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm tabular-nums">
                {post.metadata.readingTime} min
              </p>
            </div>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
    </div>
  )
}
