import Image from 'next/image'
import Link from 'next/link'
import { InterviewCardProps } from '@/types/interview-card-props'

export default function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Link
      href={`/${interview.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-black shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-red-600/40"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          className="object-cover opacity-80 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0"
          src={interview.profileImage}
          alt={interview.stageName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/B8AAosBxERSgsYAAAAASUVORK5CYII="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition duration-500 group-hover:from-black/70" />
      </div>

      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs sm:text-sm text-white font-semibold opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {interview.stageName}{' '}
        <span className="text-red-500">{interview.country}</span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
        <span className="text-xl sm:text-2xl font-bold text-red-600">/</span>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white bg-black/70 px-3 py-1 rounded-md backdrop-blur-sm shadow-md">
          {interview.title}
        </h2>
      </div>
    </Link>
  )
}
