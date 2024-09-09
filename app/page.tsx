import { ThoughtsPosts } from 'app/components/posts'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About me</h1>
      <p className="mb-4 text-justify text-md">
        {
          "Hi! I'm Juan, a father, husband, and sports enthusiast, who also happens to be a software engineer. My journey has led me through web development, data, and security, each shaping how I approach creating value in the digital world. Currently, I'm diving into the exciting world of AI/ML at "
        }
        <Link href="https://www.epilot.cloud/en" className="text-blue-500">
          epilot
        </Link>
        {", where I'm learning and growing every day."}
      </p>
      <p className="mb-4 text-justify text-md">
        {
          'At home, being a dad and husband has taught me that raising a family and building tech share a lot in common—patience, creativity, and embracing the unknown. Both keep me curious and eager to learn more.'
        }
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
