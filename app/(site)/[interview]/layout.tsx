import { ResolvingMetadata } from 'next'

import { getInterviewContent } from '@/sanity/sanity-utils'
import { InterviewPageProps } from '@/types/interview-page-props'

export async function generateMetadata(
  { params }: InterviewPageProps,
  parent: ResolvingMetadata,
) {
  const slug = params.interview
  const [interview] = await getInterviewContent(slug)
  const previousImages = (await parent)?.openGraph?.images || []

  return {
    title: `Female Rockers | Exclusive Interview With ${interview?.stageName}`,
    openGraph: {
      images: [interview?.coverImage, ...previousImages],
    },
  }
}

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
