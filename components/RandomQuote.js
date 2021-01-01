import { useEffect, useState } from 'react'
import Link from 'next/link'
import _ from 'lodash'
import Container from '@BS/Container'
import sanityClient from '@lib/SanityClient'

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
        <Container fluid className='style__pills border-0 mt-5'>
            <Container className='d-flex flex-column justify-content-center align-items-center p-5'>
                <p className='homepage__quotation h3 text-center text-light'>"{quotes?.quote}"</p>
                <Link href={quotes?.slug?.current || '/'}>
                    <a className='text-light'>
                        ~ {`${quotes?.stageName || ' '}`} ~
                    </a>
                </Link>
            </Container>
        </Container>
    )
}
