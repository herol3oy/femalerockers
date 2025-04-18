import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import SocialMediaIcons from '../../components/SocialMediaIcons'
import { getInterviewContent } from '@/sanity/sanity-utils'
import { portableTextComponents } from '@/utils/portable-text-components'
import { shimmer, toBase64 } from '@/utils/shimmer'

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ interview: string }>
}) {
  const { interview: slug } = await params
  const [singleInterview] = await getInterviewContent(slug)

  if (!singleInterview) notFound()

  return (
    <article className="container">
      <section className="flex w-full flex-col items-center justify-center gap-8">
        <time
          className="text-md font-light tracking-widest text-white"
          dateTime={singleInterview.date}
        >
          {new Date(singleInterview.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
        <h1 className="text-center text-5xl font-bold text-red-600">
          {singleInterview.title}
        </h1>
        <Image
          className="h-72 w-full rounded-md object-cover md:h-128"
          src={singleInterview.coverImage}
          width={0}
          height={0}
          sizes="100vw"
          alt={singleInterview.stageName}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475),
          )}`}
        />
        <div className="md:w-11/12 lg:w-6/12 xl:w-7/12">
          <p className="-mt-0 rounded-md bg-zinc-900 p-1 text-xl font-light text-slate-300 md:-mt-32 md:p-5 md:text-3xl lg:-mt-52">
            {singleInterview.excerpt}
          </p>
          <div className="my-5 flex w-full gap-5 rounded-sm bg-zinc-300 p-5">
            <Image
              className="rounded-full object-cover transition-all duration-300 ease-in-out hover:-translate-y-2 hover:-rotate-6 hover:shadow-2xl"
              src={singleInterview.profileImage}
              width={100}
              height={100}
              alt={singleInterview.stageName}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475),
              )}`}
            />
            <div className="flex w-full flex-col items-start gap-2">
              <div className="flex gap-2">
                {singleInterview.profession.map((profession) => (
                  <small
                    className="secondary-light-color rounded-full bg-red-700 px-2 py-1 text-xs"
                    key={profession}
                  >
                    {profession}
                  </small>
                ))}
              </div>
              <h1 className="text-2xl font-bold md:text-5xl">
                {singleInterview.stageName} {singleInterview.country}
              </h1>
              <SocialMediaIcons interview={singleInterview} />
            </div>
          </div>
          <hr className="my-10 border-zinc-400" />
          <PortableText
            value={singleInterview.body}
            components={portableTextComponents}
          />
        </div>
      </section>
    </article>
  )
}
