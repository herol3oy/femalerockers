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
        body::-webkit-scrollbar {
          width: 0.25rem;
        }
        
        body::-webkit-scrollbar-thumb {
          background: $color_accent;
        }
        
        body::-webkit-scrollbar-track {
          background: $color_dark;
        }
        body {
          background: #111;
        }
        img {
          filter: grayscale(100%);
        }
        .site-title {
          font-family: 'Cinzel', serif;
      }
      
      `}</style>
    </>
  )

}

export default MyApp
