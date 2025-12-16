import { ThoughtsPosts } from 'app/components/posts'
import { baseUrl } from './sitemap'

export default function Page() {
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
    description: 'My corner of the internet where I overthink things in public.',
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
        overthinker. By day, I wrangle code as a product engineer, diving into
        product development, data, and security.
      </p>
      <p className="mb-4 text-justify text-md">
        Turns out being a dad and being an engineer have more in common than
        you'd think: both require debugging mysterious issues at 3 AM, patience
        with unpredictable behavior, and the ability to explain things in five
        different ways until something clicks.
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
