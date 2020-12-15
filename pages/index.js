import Carousel from '@/Carousel'
import Musicians from '@/Musicians'
import RandomQuote from '@/RandomQuote'
import Head from 'next/head'
import { getAllMusiciansData } from '../lib/SanityApi'

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>
          FemaleRockers 👩‍🎤 interviews future sensations in rock music
        </title>
      </Head>
      <Carousel />
      <Musicians data={data} />
      <RandomQuote />
    </>
  )
}

export async function getStaticProps() {
  const data = await getAllMusiciansData()
  return {
    props: { data },
  }
}