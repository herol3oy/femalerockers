import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;900&display=swap" rel="stylesheet" />
      </Head>

      <Component {...pageProps} />

      <style global jsx>{`
        body {
          background: #111;
        }
      `}</style>
    </>
  )

}

export default MyApp
