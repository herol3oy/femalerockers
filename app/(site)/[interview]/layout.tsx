import { ResolvingMetadata } from 'next'

import { getInterviewContent } from '@/sanity/sanity-utils'

type Props = {
  params: Promise<{ interview: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const { interview } = await params
  const slug = interview

  const [singleInterview] = (await getInterviewContent(slug)) || []
  const previousImages = (await parent)?.openGraph?.images || []

  if (!singleInterview) {
    return {
      title: 'Female Rockers | Interview Not Found',
      openGraph: {
        images: [...previousImages],
      },
    }
  }

  return {
    title: `Female Rockers | Exclusive Interview With ${singleInterview.stageName}`,
    openGraph: {
      images: [singleInterview.coverImage, ...previousImages],
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
