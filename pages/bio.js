import { getBioLinks } from "@lib/SanityApi";
import random from "lodash/random";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Head from "next/head";
import Image from "next/legacy/image";

const EMOJIS = ["🎸", "🎤", "👩‍🎤", "🥁", "🔥", "🤘", "💯"];

export default function bio({ links }) {
  const { urls } = links[0];
  return (
    <Container>
      <Head>
        <title>Female Rockers of the World | Index</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row className="text-center d-flex justify-content-center mt-5">
        <Col xs={12}>
          <Link href="/" legacyBehavior>
            <a className="text-decoration-none">
              <Image
                className="logo__svg"
                style={{ filter: "none" }}
                src="/female-rockers-logo.svg"
                alt="Female rockers logo"
                layout="fixed"
                width={90}
                height={170}
              />
            </a>
          </Link>
          <p
            className="text-light fw-light mb-4 mt-2"
            style={{ letterSpacing: "2px" }}
          >
            @female_rockers
          </p>
        </Col>
        <Col xs={12} md={8}>
          {urls.slice(0, 1).map((link) => (
            <a key={link.url} href={link.url} target="_blank">
              <Button
                variant="outline-danger"
                className="gradient-btn mb-3 p-4 w-100 fw-bold"
              >
                <div className="d-flex">
                  <div className="h4 m-0">{link.title.slice(0, 2)}</div>
                  <div className="h4 m-0 m-auto">{link.title.slice(2)}</div>
                </div>
              </Button>
            </a>
          ))}

          {urls.slice(1).map((link) => (
            <a key={link.url} href={link.url} target="_blank">
              <Button
                variant="outline-danger"
                className="mb-3 p-4 w-100 fw-bold"
              >
                <div className="d-flex">
                  <div className="h4 m-0">{link.title.slice(0, 2)}</div>
                  <div className="h4 m-0 m-auto">{link.title.slice(2)}</div>
                </div>
              </Button>
            </a>
          ))}
        </Col>
      </Row>

      <article>
        {EMOJIS.map((skill) => (
          <h5
            key={skill.toString()}
            className={`display-${random(1, EMOJIS.length - 1)}`}
          >
            {skill}
          </h5>
        ))}

        <style global jsx>{`
          article {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
          }

          article h5 {
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            animation: animate 25s linear infinite;
            bottom: -150px;
          }

          article h5:nth-child(1) {
            left: 25%;
            width: 80px;
            height: 80px;
            animation-delay: 0s;
          }

          article h5:nth-child(2) {
            left: 10%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 12s;
          }

          article h5:nth-child(3) {
            left: 70%;
            width: 20px;
            height: 20px;
            animation-delay: 4s;
          }

          article h5:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;
            animation-delay: 0s;
            animation-duration: 18s;
          }

          article h5:nth-child(5) {
            left: 65%;
            width: 20px;
            height: 20px;
            animation-delay: 0s;
          }

          article h5:nth-child(6) {
            left: 75%;
            width: 110px;
            height: 110px;
            animation-delay: 3s;
          }

          article h5:nth-child(7) {
            left: 35%;
            width: 150px;
            height: 150px;
            animation-delay: 7s;
          }

          article h5:nth-child(8) {
            left: 50%;
            width: 25px;
            height: 25px;
            animation-delay: 15s;
            animation-duration: 45s;
          }

          article h5:nth-child(9) {
            left: 20%;
            width: 15px;
            height: 15px;
            animation-delay: 2s;
            animation-duration: 35s;
          }

          article h5:nth-child(10) {
            left: 85%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 11s;
          }

          .gradient-btn {
            background: linear-gradient(
              105deg,
              /* Base gradient stops */ #f6d365,
              #e81d1d,
              #e8b71d,
              /* Repeat your base gradient stops */ #f6d365,
              #e81d1d,
              #e8b71d,
              /* Repeat your first gradient stop */ #f6d365
            );

            background-size: 200% 200%;
            animation: rainbow 5s linear infinite;
            border: 0;
            padding: 25px;
            font-size: 40px;
            color: #fff;
          }

          @keyframes rainbow {
            0% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          @keyframes animate {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
              border-radius: 0;
            }

            100% {
              transform: translateY(-1000px) rotate(720deg);
              opacity: 0;
              border-radius: 50%;
            }
          }
        `}</style>
      </article>
    </Container>
  );
}

export async function getServerSideProps() {
  const data = await getBioLinks();
  return {
    props: {
      links: data,
    },
  };
}
