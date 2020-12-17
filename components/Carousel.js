import { useState, useEffect } from 'react'
import Carousel from '@BS/Carousel'
import Container from '@BS/Container'
import Row from '@BS/Row'
import Badge from '@BS/Badge'
import Button from '@BS/Button'
import Image from 'next/image'
import Link from 'next/link'
import sanityClient from '@lib/SanityClient'
import _ from 'lodash'
import imageUrlBuilder from "@sanity/image-url"

const urlFor = (source) =>
    imageUrlBuilder(sanityClient).image(source)

export default function carousel() {
    const [carousel, setCarousel] = useState(null)

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "interview" && carousel == true ]{
                    stageName,
                    title,
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
        <Container className='my-3'>
            <Carousel className='carousel' prevLabel='' nextLabel=''>
                {_.map(carousel, (rocker, i) => {
                    return (
                        <Carousel.Item key={i} >
                            <Image
                                className="d-block"
                                src={urlFor(rocker.coverImage.asset).url()}
                                alt={rocker.stageName}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                            <Link href={rocker.slug.current}>
                                <a>
                                    <Carousel.Caption>
                                        <Row>
                                            <div className='col-4 d-flex justify-content-end'>
                                                <Image
                                                    src={urlFor(rocker.profileImage.asset).url()}
                                                    alt={rocker.stageName}
                                                    width={162}
                                                    height={240}
                                                />
                                            </div>
                                            <div className='col-8 text-start align-self-end'>
                                                <h1 className='text-start text-danger fw-bolder'>{`${rocker.stageName} ${rocker.country}`}</h1>
                                                <h4 className='text-start font-monospace d-lg-block d-none'>{rocker.title}</h4>
                                                {rocker.profession.map((profession, i) => <Badge key={i} className='badge rounded-pill bg-danger' pill>{profession}</Badge>)}
                                                {/* <Button variant="secondary" size="sm"><small>READ MORE 👉</small></Button> */}
                                            </div>
                                        </Row>
                                    </Carousel.Caption>
                                </a>
                            </Link>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </Container>
    )
}
