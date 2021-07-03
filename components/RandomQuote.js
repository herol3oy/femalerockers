import Link from "next/link";
import random from "lodash/random";
import Container from "react-bootstrap/Container";
import sanityClient from "@lib/SanityClient";
import useSWR from "swr";
import groq from "groq";

export default function RandomQuote() {
  const { data, error } = useSWR(
    groq`*[_type == "interview" && defined(quote)]{
      stageName,
      slug,
      quote,
  }`,
    (query) => sanityClient.fetch(query)
  );
  if (error) return <div>Failed</div>;
  if (!data) return <div>Loading...</div>;
  const quote = data[random(data?.length - 1)];

  return (
    <Container fluid className="accent-red-color border-0 mt-5">
      <Container className="d-flex flex-column justify-content-center align-items-center p-5">
        <p className="homepage__quotation h3 text-center text-light">
          {`"${quote.quote}"`}
        </p>
        <Link href={quote.slug.current || "/"}>
          <a className="text-light">{`~ ${quote.stageName || " "} ~`}</a>
        </Link>
      </Container>
    </Container>
  );
}
