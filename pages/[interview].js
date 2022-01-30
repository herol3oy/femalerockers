import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import random from "lodash/random";
import sanityClient from "@lib/SanityClient";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { FaYoutube } from "/node_modules/react-icons/fa";
import { FaSpotify } from "/node_modules/react-icons/fa";
import { FaInstagram } from "/node_modules/react-icons/fa";
import { FaLink } from "/node_modules/react-icons/fa";
import { FaTwitter } from "/node_modules/react-icons/fa";
import { FaFacebookF } from "/node_modules/react-icons/fa";
import { getInterviewContent } from "@lib/SanityApi";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import NewsLetter from "@components/NewsLetter";
import CustomHead from "@components/CustomHead";
import useSWR from "swr";
import groq from "groq";

export default function interview({
  title,
  excerpt,
  stageName,
  slug,
  country,
  profession,
  profileImage,
  coverImage,
  instagram,
  spotify,
  facebook,
  twitter,
  youtube,
  website,
  date,
  body,
}) {
  const ref = useRef(null);

  const onCLickToTop = () => window.scrollTo({ top: 0 });

  const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);

  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [350, 0], [0, 1]);
  const opacity = useSpring(yRange, { stiffness: 400, damping: 40 });

  const { data, error } = useSWR(
    groq`*[_type == "interview"]{
      title,
      excerpt,
      slug,
      profileImage, 
  }`,
    (query) => sanityClient.fetch(query)
  );

  if (error) return <div>Failed</div>;
  if (!data) return <div>Loading...</div>;

  const randomInterview = data[random(data?.length - 1)];

  const BlockRenderer = (props) => {
    const { marks, text } = props.node.children[0];
    if (props.node.style === "blockquote")
      return <blockquote>{text}</blockquote>;
    if (marks[0] === "strong") {
      return (
        <div>
          <dt className="d-flex flex-column align-items-end">
            <Image
              src="/favicon.svg"
              width={32}
              height={32}
              alt="Female Rockers Logo"
            />
            <div className="stage-name mt-4">
              {stageName.split(" ").shift().toUpperCase()}
            </div>
          </dt>
          <dd className="h5 fw-bold">{text}</dd>
        </div>
      );
    }
    if (
      props.node.children[0].marks[0] !== "strong" &&
      props.node.children[0].text !== stageName.split(" ").shift().toUpperCase()
    ) {
      return (
        <div className="my-4">
          {/* <dt className="fw-bold"> */}
          {/* {stageName.split(" ").shift().toUpperCase()} */}
          {/* </dt> */}
          <dd className="h5 lh-base fw-thin">{props.node.children[0].text}</dd>
        </div>
      );
    }
    return null;
  };

  const youtubeRenderer = ({ node }) => {
    const { url } = node;
    const id = getYouTubeID(url);
    return <YouTube videoId={id} />;
  };

  if (!body) return <div>Loading...</div>;

  return (
    <>
      {coverImage && (
        <>
          <CustomHead
            slug={slug}
            stageName={stageName}
            coverImage={urlFor(coverImage?.asset).url()}
          />
          <section className="interview__coverimg">
            <Image
              src={urlFor(coverImage?.asset).url()}
              alt={stageName}
              layout="fill"
              objectFit="cover"
              className="cover__img"
            />
          </section>
        </>
      )}
      <motion.div
        ref={ref}
        style={{ opacity }}
        className="d-flex justify-content-center "
      >
        <section className="interview__profile--box d-flex justify-content-start justify-content-lg-center bg-dark">
          {profileImage && (
            <Image
              src={urlFor(profileImage?.asset).url()}
              width={160}
              height={240}
              alt={stageName}
            />
          )}
          <div className="align-self-end p-2">
            {(profession || []).map((profession, index) => {
              return (
                <Badge
                  key={index.toString()}
                  className="accent-red-color rounded-pill"
                  pill
                  variant=""
                >
                  {profession}
                </Badge>
              );
            })}
            <h1 className="accent-red-color-text fw-bold">{`${stageName} ${country}`}</h1>
            <p className="text-light small">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
            {youtube && (
              <a rel="noreferrer" href={youtube} target="_blank">
                <FaYoutube className="h4 mx-1 text-light" />
              </a>
            )}
            {spotify && (
              <a rel="noreferrer" href={spotify} target="_blank">
                <FaSpotify className="h4 mx-1 text-light" />
              </a>
            )}
            {instagram && (
              <a rel="noreferrer" href={instagram} target="_blank">
                <FaInstagram className="h4 mx-1 text-light" />
              </a>
            )}
            {website && (
              <a rel="noreferrer" href={website} target="_blank">
                <FaLink className="h4 mx-1 text-light" />
              </a>
            )}
            {twitter && (
              <a rel="noreferrer" href={twitter} target="_blank">
                <FaTwitter className="h4 mx-1 text-light" />
              </a>
            )}
            {facebook && (
              <a rel="noreferrer" href={facebook} target="_blank">
                <FaFacebookF className="h4 mx-1 text-light" />
              </a>
            )}
          </div>
        </section>
      </motion.div>

      <Container>
        <Row className="justify-content-center">
          <section className="col-12 col-lg-7 col-md-10">
            <h2 className="accent-red-color-text display-5 fw-bolder">
              {title}
            </h2>
            <p className="h3 lh-base text-light">{excerpt}</p>
            <hr className="my-5 text-light" />
            {body && (
              <BlockContent
                className="text-light"
                blocks={body}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                serializers={{
                  types: {
                    block: BlockRenderer,
                    youtube: youtubeRenderer,
                  },
                }}
              />
            )}
            <div className="d-flex justify-content-center align-items-center">
              <Badge
                style={{ marginBottom: "-10px", zIndex: "1" }}
                className="bg-danger"
                variant="danger"
              >
                READ MORE
              </Badge>
            </div>
            <Link href={randomInterview.slug.current}>
              <a className="text-decoration-none" onClick={onCLickToTop}>
                <Alert
                  variant="transparent"
                  className="row p-2 mx-1 border border-danger text-light"
                >
                  <div className="col-4 col-lg-2">
                    <Image
                      src={urlFor(randomInterview.profileImage.asset).url()}
                      width={100}
                      height={100}
                      layout="fixed"
                      objectFit="cover"
                      quality={100}
                      alt={randomInterview.stageName}
                    />
                  </div>
                  <div className="col-8 col-lg-10">
                    <Alert.Heading>{randomInterview.title}</Alert.Heading>
                    <p className="">{randomInterview.excerpt.slice(0, 80)}</p>
                  </div>
                </Alert>
              </a>
            </Link>
            <NewsLetter />
          </section>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let data = await getInterviewContent(params.interview);
  return {
    props: {
      ...data[0],
    },
  };
}
