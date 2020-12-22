import Link from 'next/link'
import Navbar from '@BS/Navbar'
import Container from '@BS/Container'

export default function navbar() {
    return (
        <Container fluid>
            <Navbar className='container d-flex align-items-center justify-content-center justify-content-sm-between my-3' expand="lg">
                <section className='text-center text-sm-start'>
                    <Link href='/'>
                        <a className='site__title h3 text-danger fw-bolder text-decoration-none'>
                            FEMALE ROCKERS
                        </a>
                    </Link>
                    <p className='h6 fw-lighter text-light'>interviews future sensations in rock music</p>
                </section>
                <Link href='https://instagram.com/femalerockers_'>
                    <a className='instagram__btn anglebg text-decoration-none' target='_blank' >
                        <span className='anglebg'>MORE VIBES? 😎</span>
                    </a>
                </Link>
            </Navbar>
        </Container>
    )
}
