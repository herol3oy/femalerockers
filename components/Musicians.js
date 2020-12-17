import Container from '@BS/Container'
import Card from '@BS/Card'
import Row from '@BS/Row'
import Badge from '@BS/Badge'
import sanityClient from '@lib/SanityClient'
import _ from 'lodash'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url"
import Link from 'next/link'
import { motion } from 'framer-motion'

const urlFor = (source) =>
    imageUrlBuilder(sanityClient).image(source)

export default function Musicians({ data }) {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    return (
        <Container className='overflow-hidden'>
            <Row
                className='row-cols-2 row-cols-sm-2 row-cols-lg-6 row-cols-md-4 g-0 my-3 gy-2'>
                {_.map(data, (rocker, i) => (
                    <Link key={i} href={rocker.slug.current}>
                        <motion.a
                            initial='hidden'
                            animate='visible'
                            // variants={variants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='p-0 text-white text-decoration-none'>
                            <Card className='mx-1 bg-transparent border-0 border-top border-danger border-2 rounded-top rounded-bottom'>
                                <Image
                                    className="d-block rounded-top"
                                    src={urlFor(rocker.profileImage.asset.url).width(160).height(240).url()}
                                    alt={`${rocker.stageName}`}
                                    layout="responsive"
                                    width={160}
                                    height={240}
                                />
                                <Card.ImgOverlay className='card__img--overlay'>
                                    <Card.Title className='text-danger fw-bold'>{`${rocker.stageName} ${rocker.country}`}</Card.Title>
                                    <Card.Text>
                                        {rocker.profession.map((profession, i) => <Badge key={i} className='badge rounded-pill bg-danger' pill variant="danger">{profession}</Badge>)}
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </motion.a>
                    </Link>
                ))}
            </Row>
        </Container>
    )
}