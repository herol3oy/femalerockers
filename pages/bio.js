import Button from "@BS/Button";
import Col from "@BS/Col";
import Container from "@BS/Container";
import Row from "@BS/Row";
import Logo from "@components/svg/Logo";
import { getBioLinks } from "@lib/SanityApi";
import lodashMap from "lodash/map";
import random from "lodash/random";
import Link from "next/link";

const EMOJIS = ["🎸", "🎤", "👩‍🎤", "🥁", "🔥", "🤘", "💯"];

export default function bio({ links }) {
  return (
    <Container>
      <Row className="text-center d-flex justify-content-center mt-5">
        <Col xs={12}>
          <Link href="/">
            <a className="text-decoration-none">
              <Logo className="logo__svg" />
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
          {lodashMap(links, (link) => (
            <a key={link.toString()} href={link.url} target="_blank">
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
