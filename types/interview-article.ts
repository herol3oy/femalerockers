import { PortableTextBlock } from 'sanity'

export interface InterviewArticle {
  title: string
  excerpt: string
  stageName: string
  slug: string
  country: string
  profession: string[]
  profileImage: string
  coverImage: string
  instagram: string
  spotify: string
  facebook: string
  twitter: string
  youtube: string
  website: string
  date: string
  body: PortableTextBlock[]
}
