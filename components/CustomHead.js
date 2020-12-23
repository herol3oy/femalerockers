import Head from 'next/head'

export default function CustomHead({ homepageTitle, title, coverImage }) {
  return (
    <Head>
        <title>{title ? `Female Rockers | Exclusive Interview With ${title}`: homepageTitle}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Our mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio." />
        <meta name="keywords" content="interview rocknroll music female rockers rock jazz blues" />
        <meta name="theme-color" content="#dc3545" />

        <meta property='og:title' content={title ? `Female Rockers | Exclusive Interview With ${title}`: homepageTitle} />
        <meta property='og:image' content={title ? coverImage : `/screenshot-01.png`} />
        <meta property='og:description' content='Our mission is to spread the word for talented musicians' />
        <meta property='og:url' content='https://femalerockers.com' />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="femalerockers.com" />
        <meta name="twitter:title" content={title ? `Female Rockers | Exclusive Interview With ${title}`: homepageTitle} />
        <meta name="twitter:description" content="Our mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio." />
        <meta name="twitter:image" content={title ? coverImage : `/screenshot-01.png`}/>

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
    </Head>
  )
}
