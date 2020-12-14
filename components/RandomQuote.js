import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import sanityClient from '../lib/SanityClient'
import BlockContent from "@sanity/block-content-to-react"
import _ from 'lodash'

export default function RandomQuote() {


    return (
        <Container fluid className='bg-danger'>
            <Container className='d-flex justify-content-center'>
                quote
            </Container>
        </Container>
    )
}
