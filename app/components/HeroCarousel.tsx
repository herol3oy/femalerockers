'use client'

import 'react-multi-carousel/lib/styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import { getCarouselImages } from '@/sanity/sanity-utils'
import { CarouselImage } from '@/types/carousel-image'
import { responsive } from '@/utils/carousel-reponsive-config'

export default function HeroCarousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])

  useEffect(() => {
    getCarouselImages().then(setCarouselImages)
  }, [])

  return (
    <Carousel
      className="my-10 w-full rounded-3xl overflow-hidden shadow-xl shadow-red-900/20"
      infinite
      showDots={false}
      autoPlaySpeed={4500}
      partialVisible
      autoPlay
      responsive={responsive}
      removeArrowOnDeviceType={['mobile']}
    >
      {carouselImages.map((interview: CarouselImage, index) => (
        <Link
          className="group relative block h-[28rem] sm:h-[32rem] lg:h-[36rem] overflow-hidden"
          href={`/${interview.slug}`}
          prefetch={false}
          key={interview._id}
        >
          <Image
            src={interview.coverImage}
            alt={interview.stageName}
            fill
            priority={index === 0}
            className="object-cover grayscale opacity-80 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-60"
            sizes="(max-width: 1024px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/B8AAosBxERSgsYAAAAASUVORK5CYII="
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 z-10 flex flex-col space-y-3">
            <span className="w-fit rounded bg-red-600/90 px-2 py-1 text-xs sm:text-sm font-bold text-black shadow-md">
              {interview.stageName} {interview.country}
            </span>
            <h1 className="min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5rem] line-clamp-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-white drop-shadow-lg">
              <span className="bg-black/70 px-3 py-1 rounded-md backdrop-blur-sm">
                {interview.title}
              </span>
            </h1>
          </div>

          <Image
            className="absolute top-4 right-4 w-10 h-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            src="/icons/female-rockers-logo.svg"
            width={40}
            height={40}
            alt="Female Rockers"
          />
        </Link>
      ))}
    </Carousel>
  )
}
