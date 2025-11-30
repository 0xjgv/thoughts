import { ThoughtsPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center animate-fade-in">
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
        navigate the unknown—qualities that also drive my approach to building
        technology. Whether raising a family or creating tech solutions, both
        require constant learning, flexibility, and a deep curiosity for what
        comes next. These shared experiences fuel my passion for simplicity,
        security, and efficiency in everything I do.
      </p>
      <div className="my-8 self-start">
        <ThoughtsPosts />
      </div>
    </section>
  )
}
