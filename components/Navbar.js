import Link from 'next/link'
import Navbar from '@BS/Navbar'
import Container from '@BS/Container'

export default function navbar() {
  return (
    <Container fluid>
      <Navbar
        className='container d-flex justify-content-center my-3'
        expand='lg'
      >
        <section className='text-center'>
          <Link href='/'>
            <a className='site__title h5 text-danger fw-bolder text-decoration-none text-uppercase'>
              Female Rockers
            </a>
          </Link>
          <p className='h6 fw-lighter text-light'>
            interviews future sensations in rock music
          </p>
        </section>
      </Navbar>
    </Container>
  )
}
