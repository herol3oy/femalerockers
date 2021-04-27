import Link from "next/link";
import Container from "@BS/Container";
import Row from "@BS/Row";
import Button from "@BS/Button";
import Image from "@BS/Image";
import Col from "@BS/Col";
import _ from "lodash";
import { getBioLinks } from "@lib/SanityApi";

const SKILLS = ["🎸", "🎤", "👩‍🎤", "🥁", "🔥", "🤘"];

export default function bio({ links }) {
  return (
    <Container>
      <Row className="text-center d-flex justify-content-center">
        <Col xs={12}>
          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <Image
                src="/femalerocker-profile.jpg"
                className="border mt-5"
                width={100}
                roundedCircle
              />
              <p
                className="text-light fw-light mb-4 mt-2"
                style={{ letterSpacing: "2px" }}
              >
                @female_rockers
              </p>
            </a>
          </Link>
        </Col>
        <Col xs={12} md={8}>
          {_.map(links, (link, i) => (
            <a key={i} href={link.url} target="_blank">
              <Button
                variant="outline-danger"
                className="mb-3 p-4 w-100 fw-bold"
              >
                <div className="h4 m-0">{link.title}</div>
              </Button>
            </a>
          ))}
          <Image
            src="/logo.png"
            className="my-5"
            width={25}
            style={{ filter: "grayscale(0)" }}
          />
        </Col>
      </Row>

      <article>
        {SKILLS.map((skill, i) => (
          <h5 key={i} className={`display-${_.random(1, SKILLS.length - 1)}`}>
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
