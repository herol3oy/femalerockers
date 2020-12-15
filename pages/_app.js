import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlobalStyle from '../styles/globalStyles'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
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