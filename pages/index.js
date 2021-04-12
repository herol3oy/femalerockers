import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@components/Carousel";
import Musicians from "@components/Musicians";
import RandomQuote from "@components/RandomQuote";
import CustomHead from "@components/CustomHead";
import Container from "@BS/Container";
import Row from "@BS/Row";

export default function Home() {
  useEffect(() => window.scrollTo({ top: 0 }), []);

  return (
    <>
      <CustomHead />
      <Carousel />
      <Container>
        <Row>
          <a
            href="https://youtu.be/5mf1Hcl3wnQ"
            className="shred-banner"
            target="_blank"
          >
            <Image
              className="cover__img rounded"
              alt="Female Rockers Shred Collab"
              src="/female-shred-collab.jpg"
              layout="responsive"
              width={900}
              height={250}
              objectFit="cover"
            />
          </a>
        </Row>
      </Container>
      <Musicians />
      <RandomQuote />
      <style jsx>{`
        .shred-banner:hover {
          transform: scale(0.95);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}
