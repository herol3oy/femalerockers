import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import SocialMediaIcons from '../../components/SocialMediaIcons'
import { getInterviewContent } from '@/sanity/sanity-utils'
import { portableTextComponents } from '@/utils/portable-text-components'

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ interview: string }>
}) {
  const { interview: slug } = await params
  const data = await getInterviewContent(slug)
  const singleInterview = data?.[0]

  if (!singleInterview) return notFound()

  return (
    <article className="bg-zinc-950 text-white">
      <section className="relative">
        <Image
          src={singleInterview.coverImage}
          alt={singleInterview.stageName}
          width={1920}
          height={1080}
          priority
          className="h-[60vh] w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <time
            className="mb-4 text-sm tracking-[0.3em] text-slate-300"
            dateTime={singleInterview.date}
          >
            {new Date(singleInterview.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </time>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-red-500 md:text-6xl">
            {singleInterview.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="relative z-10 -mt-16 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:-mt-48">
          <p className="text-lg font-light leading-relaxed text-slate-300 md:text-2xl">
            {singleInterview.excerpt}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:flex-row md:items-center">
          <Image
            src={singleInterview.profileImage}
            alt={singleInterview.stageName}
            width={120}
            height={120}
            className="rounded-full object-cover transition duration-300 hover:scale-105"
          />

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {singleInterview.profession.map((profession: string) => (
                <span
                  key={profession}
                  className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-medium text-red-400"
                >
                  {profession}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold md:text-4xl">
              {singleInterview.stageName}{' '}
              <span className="text-slate-400">{singleInterview.country}</span>
            </h2>

            <SocialMediaIcons interview={singleInterview} />
          </div>
        </div>

        <div className="prose prose-invert prose-red max-w-none lg:prose-lg">
          <PortableText
            value={singleInterview.body}
            components={portableTextComponents}
          />
        </div>
      </section>
    </article>
  )
}
