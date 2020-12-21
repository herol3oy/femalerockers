import Head from 'next/head'
import Link from 'next/link'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import CookieConsent from "react-cookie-consent"
import '@styles/main.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Female Rockers mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio." />
        <meta name="keywords" content="interview rocknroll music female rockers rock jazz blues" />
        <meta name="theme-color" content="#dc3545" />
        <title>Female Rockers 👩‍🎤 | Interviews Future Sensations In Rock Music</title>

        <meta property='og:title' content='FemaleRockers' />
        <meta property='og:image' content='/screenshot.png' />
        <meta property='og:description' content='Female Rockers mission is to spread the word for talented musicians' />
        <meta property='og:url' content='https://femalerockers.com' />

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>

      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <CookieConsent
        location='bottom'
        buttonText='Sounds good 😉'
        style={{
          background: '#2f2f2f',
          color: '#fff',
          justifyContent: 'center',
          margin: 'auto',
          lineHeight: 'initial !important'
        }}
        buttonStyle={{
          color: '#fff',
          backgroundColor: '#FF2E63',
          fontSize: '13px',
          marginTop: '15px',
          padding: '.6rem',
          height: '40px',
          borderRadius: '.25rem',
          fontWeight:'bolder  '
        }}
        contentStyle={{
          flex: 'none',
          width: 'fit-content',
          textAlign: 'center'
        }}
        expires={150}
      >
        <small className='fw-light'>
          We use cookies to give you the best experience possible.
          Continue browsing or review our {` `}
          <Link href='/privacypolicy'>
            <a>
              <u className='text-light'>privacy policy</u>
            </a>
          </Link>
          {' '} and {' '}
          <Link className='text-light' href='/terms'>
            <a>
              <u className='text-light'>terms</u>
            </a>
          </Link>
         {` `} to learn more.
        </small>
      </CookieConsent>
    </>
  )
}