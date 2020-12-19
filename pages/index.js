import Head from 'next/head'
import Carousel from '@components/Carousel'
import Musicians from '@components/Musicians'
import RandomQuote from '@components/RandomQuote'

export default function Home() {
  return (
    <>
      <Head>
        <title>
          FemaleRockers 👩‍🎤 interviews future sensations in rock music
        </title>
      </Head>
      <Carousel />
      <Musicians />
      <RandomQuote />
    </>
  )
}