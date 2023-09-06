import { groq } from 'next-sanity'

import { BioUrl } from '@/types/bio-url'
import { CarouselImage } from '@/types/carousel-image'
import { InterviewArticle } from '@/types/interview-article'
import { InterviewCard } from '@/types/interview-card'
import { PageContent } from '@/types/page-content'

import { client } from './lib/client'

export async function getInterviews(): Promise<InterviewCard[]> {
  return client.fetch(
    groq`*[_type == "interview"] | order(date desc) {
        stageName,
        title,
        profession,
        country,
        "slug": slug.current,
        "profileImage": profileImage.asset->url
    }`,
  )
}

export async function getInterviewContent(
  slug: string,
): Promise<InterviewArticle[]> {
  return await client.fetch(
    groq`*[_type == 'interview' && slug.current == '${slug}']{
        title,
        excerpt,
        stageName,
        "slug": slug.current,
        country,
        profession,
        "profileImage": profileImage.asset->url,
        "coverImage": coverImage.asset->url,
        instagram,
        spotify,
        facebook,
        twitter,
        youtube,
        website,
        date,
        body
    }`,
  )
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  return client.fetch(
    groq`*[_type == "interview"] | order(date desc) [0..4] {
        _id,
        title,
        stageName,
        country,
        "slug": slug.current,
        "coverImage": coverImage.asset->url
    }`,
  )
}

export async function getPageContent(pageName: string): Promise<PageContent[]> {
  return client.fetch(
    groq`*[_type == 'page' && slug.current == '${pageName}']{
        title,
        slug,
        publishedAt,
        body
    }`,
  )
}

export async function getBioUrls(): Promise<BioUrl[]> {
  return await client.fetch(
    groq`*[_type == 'bio'] | order(queue){
      urls
    }`,
  )
}
