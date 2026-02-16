import { PortableText } from '@portabletext/react'
import { getPageContent } from '@/sanity/sanity-utils'
import { portableTextComponents } from '@/utils/portable-text-components'
import { notFound } from 'next/navigation'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params

  const content = await getPageContent(page)

  if (!content || !content[0]) {
    return notFound()
  }

  return (
    <section className="px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <div
          className="prose prose-invert prose-red max-w-none
                        prose-headings:tracking-wide
                        prose-p:leading-relaxed
                        prose-a:text-red-400 hover:prose-a:text-red-300
                        lg:prose-lg"
        >
          <PortableText
            value={content[0].body}
            components={portableTextComponents}
          />
        </div>
      </article>
    </section>
  )
}
