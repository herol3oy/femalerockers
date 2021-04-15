import { useState } from "react";
import Image from "next/image";
import Container from "@BS/Container";
import Row from "@BS/Row";

export default function ShredBanner() {
  const [bgColor, bgColorSet] = useState("#111111");

  const mouseOverHandle = () => {
    bgColorSet("black");
  };

  return (
    <Container>
      <Row>
        <a
          href="https://youtu.be/5mf1Hcl3wnQ"
          className="shred-banner position-relative"
          target="_blank"
          onMouseEnter={mouseOverHandle}
        >
          <h3
            className="position-absolute fw-bolder text-light"
            style={{ bottom: "0", zIndex: "-1" }}
          >
            BURNING ON <span className="text-danger">YOUTUBE! 🔥🤘</span>
          </h3>
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
        <div className="bg"></div>
      </Row>
      <style global jsx>{`
        .shred-banner {
          transition: transform 0.2s ease-in-out;
          transform: scale(1);
        }

        .shred-banner:hover {
          transition: transform 0.2s ease-in-out;
          transform: scale(0.95);
        }

        .shred-banner img {
          transition: transform 0.1s ease-in-out;
          transform: rotate(0deg) scale(1);
        }

        .shred-banner:hover img {
          transition: transform 0.3s ease-in-out;
          transform: rotate(5deg) scale(0.85);
        }

        .shred-banner:hover ~ .bg {
          background-color: ${bgColor};
        }

        .bg {
          position: fixed;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transition: 0.25s;
          pointer-events: none;
        }
      `}</style>
    </Container>
  );
}
