import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import sanityClient from "@lib/SanityClient";
import imageUrlBuilder from "@sanity/image-url";
import Container from "@BS/Container";
import Card from "@BS/Card";
import CarouselSkeleton from "./skeletons/CarouselSkeleton";
import Carousel from "react-multi-carousel";
import lodashMap from "lodash/map";
import "react-multi-carousel/lib/styles.css";
import Logo from "@components/svg/Logo";

const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    paritialVisibilityGutter: 20,
    items: 1,
  },
};

export default function NewCarousel() {
  const [carousel, setCarousel] = useState(null);
  const [sliderBgImg, setSliderBgImg] = useState("");
  const [
    selectedMusicianOnMouseEnter,
    setSelectedMusicianOnMouseEnter,
  ] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "interview"] | order(date desc) [0..4]{
                    stageName,
                    title,
                    country,
                    profileImage,
                    coverImage,
                    profession,
                    slug,
                }`
      )
      .then((musician) => setCarousel(musician))
      .catch(console.error);
  }, []);

  const mouseEnterHandle = (url, stageName) => {
    setSliderBgImg(urlFor(url).url());
    setSelectedMusicianOnMouseEnter(stageName);
  };

  const mouseLeaveHandle = () => {
    setSliderBgImg("");
    setSelectedMusicianOnMouseEnter(null);
  };

  const CardBodyText = (rocker) => (
    <Link href={rocker.slug.current}>
      <a>
        <Card.Body className="card-body__description">
          <div className="position-absolute col-8 text-start align-self-end card-body__wrapper">
            {selectedMusicianOnMouseEnter && <Logo style={{ width: "35px" }} />}
            <h5 className="small text-start accent-red-color-text fw-bolder m-0 mt-3">
              <span className="card-stage-name">
                {rocker.stageName} {rocker.country}
              </span>
            </h5>
            <h3 className="text-start text-light card-title mt-1">
              <span className="card-excerpt">{rocker.title}</span>
            </h3>
          </div>
        </Card.Body>
      </a>
    </Link>
  );

  const renderCardSlider = (rocker) => {
    if (selectedMusicianOnMouseEnter === null)
      return <CardBodyText {...rocker} />;

    if (selectedMusicianOnMouseEnter === rocker.stageName) {
      return <CardBodyText {...rocker} />;
    }
  };

  if (!carousel) return <CarouselSkeleton />;

  return (
    <Container className="my-3">
      <section className="section-wrapper">
        <Carousel
          ssr={false}
          infinite={true}
          showDots={false}
          autoPlaySpeed={4000}
          partialVisbile
          autoPlay
          responsive={responsive}
          removeArrowOnDeviceType={["mobile"]}
        >
          <Link href="/page/about">
            <a className="text-decoration-none">
              <div
                className=" card-body__description p-3 h-100 d-flex flex-column justify-content-end align-items-start"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dxu6gcib2/image/upload/v1620660933/Female%20Rockers/100kSTORY_1_x0byph.jpg')",
                  backgroundSize: "cover",
                }}
              >
                <div style={{ zIndex: 1 }}>
                  <small className="fw-bolder text-light mt-auto">
                    READ MORE
                  </small>
                  <h1 className="fw-bolder accent-red-color-text">About Us</h1>
                </div>
              </div>
            </a>
          </Link>
          {lodashMap(carousel, (rocker) => (
            <div
              key={rocker.stageName.toString()}
              className="slider-card__wrapper"
              onMouseEnter={() =>
                mouseEnterHandle(rocker.coverImage.asset, rocker.stageName)
              }
              onMouseLeave={() => mouseLeaveHandle()}
            >
              {!sliderBgImg && (
                <Image
                  className="profile-img"
                  src={urlFor(rocker.profileImage.asset).url()}
                  alt={`${rocker.stageName}`}
                  layout="fill"
                  objectFit="cover"
                />
              )}

              {renderCardSlider(rocker)}
            </div>
          ))}
        </Carousel>
      </section>
      <style global jsx>{`
        .card-stage-name {
          position: relative;
          background-color: #b03c37;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 4px 7px;
          color: #1b1b1b;
        }

        .card-excerpt {
          position: relative;
          background-color: #1b1b1b;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 3px 6px;
          color: #fff;
        }

        .section-wrapper {
          background-image: linear-gradient(black, black), url(${sliderBgImg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-blend-mode: saturation;
          transition: all 0.8s ease-out;
        }

        .profile-img {
          border: solid 1px #333 !important;
        }

        .slider-card__wrapper {
          border: solid 1px #333 !important;
          height: 50vh;
          cursor: pointer;
        }

        .card-body__wrapper {
          z-index: 1;
          bottom: 0;
          transition: all 0.7s ease-in;
        }

        .slider-card__wrapper:hover .card-body__wrapper {
          bottom: 50px;
          transition: all 0.8s ease-in;
        }

        .card-body__description::after {
          display: flex;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: inline-block;
          background: linear-gradient(
            to top,
            #1b1b1b 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      `}</style>
    </Container>
  );
}
