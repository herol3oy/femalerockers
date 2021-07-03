import BlockContent from "@sanity/block-content-to-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getPageContent, getAllPages } from "@lib/SanityApi";

export default function about({ data }) {
  let title = "";
  let excerpt = "";
  let publishedAt = "";
  let body = [];

  title = data[0]["title"];
  excerpt = data[0]["excerpt"];
  publishedAt = data[0]["publishedAt"];
  body = data[0]["body"];

  return (
    <Container>
      <Row>
        <h1 className="text-danger">{title}</h1>
        <p className="text-light">{excerpt}</p>
        <small className="text-light">
          {new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </small>
        <BlockContent
          className="text-light"
          blocks={body}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          // serializers={{ types: { block: BlockRenderer } }}
        />
      </Row>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPageContent(params.page);
  return {
    props: { data },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const content = await getAllPages();
  const paths = content.map((content) => ({
    params: { page: content.slug.toString() },
  }));
  return { paths, fallback: false };
}
