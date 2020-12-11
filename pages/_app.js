import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;900&display=swap" rel="stylesheet" />
      </Head>
      
      <Navbar />

      <Component {...pageProps} />

      <Footer />

      <style global jsx>{`
        body::-webkit-scrollbar {
          width: 0.15rem;
        }
        
        body::-webkit-scrollbar-thumb {
          background: #dc3545;
        }
        
        body::-webkit-scrollbar-track {
          background: #111;
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
