import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import '@styles/main.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
    </>
  )
}