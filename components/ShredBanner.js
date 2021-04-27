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
      <Row className="my-5 g-0">
        <h3 className="fw-light text-light text-center mb-3">
          BURNING ON{" "}
          <span className="text-danger fw-bold">YOUTUBE! 🔥🎸🤘</span>
        </h3>

        <section className="col-12 col-lg-6">
          <a
            href="https://youtu.be/5mf1Hcl3wnQ"
            className="shred-banner "
            target="_blank"
            onMouseEnter={mouseOverHandle}
          >
            <Image
              className="cover__img"
              alt="Female Rockers Shred Collab"
              src="https://res.cloudinary.com/dxu6gcib2/image/upload/v1619175748/Female%20Rockers/female-rockers-shred-collab-united-youtube-cover_ke2yuo.jpg"
              layout="responsive"
              width={900}
              height={250}
              objectFit="cover"
            />
          </a>
        </section>

        <section
          className="mt-3 mt-lg-0 col-12 col-lg-6"
          // style={{ zIndex: "1" }}
        >
          <a
            href="https://youtu.be/04cnfAICCM4"
            className="shred-banner position-relative"
            target="_blank"
            onMouseEnter={mouseOverHandle}
          >
            <Image
              className="cover__img"
              alt="Female Rockers - guitar & drum Cover - Muse"
              src="https://res.cloudinary.com/dxu6gcib2/image/upload/v1619526452/Female%20Rockers/female-rockers-cover-muse-youtube-banner_ynggqc.jpg"
              layout="responsive"
              width={900}
              height={250}
              objectFit="cover"
            />
          </a>
        </section>
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
          transform: rotate(0deg) scale(0.95);
        }

        section:hover ~ .bg {
          background-color: ${bgColor};
        }

        .bg {
          position: fixed;
          z-index: -2;
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
