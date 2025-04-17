import { PortableText } from '@portabletext/react'

import { getPageContent } from '@/sanity/sanity-utils'
import { portableTextComponents } from '@/utils/portable-text-components'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const [content] = await getPageContent(page)

  return (
    <article className="prose mx-auto text-white lg:prose-xl">
      <PortableText value={content.body} components={portableTextComponents} />
    </article>
  )
}
