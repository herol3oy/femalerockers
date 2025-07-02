import Image from 'next/image'
import Link from 'next/link'

import { InterviewCardProps } from '@/types/interview-card-props'

export default function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Link
      className="group relative overflow-hidden rounded border-t-2 border-t-red-600 transition-all duration-300 ease-in-out hover:-translate-y-1"
      href={`/${interview.slug}`}
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          className="object-cover grayscale transition duration-300 group-hover:blur-md"
          src={interview.profileImage}
          alt={interview.stageName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/B8AAosBxERSgsYAAAAASUVORK5CYII="
        />
      </div>

      <h1 className="invisible absolute left-3 top-3 text-xl font-bold text-white blur-0 group-hover:visible">
        {interview.stageName} {interview.country}
      </h1>

      <span className="absolute bottom-3 left-3 line-clamp-1 w-44 text-ellipsis text-xl font-bold text-white">
        <span className="mr-1 text-2xl font-bold text-red-700">/</span>
        {interview.title}
      </span>
    </Link>
  )
}
