import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'

export default function navbar() {
    return (
        <Container fluid>
            <Navbar className='container d-flex justify-content-center justify-content-sm-between ' expand="lg">
                <section className='flex text-center text-sm-start'>
                    <Link href='/'>
                        <a className='h3 site-title text-danger fw-bolder text-decoration-none'>
                            FEMALEROCKERS
                    </a>
                    </Link>
                    <p className='text-light'>interviews future sensations in rock music</p>
                </section>
                <Link href='https://instagram.com/femalerockers_'>
                    <a className='instagram-btn text-decoration-none' target='_blank' >Instagram</a>
                </Link>
            </Navbar>

            <style jsx>{`
                .site-title {
                    font-family: 'Cinzel', serif;
                }
                
                .instagram-btn {
                    padding: 10px;
                    color: #fff;
                    font-weight: 700;
                    border-radius: 20px;
                    cursor: pointer;
                    background: linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);
                }
                
                `}</style>
        </Container>
    )
}
