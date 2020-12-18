import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
import sanityClient from '@lib/SanityClient'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Container from '@BS/Container'
import Row from '@BS/Row'
import Badge from '@BS/Badge'
import { FaYoutube } from '@ICONS/fa'
import { FaSpotify } from '@ICONS/fa'
import { FaInstagram } from '@ICONS/fa'
import { FaLink } from '@ICONS/fa'
import { FaTwitter } from '@ICONS/fa'
import { FaFacebookF } from '@ICONS/fa'
import {
    getInterviewContent,
    getAllContentWithSlug
} from '@lib/SanityApi'
import {
    motion,
    useSpring,
    useTransform,
    useViewportScroll
} from 'framer-motion'
import NewsLetter from '@components/NewsLetter'

export default function interview({ data }) {
    const {
        title,
        excerpt,
        stageName,
        country,
        profession,
        profileImage,
        coverImage,
        instagram,
        spotify,
        facebook,
        twitter,
        youtube,
        website,
        date,
        body, } = data[0]

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
                            src='/logo.png'
                            width={32}
                            height={32}
                        />
                    </dt>
                    <dd className='h5 fw-bold'>{text}</dd>
                </div>
            )
        }
        if (props.node.children[0].marks[0] !== 'strong' && props.node.children[0].text !== stageName.split(' ').shift().toUpperCase()) {
            return (
                <div className='my-4'>
                    <dt className='fw-bold'>
                        {stageName.split(' ').shift().toUpperCase()}
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
                    FemaleRockers | Exclusive Interview With {`${stageName}`}
                </title>
            </Head>

            <section className='interview__coverimg'>
                <Image
                    src={urlFor(coverImage.asset).url()}
                    alt={stageName}
                    layout='fill'
                    objectFit='cover'
                />
            </section>
            <motion.div
                ref={ref}
                style={{ opacity }}
                className='d-flex justify-content-center '
            >
                <section className='interview__profile--box d-flex justify-content-start justify-content-lg-center bg-dark'>
                    <Image
                        src={urlFor(profileImage.asset).url()}
                        width={160}
                        height={240}
                    />
                    <div className='align-self-end p-2'>

                        {profession.map((profession, i) => {
                            return <Badge key={i} className='badge rounded-pill bg-danger' pill variant='danger'>{profession}</Badge>
                        })}
                        <h1 className='display-2 text-danger fw-bold'>{`${stageName} ${country}`}</h1>
                        <p className='text-light small'>{new Date(date).toLocaleDateString('en-US', { 'year': 'numeric', 'month': 'long' })}</p>
                        {youtube &&
                            <Link href={youtube}>
                                <a target='_blank'>
                                    <FaYoutube className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }
                        {spotify &&
                            <Link href={spotify}>
                                <a target='_blank'>
                                    <FaSpotify className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }
                        {instagram &&
                            <Link href={instagram}>
                                <a target='_blank'>
                                    <FaInstagram className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }
                        {website &&
                            <Link href={website}>
                                <a target='_blank'>
                                    <FaLink className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }
                        {twitter &&
                            <Link href={twitter}>
                                <a target='_blank'>
                                    <FaTwitter className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }
                        {facebook &&
                            <Link href={facebook}>
                                <a target='_blank'>
                                    <FaFacebookF className='h4 mx-1 text-light' />
                                </a>
                            </Link>
                        }

                    </div>
                </section>
            </motion.div>

            <Container>
                <Row className='justify-content-center'>
                    <section className='col-12 col-lg-7 col-md-10'>
                        <h2 className='interview__title display-5 fw-bolder'>
                            {title}
                        </h2>
                        <p className='h3 lh-base text-light'>
                            {excerpt}
                        </p>
                        <hr className='my-5 text-light' />
                        <BlockContent
                            className='text-light'
                            blocks={body}
                            projectId='ldn05m4o'
                            dataset='production'
                            serializers={{ types: { block: BlockRenderer } }}
                        />
                        <NewsLetter />
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