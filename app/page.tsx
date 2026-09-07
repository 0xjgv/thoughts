import { ThoughtsPosts } from 'app/components/posts'
import Link from 'next/link'
import { baseUrl } from './sitemap'

export default function Page() {
  const highlights = [
    {
      slug: 'self-correcting-isnt-self-healing',
      title: "Self-Correcting Isn't Self-Healing",
      hook: 'On the difference between an agent that recovers and one that actually learns.',
    },
  ]

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Juan',
    url: baseUrl,
    jobTitle: 'Product Engineer',
    knowsAbout: ['Product Engineering', 'Data', 'Security', 'AI/ML'],
    sameAs: [
      'https://www.linkedin.com/in/jgv/',
      'https://github.com/0xjgv',
      'https://x.com/0xjgv'
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '0xjgv',
    url: baseUrl,
    description: 'Notes on agents, security, product decisions, and the gap between demos and production.',
    author: {
      '@type': 'Person',
      name: 'Juan',
    },
  }

  return (
    <section className="flex flex-col animate-fade-in">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <h1 className="mb-10 text-2xl font-semibold tracking-tighter">About me</h1>
      <p className="mb-5 text-base leading-7 text-neutral-800 dark:text-neutral-200">
        I'm interested in the gap between what demos promise and what production
        systems survive. I write about agents, security, and the decisions that
        shape the things we build.
      </p>
      <p className="mb-5 text-base leading-7 text-neutral-800 dark:text-neutral-200">
        Hi, I'm Juan. Father of two, husband, and product engineer. I'm working
        on security tools at{' '}
        <Link
          href="https://corgea.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300"
        >
          Corgea
        </Link>
        , including agents and other automation, to help fix vulnerabilities in
        large codebases.
      </p>
      <p className="mb-5 text-base leading-7 text-neutral-800 dark:text-neutral-200">
        Being a dad twice over has made me more patient with systems that do not
        behave the way the manual says they should. That turns out to be useful
        at work too.
      </p>
      <p className="text-base leading-7 text-neutral-800 dark:text-neutral-200">
        Working on agent reliability or security?{' '}
        <Link
          href="https://www.linkedin.com/in/jgv/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 hover:text-neutral-600 dark:decoration-neutral-600 dark:hover:text-neutral-300"
        >
          Let's compare notes.
        </Link>
      </p>
      <div className="my-12 w-full">
        <h2 className="mb-3 text-xl font-semibold tracking-tight">
          Start here
        </h2>
        <div className="space-y-6">
          {highlights.map((item) => (
            <Link
              key={item.slug}
              href={`/thoughts/${item.slug}`}
              className="group block transition-colors"
            >
              <p className="font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {item.hook}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm">
          <Link
            href="/thoughts"
            className="text-neutral-700 dark:text-neutral-200 underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2"
          >
            Browse all thoughts
          </Link>
        </p>
      </div>
      <div className="my-12 w-full">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">Recent writing</h2>
        <ThoughtsPosts
          limit={3}
          excludeSlugs={highlights.map((item) => item.slug)}
          order="recent"
        />
      </div>
    </section>
  )
}
