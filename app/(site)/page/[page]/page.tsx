import { PortableText } from '@portabletext/react'

import { getPageContent } from '@/sanity/sanity-utils'
import { portableTextComponents } from '@/utils/portable-text-components'

interface AboutPageProps {
  params: { page: string }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const [content] = await getPageContent(params.page)

  return (
    <article className="prose mx-auto text-white lg:prose-xl">
      <PortableText value={content.body} components={portableTextComponents} />
    </article>
  )
}
