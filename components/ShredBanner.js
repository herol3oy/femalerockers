import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaYoutube } from "/node_modules/react-icons/fa";

const SHRED_BANNERS = [
  {
    href: "https://youtu.be/5mf1Hcl3wnQ",
    imgSrc:
      "https://res.cloudinary.com/dxu6gcib2/image/upload/v1619175748/Female%20Rockers/female-rockers-shred-collab-united-youtube-cover_ke2yuo.jpg",
    alt: "Female Rockers United",
  },
  {
    href: "https://youtu.be/04cnfAICCM4",
    imgSrc:
      "https://res.cloudinary.com/dxu6gcib2/image/upload/v1619526452/Female%20Rockers/female-rockers-cover-muse-youtube-banner_ynggqc.jpg",
    alt: "Muse Cover",
  },
];

export default function ShredBanner() {
  const [hoveredBanner, setHoveredImage] = useState(null);

  const handleMouseEnter = (bannerIndex) => setHoveredImage(bannerIndex);
  const handleMouseLeave = () => setHoveredImage(null);

  return (
    <Container>
      <Row className="my-5">
        <div className="col-12 col-lg-2 mt-2">
          <div className="d-none flex-column text-center d-sm-flex align-items-center justify-content-center bg-danger rounded-2 py-5 text-light">
            <FaYoutube className="display-1" />
          </div>
        </div>
        {SHRED_BANNERS.map((banner, bannerIndex) => {
          const isHovered = bannerIndex === hoveredBanner;
          return (
            <div className="col-12 col-lg-5 mt-2">
              <section
                className="banner-overlay overflow-hidden rounded-2 p-5"
                style={{
                  background: `url(${banner.imgSrc}) no-repeat`,
                  backgroundPosition: "center",
                  backgroundSize: isHovered ? "95%" : "160%",
                }}
                key={banner.href}
              >
                <div>
                  <h2 className="fw-bold text-light">{banner.alt}</h2>
                  <a href={banner.href} target="_blank">
                    <Button
                      className="btn btn-danger btn-lg  "
                      onMouseEnter={() => handleMouseEnter(bannerIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      Watch
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          );
        })}
      </Row>
      <style global jsx>{`
        .banner-overlay {
          position: relative;
          background-size: cover;
          z-index: 1;
          transition: all 300ms ease-in-out;
        }

        .banner-overlay::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </Container>
  );
}
