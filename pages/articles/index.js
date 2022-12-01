import { useEffect, useState } from "react";
import Link from "next/link";
import sanityClient from "@lib/SanityClient";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import lodashMap from "lodash/map";

export default function index() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(date){
                title,
                slug,
                excerpt,
                publishedAt,
                body,
            }`
      )
      .then((data) => setArticles(data))
      .catch(console.error);
  }, []);

  if (!articles) return <h1>Loading..</h1>;

  return (
    <Container>
      <Row>
        {lodashMap(articles, (article, index) => (
          <div key={index.toString()}>
            <Link href={`/articles/${article.slug.current}`}>
              <h1>{article.title}</h1>
            </Link>
            <p>{article.excerpt}</p>
            <small>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </small>
          </div>
        ))}
      </Row>
    </Container>
  );
}
