import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import lodashRange from "lodash/range";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import sanityClient from "@lib/SanityClient";
import imageUrlBuilder from "@sanity/image-url";
import CardSkeleton from "./skeletons/CardSkeleton";
import useSWR from "swr";
import groq from "groq";

const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);

export default function Musicians() {
  const [musicians, setMusicians] = useState([]);

  const { data, error } = useSWR(
    groq`*[_type == "interview"] | order(date desc) {
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

  useEffect(() => {
    if (data) {
      setMusicians(data);
    }
  }, [data]);

  if (error) return <div>Failed</div>;

  if (!data) {
    return (
      <Container className="overflow-hidden">
        <Row className="g-0 my-3 gy-2">
          {lodashRange(18).map((index) => (
            <CardSkeleton key={index.toString()} />
          ))}
        </Row>
      </Container>
    );
  }

  const filterMusicians = (musicianType) => {
    const filteredMusicians = data.filter((musician) =>
      musician.profession.includes(musicianType)
    );
    setMusicians(filteredMusicians);
  };

  const allMusicians = () => setMusicians(data);

  const filterringButtons = [
    { label: "All", onClick: allMusicians, variant: "secondary" },
    { label: "Drummers 🥁", onClick: () => filterMusicians("drummer") },
    { label: "Guitarists 🎸", onClick: () => filterMusicians("guitarist") },
    { label: "Vocalists 🎙️", onClick: () => filterMusicians("vocalist") },
    { label: "Bassist 🎸", onClick: () => filterMusicians("bassist") },
  ];

  return (
    <Container className="overflow-hidden">
      <div className="d-flex justify-content-center gap-2">
        {filterringButtons.map((button) => (
          <Button
            key={button.label}
            size="sm"
            variant={button.variant || "primary"}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <Row className="row-cols-2 row-cols-sm-2 row-cols-lg-6 row-cols-md-4 g-0 my-3 gy-2">
        {musicians.map((rocker) => {
          const { stageName, country, profession, title, slug, profileImage } =
            rocker;
          const professionIcons = {
            bassist: "🎸",
            drummer: "🥁",
            vocalist: "🎙️",
            guitarist: "🎸",
          };
          const shortenedTitle =
            title.length > 35 ? `${title.slice(0, 35)}...` : title;

          return (
            <Link
              key={stageName}
              href={slug.current}
              className="p-0 text-white text-decoration-none"
            >
              <Card className="scale mx-1 bg-transparent border-0 border-top border-danger border-2 rounded-top rounded-bottom">
                <Image
                  className="d-block rounded-top"
                  src={urlFor(profileImage.asset.url)
                    .width(160)
                    .height(240)
                    .url()}
                  alt={stageName}
                  layout="responsive"
                  width={160}
                  height={240}
                />
                <Card.ImgOverlay className="card__img--overlay d-flex flex-column justify-content-between h-100">
                  <Card.Text>
                    <Card.Title className="text-light fw-bold interview-title">{`${stageName} ${country}`}</Card.Title>
                    {profession.map((p, index) => (
                      <span key={index.toString()} aria-label={p} role="img">
                        {professionIcons[p]}
                      </span>
                    ))}
                  </Card.Text>
                  <small className="h6">
                    <span className="h6 accent-red-color-text fw-bolder">
                      /{" "}
                    </span>
                    {shortenedTitle}
                  </small>
                </Card.ImgOverlay>
              </Card>
            </Link>
          );
        })}
      </Row>
    </Container>
  );
}
