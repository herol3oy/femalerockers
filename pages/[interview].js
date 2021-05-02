import { useRef, useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import _ from "lodash";
import sanityClient from "@lib/SanityClient";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Container from "@BS/Container";
import Row from "@BS/Row";
import Badge from "@BS/Badge";
// import Alert from "@BS/Alert";
import { FaYoutube } from "@ICONS/fa";
import { FaSpotify } from "@ICONS/fa";
import { FaInstagram } from "@ICONS/fa";
import { FaLink } from "@ICONS/fa";
import { FaTwitter } from "@ICONS/fa";
import { FaFacebookF } from "@ICONS/fa";
import { getInterviewContent } from "@lib/SanityApi";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import NewsLetter from "@components/NewsLetter";
import CustomHead from "@components/CustomHead";
// import useSWR from "swr";
// import groq from "groq";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";

export default function interview({ data }) {
  const [info, infoSet] = useState({
    0: {
      title: null,
      excerpt: "",
      stageName: "",
      slug: {},
      country: "",
      profession: [],
      profileImage: { asset: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg" },
      coverImage: { asset: "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg" },
      instagram: "",
      spotify: "",
      facebook: "",
      twitter: "",
      youtube: "",
      website: "",
      date: "",
      body: [],
    },
  });

  useEffect(() => {
    infoSet(data);
  }, [data]);

  const onCLickToTop = () => window.scrollTo({ top: 0 });

  const {
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
  } = info[0];

  const ref = useRef(null);

  const urlFor = (source) => imageUrlBuilder(sanityClient).image(source);

  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [350, 0], [0, 1]);
  const opacity = useSpring(yRange, { stiffness: 400, damping: 40 });

  // const { data, error } = useSWR(
  //   groq`*[_type == "interview"]{
  //     title,
  //     excerpt,
  //     slug,
  //     profileImage,
  // }`,
  //   (query) => sanityClient.fetch(query)
  // );
  // if (error) return <div>Failed</div>;
  // if (!data) return <div>Loading...</div>;
  // const randomInterview = data[_.random(data?.length - 1)];

  const BlockRenderer = (props) => {
    const { marks, text } = props.node.children[0];
    if (props.node.style === "blockquote")
      return <blockquote>{text}</blockquote>;
    if (marks[0] === "strong") {
      return (
        <div>
          <dt>
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="Female Rockers Logo"
            />
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
          <dt className="fw-bold">
            {stageName.split(" ").shift().toUpperCase()}
          </dt>
          <dd className="h5 lh-base fw-thin">{props.node.children[0].text}</dd>
        </div>
      );
    }
    return null;
  };

  const youtubeRenderer = ({ node }) => {
    if (node) {
      const { url } = node;
      const id = getYouTubeID(url);
      return <YouTube videoId={id} />;
    }
    return null;
  };

  if (!data) return <div>Loading...</div>;

  return (
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
      <motion.div
        ref={ref}
        style={{ opacity }}
        className="d-flex justify-content-center "
      >
        <section className="interview__profile--box d-flex justify-content-start justify-content-lg-center bg-dark">
          <Image
            src={urlFor(profileImage?.asset).url()}
            width={160}
            height={240}
            alt={stageName}
          />
          <div className="align-self-end p-2">
            {profession.map((profession, i) => {
              return (
                <Badge
                  key={i}
                  className="badge rounded-pill bg-danger"
                  pill
                  variant="danger"
                >
                  {profession}
                </Badge>
              );
            })}
            <h1 className="text-danger fw-bold">{`${stageName} ${country}`}</h1>
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
            <h2 className="interview__title display-5 fw-bolder">{title}</h2>
            <p className="h3 lh-base text-light">{excerpt}</p>
            <hr className="my-5 text-light" />
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
            {/* <div className="d-flex justify-content-center align-items-center">
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
            </Link> */}
            <NewsLetter />
          </section>
        </Row>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const data = await getInterviewContent(params.interview);
  return {
    props: {
      data,
    },
  };
}
