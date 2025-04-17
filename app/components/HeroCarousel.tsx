'use client'

import 'react-multi-carousel/lib/styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'

import { getCarouselImages } from '@/sanity/sanity-utils'
import { CarouselImage } from '@/types/carousel-image'
import { responsive } from '@/utils/carousel-reponsive-config'
import { shimmer, toBase64 } from '@/utils/shimmer'

export default function HeroCarousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])

  useEffect(() => {
    async function innerEffect() {
      const interviews = await getCarouselImages()
      setCarouselImages(interviews)
    }

    innerEffect()
  }, [])

  return (
    <Carousel
      className="my-10 h-128 w-full rounded-3xl bg-zinc-800"
      infinite
      showDots={false}
      autoPlaySpeed={4000}
      partialVisible
      autoPlay
      responsive={responsive}
      removeArrowOnDeviceType={['mobile']}
    >
      {carouselImages.map((interview: CarouselImage) => (
        <Link
          className="group relative transition-all duration-200 ease-in-out"
          href={`/${interview.slug}`}
          key={interview._id}
        >
          <Image
            className="h-128 w-full object-cover blur-0 grayscale transition-all delay-150 duration-300 ease-in-out group-hover:blur-md"
            src={interview.coverImage}
            alt={interview.stageName}
            width={0}
            height={0}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475),
            )}`}
          />
          <div className="absolute bottom-3 left-3 flex flex-col">
            <Image
              className="invisible mb-2 ease-in-out group-hover:visible"
              src="/icons/female-rockers-logo.svg"
              width={30}
              height={30}
              alt="Female Rockers"
            />
            <small className="w-fit bg-red-600 p-1 font-bold text-slate-900">
              {interview.stageName} {interview.country}
            </small>
            <h1 className=" text-2xl font-bold text-white">
              <span className="primary-dark-color relative box-decoration-clone p-1">
                {interview.title}
              </span>
            </h1>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}
