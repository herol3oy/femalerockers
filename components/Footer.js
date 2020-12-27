import { useState } from 'react'
import Link from 'next/link'
import Container from '@BS/Container'
import Row from '@BS/Row'
import ContactForm from './ContactForm'

export default function Footer() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <Container fluid className='mt-0 mt-md-5 my-lg-5 mb-5'>
      <Container>
        <Row>
          <section className='col-12 col-lg-6 mb-md-3'>
            <h6 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
              FEMALE ROCKERS
            </h6>
            <small className='text-light fw-light'>
              Our mission is to spread the word for talented musicians and give
              them a stance where they can professionally present their
              portfolio.
            </small>
            <br />
            <small className='text-secondary fw-lighter'>
              <Link href='/privacypolicy'>
                <a className='text-secondary'>Privacy Policy</a>
              </Link>
              {` `}and {` `}
              <Link href='/terms'>
                <a className='text-secondary'>Terms</a>
              </Link>
              {` `} ©{' '}
              {new Date().getFullYear() > 2020
                ? `2020-${new Date().getFullYear()}`
                : '2020'}
            </small>
          </section>
          <section className='col-12 col-lg-3'>
            <h6 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
              ABOUT
            </h6>
            <small className='text-light fw-light'>
              Please read more {` `}
              <Link href='/page/about'>
                <a className='fw-bold text-light'>about us</a>
              </Link>
              {` `} here
            </small>
          </section>
          <section className='col-12 col-lg-3 mb-md-1'>
            <h6 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
              CONTACT
            </h6>
            <small className='text-light fw-light'>
              To reach our editorial team please contact us through our {` `}
              <a
                className='fw-bold text-light'
                onClick={() => setModalShow(true)}
              >
                contact
              </a>{' '}
              form
            </small>
          </section>
        </Row>
      </Container>
      <ContactForm show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  )
}
