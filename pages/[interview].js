import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import sanityClient from '../lib/SanityClient'
import BlockContent from "@sanity/block-content-to-react"
import imageUrlBuilder from "@sanity/image-url"
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from "styled-components"

const StyledTitle = styled.h2`
    background: linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
export default function interview() {
    const [interviewContent, setInterviewContent] = useState(null)

    const router = useRouter()
    const { interview } = router.query

    const builder = imageUrlBuilder(sanityClient)
    const urlFor = (source) => builder.image(source)

    useEffect(() => {
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

    if (!interviewContent) return <div>Loading...</div>

    const BlockRenderer = (props) => {
        const { marks, text } = props.node.children[0]
        if (props.node.style === 'blockquote') return <blockquote>{text}</blockquote>
        if (marks[0] === 'strong') return <><dt>FS</dt><dd>{text}</dd></>
        if (props.node.children[0].marks[0] !== 'strong' && props.node.children[0].text !== interviewContent.firstName.toUpperCase()) return <><dt>{interviewContent.firstName.toUpperCase()}</dt><dd>{props.node.children[0].text}</dd></>
        return null
    }

    return (
        <>
            <section className='position-relative'>
                <Image
                    className="position-absolute"
                    src={urlFor(interviewContent.coverImage.asset).url()}
                    alt={interviewContent.firstName}
                    layout="responsive"
                    width={1200}
                    height={800}
                />
                <div className='position-absolute'>

                </div>
            </section>
            <Container>
                <Row className='justify-content-center'>
                    <section className='col-12 col-lg-7 col-md-8'>
                        <StyledTitle className='display-5 fw-bolder mt-5'>
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
