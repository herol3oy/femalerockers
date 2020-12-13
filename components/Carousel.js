import { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Image from 'next/image'
import Link from 'next/link'
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
                    profession,
                    slug,
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
                                // layout='responsive'
                                // width={1200}
                                // height={800}
                                />
                                <Link href={`${rocker.slug.current}`}>
                                    <a>
                                        <Carousel.Caption>
                                            <Row>
                                                <div className='col-4'>
                                                    <Image
                                                        src={urlFor(rocker.profileImage.asset).url()}
                                                        alt={`${rocker.firstName} ${rocker.lastName}`}
                                                        width={162}
                                                        height={240}
                                                    />
                                                </div>
                                                <div className='col-8 text-start'>
                                                    {rocker.profession.map((profession, i) => <Badge key={i} className='badge rounded-pill bg-danger' pill>{profession}</Badge>)}
                                                    <h1 className='text-start text-danger fw-bolder'>{`${rocker.firstName} ${rocker.lastName} ${rocker.country}`}</h1>
                                                    <h4 className='text-start d-lg-block d-none'>{rocker.excerpt}</h4>
                                                </div>

                                            </Row>
                                        </Carousel.Caption>
                                    </a>
                                </Link>

                            </Carousel.Item>
                        )
                    })}
                </StyledCarousel>
            </Container>

            <style global jsx>{`
                    .carousel-item {
                        height: 520px;
                    }
                    .carousel-caption {
                        z-index:1;
                    }
                    @media only screen and (max-width:600px) {
                        .carousel-item {
                            height: 320px;
                        }
                    }

            `}</style>
        </>
    )
}
