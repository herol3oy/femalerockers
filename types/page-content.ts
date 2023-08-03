import { PortableTextBlock } from 'sanity'

export interface PageContent {
  title: string
  slug: string
  publishedAt: Date
  body: PortableTextBlock[]
}
