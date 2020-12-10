import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import sanityClient from '../lib/SanityClient'
import BlockContent from "@sanity/block-content-to-react";

export default function interview() {
    const [singlePost, setSinglePost] = useState(null)

    const router = useRouter()
    const { interview } = router.query

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
            .then((musician) => setSinglePost(musician[0]))
            .catch(console.error)
    }, [interview])

    if (!singlePost) return <div>Loading...</div>


    return (
        <div>
            <h1>{singlePost.title}</h1>
            <span className='text-light'>
                <BlockContent
                    blocks={singlePost.body}
                    projectId="ldn05m4o"
                    dataset="production"
                />
            </span>
        </div>
    )
}
