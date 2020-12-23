import Head from 'next/head'

export default function CustomHead({ slug, stageName, coverImage }) {
  return (
    <Head>
        <title>{`Female Rockers | Exclusive Interview With ${stageName}`}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Our mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio." />
        <meta name="keywords" content="interview rocknroll music female rockers rock jazz blues" />
        <meta name="theme-color" content="#dc3545" />

        <meta property='og:title' content={`Female Rockers | Exclusive Interview With ${stageName}`} />
        <meta property='og:image' content={coverImage} />
        <meta property='og:description' content='Our mission is to spread the word for talented musicians' />
        <meta property='og:url' content={`https://femalerockers.com/${slug.current}`} />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="1791721731010141" />
 
        <meta name="twitter:title" content={`Female Rockers | Exclusive Interview With ${stageName}`} />
        <meta name="twitter:image" content={coverImage} />
        <meta name="twitter:description" content="Our mission is to spread the word for talented musicians" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="femalerockers.com" />

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
    </Head>
  )
}
