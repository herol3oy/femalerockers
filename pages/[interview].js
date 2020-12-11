import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import sanityClient from '../lib/SanityClient'
import BlockContent from "@sanity/block-content-to-react"
import imageUrlBuilder from "@sanity/image-url"
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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

    return (
        <>
            <Image
                className="cover__img"
                src={urlFor(interviewContent.coverImage.asset).url()}
                alt={interviewContent.firstName}
                layout="responsive"
                width={1200}
                height={800}
            />
            <strong>{interviewContent.title}</strong>
            <p>{interviewContent.excerpt}</p>
            <BlockContent
                className='col-7 text-light'
                blocks={interviewContent.body}
                projectId="ldn05m4o"
                dataset="production"
                imageOptions={{ w: 800, h: 600, fit: 'max' }}
            />
        </>
    )
}
