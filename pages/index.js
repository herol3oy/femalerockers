import { useEffect } from 'react'
import Carousel from '@components/Carousel'
import Musicians from '@components/Musicians'
import RandomQuote from '@components/RandomQuote'
import CustomHead from '@components/CustomHead'
import FeatureCards from 'components/FeatureCards'

export default function Home() {
  
  useEffect(() => window.scrollTo({ top: 0 }), [])

  return (
    <>
      <CustomHead />
      <Carousel />
      <FeatureCards />
      <Musicians />
      <RandomQuote />
    </>
  )
}
