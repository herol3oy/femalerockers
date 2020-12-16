import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

export default function navbar() {
    return (
        <Container fluid>
            <Navbar className='container d-flex justify-content-center justify-content-sm-between' expand="lg">
                <section className='flex text-center text-sm-start'>
                    <Link href='/'>
                        <a className='site__title h3 text-danger fw-bolder text-decoration-none'>
                            FEMALE ROCKERS
                        </a>
                    </Link>
                    <p className='text-light'>interviews future sensations in rock music</p>
                </section>
                <Link href='https://instagram.com/femalerockers_'>
                    <a className='instagram__btn text-decoration-none' target='_blank' >Instagram</a>
                </Link>
            </Navbar>
        </Container>
    )
}
