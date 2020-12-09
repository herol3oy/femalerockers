import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'

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
          background: var(--bs-dark);
        }
      `}</style>
    </>
  )

}

export default MyApp
