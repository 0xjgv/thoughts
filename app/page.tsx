import { ThoughtsPosts } from 'app/components/posts'
import { baseUrl } from './sitemap'

export default function Page() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Juan',
    url: baseUrl,
    jobTitle: 'Software Engineer',
    knowsAbout: ['Web Development', 'Data', 'Security', 'AI/ML'],
    sameAs: [
      'https://github.com/0xjgv',
      'https://www.linkedin.com/in/jgv/',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '0xjgv',
    url: baseUrl,
    description: 'About me & some thoughts.',
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
        Hi! I'm Juan, a father, husband, and sports enthusiast. In my
        professional life, I'm a software engineer with a passion for web
        development, data, and security. Now, I'm reexploring the fascinating
        world of AI/ML, where every day brings new opportunities to learn and
        grow.
      </p>
      <p className="mb-4 text-justify text-md">
        In both my personal and professional life, I've found surprising
        parallels. Being a dad has taught me patience, creativity, and how to
        be patient (😂).
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
