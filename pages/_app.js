import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/main.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
      </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
    </>
  )
}