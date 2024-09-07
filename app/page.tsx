import { ThoughtsPosts } from 'app/components/posts'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About me</h1>
      <p className="mb-4 text-justify text-md">
        {
          "I'm Juan, a software engineer obsessed with the art of building. My path weaves through web, data, and security—each a different lens on the same core challenge: how to create value in the digital age. Nowadays, I'm pushing the boundaries of AI at "
        }
        <Link href="https://www.epilot.cloud/en" className="text-blue-500">
          epilot
        </Link>
        {
          ". Beyond code, I'm a father and husband, finding parallels between nurturing a family and nurturing technology. Both require patience, creativity, and a willingness to embrace the unknown."
        }
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
