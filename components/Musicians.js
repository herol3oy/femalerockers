import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import _ from 'lodash'
import Container from '@BS/Container'
import Card from '@BS/Card'
import Row from '@BS/Row'
import Badge from '@BS/Badge'
import sanityClient from '@lib/SanityClient'
import imageUrlBuilder from "@sanity/image-url"

const urlFor = (source) =>
    imageUrlBuilder(sanityClient).image(source)

export default function Musicians() {
    const [musicians, setMusicians] = useState(null)

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "interview"] | order(date desc){
            stageName,
            profession,
            country,
            slug,
            profileImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
    }`)
            .then(data => setMusicians(data))
            .catch(console.error)
    }, [])

    return (
        <Container className='overflow-hidden'>
            <Row
                className='row-cols-2 row-cols-sm-2 row-cols-lg-6 row-cols-md-4 g-0 my-3 gy-2'>
                {_.map(musicians, (rocker, i) => (
                    <Link key={i} href={rocker.slug.current}>
                        <a className='p-0 text-white text-decoration-none'>
                            <Card className='scale mx-1 bg-transparent border-0 border-top border-danger border-2 rounded-top rounded-bottom'>
                                <Image
                                    className="d-block rounded-top"
                                    src={urlFor(rocker.profileImage.asset.url).width(160).height(240).url()}
                                    alt={`${rocker.stageName}`}
                                    layout="responsive"
                                    width={160}
                                    height={240}
                                />
                                <Card.ImgOverlay className='card__img--overlay'>
                                    <Card.Title className='text-light fw-bold'>{`${rocker.stageName} ${rocker.country}`}</Card.Title>
                                    <Card.Text>
                                        {rocker.profession.map((profession, i) => <Badge key={i} className='badge border border-danger text-danger rounded-pill style__pills fw-normal' pill>{profession}</Badge>)}
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </a>
                    </Link>
                ))}
            </Row>
        </Container>
    )
}