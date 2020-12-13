import { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'
import sanityClient from '../lib/SanityClient'
import _ from 'lodash'
import imageUrlBuilder from "@sanity/image-url"
import styled from "styled-components"

const StyledCarousel = styled(Carousel)`
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: inline-block;
        background: linear-gradient(to top, #000000 0%, rgba(255, 255, 255, 0) 100%);
    }
`

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

export default function carousel() {
    const [carousel, setCarousel] = useState(null)

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "interview" && carousel == true ]{
                    firstName,
                    lastName,
                    excerpt,
                    country,
                    profileImage,
                    coverImage,
                    body,
                }`
            )
            .then((musician) => setCarousel(musician))
            .catch(console.error)
    }, [])

    return (
        <>
            <Container className='my-3'>
                <StyledCarousel prevLabel='' nextLabel=''>
                    {_.map(carousel, (rocker, i) => {
                        return (
                            <Carousel.Item key={i} >
                                <Image
                                    className="d-block"
                                    src={urlFor(rocker.coverImage.asset).url()}
                                    alt={`${rocker.firstName} ${rocker.lastName}`}
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                                <Carousel.Caption className='d-flex' >
                                    <Image
                                        src={urlFor(rocker.profileImage.asset).width(162).height(240).url()}
                                        alt={`${rocker.firstName} ${rocker.lastName}`}
                                        layout="intrinsic"
                                        width={162}
                                        height={240}
                                    />
                                    <div className='d-flex flex-column m-2'>
                                        <h1 className='text-start display-4 text-danger fw-bolder'>{`${rocker.firstName} ${rocker.lastName}`}</h1>
                                        <p className='text-start'>{rocker.excerpt.substring(0, 120)}</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </StyledCarousel>
            </Container>

            <style global jsx>{`
                    .carousel-item {
                        height: 500px;
                    }
                    .carousel-caption {
                        z-index:1;
                    }
            `}</style>
        </>
    )
}
