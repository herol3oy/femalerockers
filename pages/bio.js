import Container from "@BS/Container";
import Row from "@BS/Row";
import Button from "@BS/Button";
import Image from "@BS/Image";
import Col from "@BS/Col";
import _ from "lodash";
import { getBioLinks } from "@lib/SanityApi";

export default function bio({ links }) {
  return (
    <Container className="min-vh-100">
      <Row className=" text-center d-flex justify-content-center">
        <Col xs={12}>
          <Image
            src="/femalerocker-profile.jpg"
            className="border"
            width={100}
            roundedCircle
          />
          <p
            className="text-light fw-light mb-4 mt-2"
            style={{ letterSpacing: "2px" }}
          >
            @femalerockers_
          </p>
        </Col>
        <Col xs={12} md={8}>
          {_.map(links, (link, i) => (
            <a key={i} href={link.url} target="_blank">
              <Button variant="danger" className="mb-3 p-4 w-100 fw-bold">
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
      <style global jsx>{`
        body {
          // background: peru;
        }
      `}</style>
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
