import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4 text-justify text-md">
        {"Hi, I'm Juan, a software engineer with a passion for product development. My journey spans web, data, cybersecurity, and reverse engineering. Right now, I'm driving innovation at epilot, where we're transforming the energy sector into something as seamless and user-friendly as Shopify."}
      </p>
      <div className="my-8 self-start">
        <BlogPosts />
      </div>
    </section>
  )
}
