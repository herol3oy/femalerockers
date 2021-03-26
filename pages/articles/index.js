import { useEffect, useState } from "react";
import Link from "next/link";
import sanityClient from "@lib/SanityClient";
import Container from "@BS/Container";
import Row from "@BS/Row";
import _ from "lodash";

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
        {_.map(articles, (article, i) => (
          <div key={i}>
            <Link href={`/articles/${article.slug.current}`}>
              <a>
                <h1>{article.title}</h1>
              </a>
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
