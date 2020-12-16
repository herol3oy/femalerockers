import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import sanityClient from '../lib/SanityClient'
import _ from 'lodash'
import Link from 'next/link'
import { StyledQuote, StyledContainer } from '../styles/layout'

export default function RandomQuote() {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {

        sanityClient
            .fetch(
                `*[_type == "interview" && defined(quote)]{
                    stageName,
                    slug,
                    quote,
                }`
            )
            .then((data) => setQuotes(data[_.random(data.length - 1)]))
            .catch(console.error)

    }, [])

    return (
        <StyledContainer fluid className='mt-5'>
            <Container className='d-flex flex-column justify-content-center align-items-center p-5'>
                <StyledQuote className='text-center text-light'>"{quotes?.quote}"</StyledQuote >
                <Link href={quotes?.slug?.current || '/'}>
                    <a className='text-light'>
                        ~ {`${quotes?.stageName}`} ~
                    </a>
                </Link>
            </Container>
        </StyledContainer>
    )
}
