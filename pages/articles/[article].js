import BlockContent from '@sanity/block-content-to-react'
import Container from '@BS/Container'
import Row from '@BS/Row'

import {
    getAllArticleContents,
    getArticleContent
} from '@lib/SanityApi'

export default function article({ data }) {
    const {
        title,
        excerpt,
        publishedAt,
        body,
    } = data[0]

    return (
        <Container>
            <Row>
                <h1 className='text-danger'>{title}</h1>
                <p className='text-light'>{excerpt}</p>
                <small className='text-light'>
                    {new Date(publishedAt).toLocaleDateString('en-US', { 'year': 'numeric', 'month': 'long' })}
                </small>
                <BlockContent
                    className='text-light'
                    blocks={body}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                // serializers={{ types: { block: BlockRenderer } }}
                />
            </Row>
        </Container>
    )
}

export async function getStaticProps({ params }) {
    const data = await getArticleContent(params.article)
    return {
        props: { data },
    }
}

export async function getStaticPaths() {
    const content = await getAllArticleContents()
    const paths = content.map((content) => ({
        params: { article: content.slug.toString() },
    }))
    return { paths, fallback: false }
}