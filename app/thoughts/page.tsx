import { ThoughtsPosts } from 'app/components/posts'
import { baseUrl } from 'app/sitemap'

export const metadata = {
  title: 'Thoughts',
  description: 'Read some of my thoughts.',
  alternates: {
    canonical: `${baseUrl}/thoughts`,
  },
}

export default function Page() {
  return (
    <section className="animate-fade-in">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Thoughts</h1>
      <ThoughtsPosts />
    </section>
  )
}
