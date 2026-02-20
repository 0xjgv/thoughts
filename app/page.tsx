import { ThoughtsPosts } from 'app/components/posts'
import { Newsletter } from 'app/components/newsletter'
import Link from 'next/link'
import { baseUrl } from './sitemap'

export default function Page() {
  const hardDecisions = [
    {
      slug: 'research-design-plan-implement',
      title: 'Research → Design → Plan → Implement',
      problem: 'How do we ship medium-size features without blowing up context?',
      options: 'Ad hoc coding vs. a phased loop with explicit checkpoints.',
      tradeoff: 'Fast starts often create expensive rework and context thrash.',
      decision: 'Use a 4-step workflow to keep quality and throughput stable.',
    },
    {
      slug: 'the-fire-chief',
      title: 'The Fire Chief',
      problem: 'How do teams solve high-risk problems without one fragile bet?',
      options: 'One big push vs. many coordinated small pushes.',
      tradeoff: 'Big pushes are simple to explain but brittle in execution.',
      decision: 'Coordinate many safe efforts to converge on one outcome.',
    },
    {
      slug: 'leaks',
      title: 'Leaks',
      problem: 'How do we diagnose product problems that dashboards hide?',
      options: 'Internal instrumentation only vs. direct user observation.',
      tradeoff: 'Telemetry scales, but distance can hide root causes.',
      decision: 'Go to the source: observe users where problems happen.',
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
    description: 'Thoughts on the messy reality of building products—the decisions, trade-offs, and lessons nobody talks about.',
    author: {
      '@type': 'Person',
      name: 'Juan',
    },
  }

  return (
    <section className="flex flex-col items-center justify-center animate-fade-in">
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
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About me</h1>
      <p className="mb-4 text-justify text-md">
        Hi! I'm Juan—father, husband, sports enthusiast, and professional
        overthinker. I write about the messy reality of building products—the
        decisions, trade-offs, and lessons nobody talks about. By day, I wrangle
        code as a product engineer, diving into product development, data, and
        security.
      </p>
      <p className="mb-4 text-justify text-md">
        Turns out being a dad and being an engineer have more in common than
        you'd think: both require debugging mysterious issues at 3 AM, patience
        with unpredictable behavior, and the ability to explain things in five
        different ways until something clicks.
      </p>
      <div className="my-8 w-full">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          Start Here: Hard Decisions
        </h2>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Problem, options, tradeoffs, decision. No fluff.
        </p>
        <div className="space-y-3">
          {hardDecisions.map((item) => (
            <Link
              key={item.slug}
              href={`/thoughts/${item.slug}`}
              className="block rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {item.title}
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Problem:
                  </span>{' '}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    {item.problem}
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Options:
                  </span>{' '}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    {item.options}
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Tradeoff:
                  </span>{' '}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    {item.tradeoff}
                  </span>
                </p>
                <p>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Decision:
                  </span>{' '}
                  <span className="text-neutral-700 dark:text-neutral-200">
                    {item.decision}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm">
          <Link
            href="/thoughts"
            className="text-neutral-700 dark:text-neutral-200 underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2"
          >
            Browse all thoughts
          </Link>
        </p>
      </div>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
      <div className="my-8 w-full">
        <Newsletter />
      </div>
    </section>
  )
}
