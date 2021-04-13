import Image from "next/image";
import Link from "next/link";
import Container from "@BS/Container";
import Row from "@BS/Row";

export default function ShredBanner() {
  return (
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
      <style jsx>{`
        .shred-banner:hover {
          transform: scale(0.95);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </Container>
  );
}
