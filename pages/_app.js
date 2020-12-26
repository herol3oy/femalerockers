import Link from 'next/link'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
// import Banner from '@components/Banner'
import CookieConsent from 'react-cookie-consent'
import '@styles/main.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Banner /> */}
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
          lineHeight: 'initial !important',
        }}
        buttonStyle={{
          color: '#fff',
          backgroundColor: '#FF2E63',
          fontSize: '13px',
          marginTop: '15px',
          padding: '.6rem',
          height: '40px',
          borderRadius: '.25rem',
          fontWeight: 'bolder  ',
        }}
        contentStyle={{
          flex: 'none',
          width: 'fit-content',
          textAlign: 'center',
        }}
        expires={150}
      >
        <small className='fw-light'>
          We use cookies to give you the best experience possible. Continue
          browsing or review our {` `}
          <Link href='/privacypolicy'>
            <a>
              <u className='text-light'>privacy policy</u>
            </a>
          </Link>{' '}
          and{' '}
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
