import Head from 'next/head'
import Carousel from '@components/Carousel'
import Musicians from '@components/Musicians'
import RandomQuote from '@components/RandomQuote'
import CustomHead from '@components/CustomHead'

export default function Home() {
  return (
    <>
      <CustomHead />
      <Carousel />
      <Musicians />
      <RandomQuote />
    </>
  )
}