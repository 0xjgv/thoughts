import { ThoughtsPosts } from 'app/components/posts'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About me</h1>
      <p className="mb-4 text-justify text-md">
        {
          'I’m Juan, a software engineer with a deep interest in the craft of building. My journey has taken me through web, data, and security—each offering a unique perspective on the shared challenge of creating value in the digital world. These days, I’m exploring the evolving field of AI/ML at '
        }
        <Link href="https://www.epilot.cloud/en" className="text-blue-500">
          epilot
        </Link>
        {
          ', learning more every day. Outside of work, I’m a father and husband, and I’ve found surprising connections between raising a family and building technology products. Both demand patience, creativity, and an openness to uncertainty, which keeps me curious and always eager to grow.'
        }
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
