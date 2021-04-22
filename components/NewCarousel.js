import { useEffect, useState } from "react";
import Container from "@BS/Container";
import Card from "@BS/Card";
import { FaLongArrowAltRight } from "react-icons/fa";
import sanityClient from "@lib/SanityClient";
import imageUrlBuilder from "@sanity/image-url";
import _ from "lodash";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    paritialVisibilityGutter: 20,
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    paritialVisibilityGutter: 30,
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    paritialVisibilityGutter: 35,
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    paritialVisibilityGutter: 20,
    items: 2,
  },
};

export default function NewCarousel() {
  const [carousel, setCarousel] = useState(null);
  const [sliderBgImg, setSliderBgImg] = useState(null);
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
            <h5 className="text-start text-danger fw-bolder m-0">{`${rocker.stageName} ${rocker.country}`}</h5>
            <h3 className="text-start text-light  card-title">
              {rocker.title}
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
          {_.map(carousel, (rocker) => (
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
        .section-wrapper {
          background-image: url(${sliderBgImg});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: all 0.8s ease-out;
        }

        .profile-img {
          border: solid 1px #333 !important;
        }

        .slider-card__wrapper {
          border: solid 1px #333 !important;
          height: 55vh;
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
            #111 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      `}</style>
    </Container>
  );
}
