import Carousel from '@/Carousel'
import Musicians from '@/Musicians'
import RandomQuote from '@/RandomQuote'
import Head from 'next/head'

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
