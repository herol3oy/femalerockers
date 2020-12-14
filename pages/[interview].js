import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import sanityClient from '../lib/SanityClient'
import BlockContent from "@sanity/block-content-to-react"
import imageUrlBuilder from "@sanity/image-url"
import Image from 'next/image'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import styled from "styled-components"
import { FaYoutube } from "react-icons/fa"
import { FaSpotify } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaLink } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import {
    motion,
    useSpring,
    useTransform,
    useViewportScroll
} from "framer-motion"

const StyledTitle = styled.h2`
    background: linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const BgWrap = styled.section`
    height: 100vh;
    overflow: hidden;
    z-index: -1;
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
const StyledInfoBox = styled.section`
    position: absolute;
    bottom: 0;
    left: 6wh;
    z-index: 99999;
    color: red;
`

export default function interview() {
    const [interviewContent, setInterviewContent] = useState(null)
    const ref = useRef(null)
    const router = useRouter()
    const { interview } = router.query

    const builder = imageUrlBuilder(sanityClient)
    const urlFor = (source) => builder.image(source)

    useEffect(() => {
        window.scrollTo({ top: 0 })

        sanityClient
            .fetch(
                `*[_type == "interview" && slug.current == "${interview}"]{
                    title,
                    excerpt,
                    title,
                    excerpt,
                    firstName,
                    lastName,
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
                    body,
                    
                }`
            )
            .then((musician) => setInterviewContent(musician[0]))
            .catch(console.error)
    }, [interview])

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
        if (props.node.children[0].marks[0] !== 'strong' && props.node.children[0].text !== interviewContent.firstName.toUpperCase()) {
            return (
                <div className='my-4'>
                    <dt className='fw-bold'>
                        {interviewContent.firstName.toUpperCase()}
                    </dt>
                    <dd className='h5 lh-base fw-thin'>
                        {props.node.children[0].text}
                    </dd>
                </div>
            )
        }
        return null
    }

    if (!interviewContent) return <div>Loading...</div>

    return (
        <>
            <div>
                <BgWrap>
                    <Image
                        src={urlFor(interviewContent.coverImage.asset).url()}
                        alt={interviewContent.firstName}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </BgWrap>
                <motion.div
                    ref={ref}
                    style={{ opacity }}
                    className='d-flex justify-content-center '
                >
                    <StyledInfoBox className='d-flex justify-content-start justify-content-lg-center bg-dark'>
                        <Image
                            src={urlFor(interviewContent.profileImage.asset).url()}
                            width={160}
                            height={240}
                        />
                        <div className='align-self-end'>

                            {interviewContent.profession.map((profession, i) => {
                                return <Badge key={i} className='badge rounded-pill bg-danger' pill variant="danger">{profession}</Badge>
                            })}
                            <h1 className='display-2 text-danger fw-bold'>{`${interviewContent.firstName} ${interviewContent.lastName}`}</h1>
                            {interviewContent.youtube
                                ? <Link href={interviewContent.youtube}>
                                    <a target='_blank'>
                                        <FaYoutube className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }
                            {interviewContent.spotify
                                ? <Link href={interviewContent.spotify}>
                                    <a target='_blank'>
                                        <FaSpotify className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }
                            {interviewContent.instagram
                                ? <Link href={interviewContent.instagram}>
                                    <a target='_blank'>
                                        <FaInstagram className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }
                            {interviewContent.website
                                ? <Link href={interviewContent.website}>
                                    <a target='_blank'>
                                        <FaLink className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }
                            {interviewContent.twitter
                                ? <Link href={interviewContent.twitter}>
                                    <a target='_blank'>
                                        <FaTwitter className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }
                            {interviewContent.facebook
                                ? <Link href={interviewContent.facebook}>
                                    <a target='_blank'>
                                        <FaFacebookF className='h4 mx-1 text-light' />
                                    </a>
                                </Link>
                                : null
                            }

                        </div>
                    </StyledInfoBox>
                </motion.div>
            </div>

            <Container>
                <Row className='justify-content-center'>
                    <section className='col-12 col-lg-7 col-md-10'>
                        <StyledTitle className='display-5 fw-bolder'>
                            {interviewContent.title}
                        </StyledTitle>
                        <p className='h3 lh-base text-light'>
                            {interviewContent.excerpt}
                        </p>
                        <hr className='my-5 text-light' />
                        <BlockContent
                            className='text-light'
                            blocks={interviewContent.body}
                            projectId="ldn05m4o"
                            dataset="production"
                            serializers={{ types: { block: BlockRenderer } }}
                        />
                    </section>
                </Row>
            </Container>
        </>
    )
}
