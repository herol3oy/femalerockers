'use client'

import dynamic from 'next/dynamic'

import HeroCarouselSkeleton from '@/app/components/HeroCarouselSkeleton'

const HeroCarousel = dynamic(() => import('@/app/components/HeroCarousel'), {
  ssr: false,
  loading: () => <HeroCarouselSkeleton />,
})

export default function HeroCarouselLazy() {
  return <HeroCarousel />
}
