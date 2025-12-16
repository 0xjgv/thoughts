import { getProjects } from './utils'
import Link from 'next/link'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Some things I have built.',
  openGraph: {
    title: 'Projects',
    description: 'Some things I have built.',
    type: 'website',
    url: `${baseUrl}/projects`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description: 'Some things I have built.',
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1"
      aria-hidden="true"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ProjectsPage() {
  const projects = getProjects()

  const sortedProjects = projects.sort((a, b) => {
    if (a.metadata.featured && !b.metadata.featured) return -1
    if (!a.metadata.featured && b.metadata.featured) return 1
    return (a.metadata.order || 0) - (b.metadata.order || 0)
  })

  // Generate structured data for projects
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    description: 'Some things I have built.',
    url: `${baseUrl}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sortedProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.metadata.title,
          description: project.metadata.description,
          ...(project.metadata.url && { url: project.metadata.url }),
          ...(project.metadata.github && {
            codeRepository: project.metadata.github
          }),
          applicationCategory: 'WebApplication',
        },
      })),
    },
  }

  return (
    <section className="animate-fade-in">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      {sortedProjects.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          Projects coming soon.
        </p>
      ) : (
        <div className="animate-stagger space-y-6">
          {sortedProjects.map((project) => (
            <div
              key={project.slug}
              className="group"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {project.metadata.title}
                  </h2>
                  <div className="flex gap-2 shrink-0">
                    {project.metadata.github && (
                      <Link
                        href={project.metadata.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                      >
                        GitHub
                        <ArrowIcon />
                      </Link>
                    )}
                    {project.metadata.url && (
                      <Link
                        href={project.metadata.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                      >
                        Live
                        <ArrowIcon />
                      </Link>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.metadata.description}
                </p>
                {project.metadata.tags && project.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
