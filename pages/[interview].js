import { useRef } from 'react'
import sanityClient from '../lib/SanityClient'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import { FaYoutube } from 'react-icons/fa'
import { FaSpotify } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'
import { getInterviewContent, getAllContentWithSlug } from '../lib/SanityApi'
import _ from 'lodash'
import Head from 'next/head'
import {
    StyledTitle,
    BgWrap,
    StyledInfoBox
} from '../styles/layout'
import {
    motion,
    useSpring,
    useTransform,
    useViewportScroll
} from 'framer-motion'

export default function interview({ data }) {
    const ref = useRef(null)

    const urlFor = (source) =>
        imageUrlBuilder(sanityClient).image(source)

    const { scrollY } = useViewportScroll()
    const yRange = useTransform(scrollY, [350, 0], [0, 1])
    const opacity = useSpring(yRange, { stiffness: 400, damping: 40 })

    const BlockRenderer = (props) => {
        const { marks, text } = props.node.children[0]
        if (props.node.style === 'blockquote') return <blockquote>{text}</blockquote>
        if (marks[0] === 'strong') {
            return (
                <div>
                    <dt>
                        <Image
                            src='/android-chrome-192x192.png'
                            width={32}
                            height={32}
                        />
                    </dt>
                    <dd className='h5 fw-bold'>{text}</dd>
                </div>
            )
        }
        if (props.node.children[0].marks[0] !== 'strong' && props.node.children[0].text !== data[0].stageName.toUpperCase()) {
            return (
                <div className='my-4'>
                    <dt className='fw-bold'>
                        {data[0].stageName.toUpperCase()}
                    </dt>
                    <dd className='h5 lh-base fw-thin'>
                        {props.node.children[0].text}
                    </dd>
                </div>
            )
        }
        return null
    }

    if (!data[0]) return <div>Loading...</div>

    return (
        <>
            <Head>
                <title>
                    FemaleRockers | Exclusive Interview With {`${data[0].stageName}`}
                </title>
            </Head>

            <BgWrap>
                <Image
                    src={urlFor(data[0].coverImage.asset).url()}
                    alt={data[0].stageName}
                    layout='fill'
                    objectFit='cover'
                />
            </BgWrap>
            <motion.div
                ref={ref}
                style={{ opacity }}
                className='d-flex justify-content-center '
            >
                <StyledInfoBox className='d-flex justify-content-start justify-content-lg-center bg-dark'>
                    <Image
                        src={urlFor(data[0].profileImage.asset).url()}
                        width={160}
                        height={240}
                    />
                    <div className='align-self-end p-2'>

                        {data[0].profession.map((profession, i) => {
                            return <Badge key={i} className='badge rounded-pill bg-danger' pill variant='danger'>{profession}</Badge>
                        })}
                        <h1 className='display-2 text-danger fw-bold'>{`${data[0].stageName}`}</h1>
                        {data[0].youtube
                            ? <Link href={data[0].youtube}>
                                <a target='_blank'>
                                    <FaYoutube className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }
                        {data[0].spotify
                            ? <Link href={data[0].spotify}>
                                <a target='_blank'>
                                    <FaSpotify className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }
                        {data[0].instagram
                            ? <Link href={data[0].instagram}>
                                <a target='_blank'>
                                    <FaInstagram className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }
                        {data[0].website
                            ? <Link href={data[0].website}>
                                <a target='_blank'>
                                    <FaLink className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }
                        {data[0].twitter
                            ? <Link href={data[0].twitter}>
                                <a target='_blank'>
                                    <FaTwitter className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }
                        {data[0].facebook
                            ? <Link href={data[0].facebook}>
                                <a target='_blank'>
                                    <FaFacebookF className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                            : null
                        }

                    </div>
                </StyledInfoBox>
            </motion.div>

            <Container>
                <Row className='justify-content-center'>
                    <section className='col-12 col-lg-7 col-md-10'>
                        <StyledTitle className='display-5 fw-bolder'>
                            {data[0].title}
                        </StyledTitle>
                        <p className='h3 lh-base text-light'>
                            {data[0].excerpt}
                        </p>
                        <hr className='my-5 text-light' />
                        <BlockContent
                            className='text-light'
                            blocks={data[0].body}
                            projectId='ldn05m4o'
                            dataset='production'
                            serializers={{ types: { block: BlockRenderer } }}
                        />
                    </section>
                </Row>
            </Container>
        </>
    )
}

export async function getStaticProps({ params }) {
    const data = await getInterviewContent(params.interview)
    return {
        props: { data },
    }
}

export async function getStaticPaths() {
    const content = await getAllContentWithSlug()
    const paths = content.map((content) => ({
        params: { interview: content.slug.toString() },
    }))
    return { paths, fallback: false }
}