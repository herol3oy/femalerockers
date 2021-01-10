import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
import Carousel from '@BS/Carousel'
import Container from '@BS/Container'
import Row from '@BS/Row'
import Badge from '@BS/Badge'
import sanityClient from '@lib/SanityClient'
import imageUrlBuilder from '@sanity/image-url'
import { FaLongArrowAltRight } from 'react-icons/fa'
import CarouselSkeleton from './skeletons/CarouselSkeleton'

const urlFor = (source) => imageUrlBuilder(sanityClient).image(source)

export default function carousel() {
  const [carousel, setCarousel] = useState(null)

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "interview"] | order(date desc) [0..4]{
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

  if (!carousel) return <CarouselSkeleton />

  return (
    <Container className='my-3'>
      <Carousel className='carousel' prevLabel='' nextLabel=''>
        {_.map(carousel, (rocker, i) => {
          return (
            <Carousel.Item key={i}>
              <Image
                className='d-block'
                src={urlFor(rocker.coverImage.asset).url()}
                alt={rocker.stageName}
                layout='fill'
                objectFit='cover'
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
                          layout='intrinsic'
                          objectFit='cover'
                          width={162}
                          height={240}
                        />
                      </div>
                      <div className='col-8 text-start align-self-end'>
                        <h5 className='text-start text-danger fw-bolder m-0'>{`${rocker.stageName} ${rocker.country}`}</h5>
                        <h3 className='text-start fw-lighter d-lg-block d-none'>
                          {rocker.title}
                        </h3>
                        <u>
                          <strong>
                              <small>
                                READ MORE <FaLongArrowAltRight />
                              </small>
                          </strong>
                        </u>
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
