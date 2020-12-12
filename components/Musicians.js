import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import sanityClient from '../lib/SanityClient'
import _ from 'lodash'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url"
import Link from 'next/link'
import styled from "styled-components"
import { motion } from 'framer-motion'

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source) => builder.image(source)

const StyledImgOverlay = styled(Card.ImgOverlay)`
  top: unset;
`

export default function Musicians() {
    const [musicians, setMusicians] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "interview"]{
            firstName,
            lastName,
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
            .then((data) => setMusicians(data))
            .catch(console.error)
    }, [])

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }

    return (
        <Container className='overflow-hidden'>
            <Row
                className='row-cols-2 row-cols-sm-2 row-cols-lg-6 row-cols-md-4 g-0 my-3 gy-2'>
                {_.map(musicians, (rocker, i) => (
                    <Link key={i} href={rocker.slug.current}>
                        <motion.a
                            initial='hidden'
                            animate='visible'
                            variants={variants}
                            drag='x'
                            dragConstraints={{ left: -100, right: 100 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='p-0 text-white text-decoration-none'>
                            <Card

                                className='px-1 bg-transparent border-0 border-top'>
                                <Image
                                    className="border-top border-danger border-2 rounded-top rounded-bottom d-block"
                                    src={urlFor(rocker.profileImage.asset.url).width(160).height(240).url()}
                                    alt={`${rocker.firstName} ${rocker.lastName}`}
                                    layout="responsive"
                                    width={160}
                                    height={240}
                                />
                                <StyledImgOverlay>
                                    <Card.Title className='text-danger fw-bold'>{`${rocker.firstName} ${rocker.lastName} ${rocker.country}`}</Card.Title>
                                    <Card.Text>
                                        {rocker.profession.map((profession, i) => <Badge key={i} className='badge rounded-pill bg-danger' pill variant="danger">{profession}</Badge>)}
                                    </Card.Text>
                                </StyledImgOverlay>
                            </Card>
                        </motion.a>
                    </Link>
                ))}
            </Row>
        </Container>
    )
}
