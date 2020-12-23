import Head from "next/head";
import Carousel from "@components/Carousel";
import Musicians from "@components/Musicians";
import RandomQuote from "@components/RandomQuote";

export default function Home() {
  return (
    <>
        <Head>
          <title>Female Rockers | Interviews future sensations in rock music</title>
          <meta property='og:title' content='Female Rockers | Interviews future sensations in rock music' />
          <meta property='og:image' content='/og-thumbnail.png' />
          <meta property='og:description' content='Our mission is to spread the word for talented musicians' />
          <meta property='og:url' content='https://femalerockers.com' />
          <meta property="og:type" content="interview" />
  
          <meta name="twitter:title" content='Female Rockers | Interviews future sensations in rock music' />
          <meta name="twitter:image" content='/og-thumbnail.png' />
          <meta name="twitter:description" content="Our mission is to spread the word for talented musicians" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="femalerockers.com" />
      </Head>
      <Carousel />
      <Musicians />
      <RandomQuote />
    </>
  )
}
