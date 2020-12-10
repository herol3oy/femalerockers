import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import sanityClient from '../lib/SanityClient'
import _ from 'lodash'
import Image from 'next/image'
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source);
  }

export default function Musicians() {
    const [musicians, setMusicians] = useState(null)

    useEffect(() => {
        sanityClient.fetch(`*[_type == "interview"]{
            firstName,
            lastName,
            profession,
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

    return (
        <Container>
            <Row>
                {_.map(musicians, (rocker, i) => (
                    <Card key={i} className="col-6 col-lg-2 p-0 bg-dark text-white">
                        <Image
                            className="d-block"
                            src={urlFor(rocker.profileImage.asset.url).url()}
                            alt="First slide"
                            layout="responsive"
                            width={800}
                            height={520}
                        />
                        <Card.ImgOverlay>
                            <Card.Title>{`${rocker.firstName} ${rocker.lastName}`}</Card.Title>
                            <Card.Text></Card.Text>
                            <Card.Text>Guitaris</Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                ))}
            </Row>
        </Container>
    )
}
