import { ThoughtsPosts } from 'app/components/posts'

export const metadata = {
  title: 'Thoughts',
  description: 'Read some of my thoughts.'
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Thoughts</h1>
      <ThoughtsPosts />
    </section>
  )
}
