import { useState } from 'react'
import Link from 'next/link'
import Container from '@BS/Container'
import Row from '@BS/Row'
import ContactForm from './ContactForm'

export default function Footer() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container fluid className='mt-0 mt-md-5 my-lg-5 mb-5'>
            <Container>
                <Row>
                    <section className='col-12 col-lg-3 mb-md-3'>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            FEMALE ROCKERS
                        </h5>
                        <small className='text-light fw-light'>
                            Our mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio.
                        </small>
                        <br />
                        <small className='text-secondary'>
                            <Link href='/privacypolicy'>
                                <a className='text-secondary'>Privacy Policy</a>
                            </Link>
                            {` `}and {` `}
                            <Link href='/terms'>
                                <a className='text-secondary'>Terms</a>
                            </Link>
                           {` `} © 2020
                        </small>
                    </section>
                    <section className='col-12 col-lg-3 mb-md-1'>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            CONTACT
                        </h5>
                        <small className='text-light fw-light'>
                            To reach our editorial team please contact us through our {` `}
                            <a className='fw-bold text-light' onClick={() => setModalShow(true)}>contact</a> form

                        </small>
                    </section>
                    <section className='col-12 col-lg-3 my-3 my-lg-0 '>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            INTERVIEW
                        </h5>
                        <small className='text-light fw-light'>
                            Try your chance of being interviewed by tagging us on {` `}
                            <Link href='https://www.instagram.com/femalerockers_/'>
                                <a className='fw-bold text-light' target='_blank'><u>instagram</u></a>
                            </Link>
                        </small>
                    </section>
                    <section className='col-12 col-lg-3'>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            COVID-19
                        </h5>
                        <small className='text-light fw-light'>
                            To stop coronavirus please cover your cough and more songs {' '}
                                    😎
                        </small>
                    </section>
                </Row>
            </Container>
            <ContactForm
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}
