import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'

export default function Footer() {
    return (
        <Container fluid className='my-5'>
            <Container>
                <Row>
                    <section className='col-12 col-lg-6'>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            FEMALE ROCKERS
                        </h5>
                        <small className='text-light fw-light'>
                            Our mission is to spread the word for talented musicians and give them a stance where they can professionally present their portfolio.
                        </small>
                    </section>
                    <section className='col-12 col-lg-3'>
                        <h5 className='site-title fw-bold border-bottom text-light text-left pt-5 pt-lg-0 pt-md-0 mb-1 pb-1'>
                            INTERVIEW
                        </h5>
                        <small className='text-light fw-light'>
                            Try your chance of being interviewed by tagging us on {` `}
                            <Link href='https://www.instagram.com/femalerockers_/'>
                                <a className='text-light' target='_blank'><u>instagram</u></a>
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
        </Container>
    )
}
