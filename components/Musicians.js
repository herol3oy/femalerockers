import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import lodashMap from "lodash/map";
import lodashRange from "lodash/range";
import Container from "@BS/Container";
import Card from "@BS/Card";
import Row from "@BS/Row";
import Button from "@BS/Button";
import sanityClient from "@lib/SanityClient";
import imageUrlBuilder from "@sanity/image-url";
import CardSkeleton from "./skeletons/CardSkeleton";
import useSWR from "swr";
import groq from "groq";

const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);
const postsPerPage = 24;

export default function Musicians() {
  const [pageIndex, setPageIndex] = useState(postsPerPage);

  const { data, error } = useSWR(
    groq`*[_type == "interview"] | order(date desc) [${
      pageIndex - postsPerPage
    }...${pageIndex}]{
               stageName,
               title,
               profession,
               country,
               slug,
               profileImage{
                   asset->{
                       _id,
                       url
                   },
                   alt
               }
       }`,
    (query) => sanityClient.fetch(query)
  );
  if (error) return <div>Failed</div>;
  if (!data)
    return (
      <Container className="overflow-hidden">
        <Row className="g-0 my-3 gy-2">
          {lodashRange(18).map((i) => (
            <CardSkeleton key={i} />
          ))}
        </Row>
      </Container>
    );

  return (
    <Container className="overflow-hidden">
      <Row className="row-cols-2 row-cols-sm-2 row-cols-lg-6 row-cols-md-4 g-0 my-3 gy-2">
        {lodashMap(data, (rocker, i) => (
          <Link key={i} href={rocker.slug.current}>
            <a className="p-0 text-white text-decoration-none">
              <Card className="scale mx-1 bg-transparent border-0 border-top border-danger border-2 rounded-top rounded-bottom">
                <Image
                  className="d-block rounded-top"
                  src={urlFor(rocker.profileImage.asset.url)
                    .width(160)
                    .height(240)
                    .url()}
                  alt={rocker.stageName}
                  layout="responsive"
                  width={160}
                  height={240}
                />
                <Card.ImgOverlay className="card__img--overlay d-flex flex-column justify-content-between h-100">
                  <Card.Text>
                    <Card.Title className="text-light fw-bold interview-title">{`${rocker.stageName} ${rocker.country}`}</Card.Title>

                    {rocker.profession.map((profession, i) => (
                      <span key={i} aria-label="bassist" role="img">
                        {(profession === "bassist" && `🎸`) ||
                          (profession === "drummer" && `🥁`) ||
                          (profession === "vocalist" && `🎙️`) ||
                          (profession === "guitarist" && `🎸`)}
                      </span>
                    ))}
                  </Card.Text>
                  <small className="h6">
                    <span className="h6 accent-red-color-text fw-bolder">
                      /{` `}
                    </span>
                    {rocker.title.length > 35
                      ? `${rocker.title.slice(0, 35)}...`
                      : rocker.title}
                  </small>
                </Card.ImgOverlay>
              </Card>
            </a>
          </Link>
        ))}
      </Row>
      <Row>
        <section className="d-flex justify-content-center">
          <Button
            className="mx-1"
            disabled={pageIndex <= postsPerPage && "disabled"}
            variant="dark"
            size="sm"
            onClick={() => setPageIndex(pageIndex - postsPerPage)}
          >
            👈
          </Button>
          <Button
            className="mx-1"
            disabled={data.length < postsPerPage && "disabled"}
            variant="dark"
            size="sm"
            onClick={() => setPageIndex(pageIndex + postsPerPage)}
          >
            👉
          </Button>
        </section>
      </Row>
    </Container>
  );
}
