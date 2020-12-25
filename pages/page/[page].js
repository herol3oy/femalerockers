import BlockContent from '@sanity/block-content-to-react'
import Container from '@BS/Container'
import Row from '@BS/Row'
import { getPageContent, getAllPages } from '@lib/SanityApi'

export default function about({ data }) {
  const { title, excerpt, publishedAt, body } = data[0]

  return (
    <Container>
      <Row>
        <h1 className='text-danger'>{title}</h1>
        <p className='text-light'>{excerpt}</p>
        <small className='text-light'>
          {new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </small>
        <BlockContent
          className='text-light'
          blocks={body}
          projectId='ldn05m4o'
          dataset='production'
          // serializers={{ types: { block: BlockRenderer } }}
        />
      </Row>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPageContent(params.page)
  return {
    props: { data },
  }
}

export async function getStaticPaths() {
  const content = await getAllPages()
  const paths = content.map((content) => ({
    params: { page: content.slug.toString() },
  }))
  return { paths, fallback: false }
}
