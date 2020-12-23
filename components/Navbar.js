import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@BS/Navbar'
import Container from '@BS/Container'
import Confetti from 'react-dom-confetti'
import 'csshake/dist/csshake-slow.css'

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
}

export default function navbar() {
    const [fireConfetti, setFireConfetti] = useState(false)
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
                    <a className='instagram__btn  anglebg text-decoration-none' target='_blank'>
                        <span className='text-uppercase'>Instagram</span>
                        <span
                            onMouseEnter={() => setFireConfetti(true)}
                            onMouseLeave={() => setFireConfetti(false)}
                            className='shake-slow'>
                            🎉
                        <Confetti active={fireConfetti} config={config} />
                        </span>
                    </a>
                </Link>
            </Navbar>
        </Container>
    )
}
