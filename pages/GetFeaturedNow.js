import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Logo from "@components/svg/Logo";
import Link from "next/link";
import Toast from "react-bootstrap/Toast";
import Badge from "react-bootstrap/Badge";
import GetFeaturedLogo from "../components/svg/GetFeaturedLogo";

export default function GetFeatured() {
  return (
    <Container>
      <Row className="text-center d-flex justify-content-center mt-5">
        <Col xs={12}>
          <Link href="/" className="text-decoration-none">
            {/* <Logo className="logo__svg" /> */}
            <GetFeaturedLogo width="200" />
          </Link>
          <a
            href="https://www.instagram.com/female_rockers/"
            className="text-decoration-none"
          >
            <p
              className="text-light fw-light  mt-2 mb-0"
              style={{ letterSpacing: "2px" }}
            >
              @female_rockers
            </p>
          </a>
          <hr />
          <h4 className="text-light fw-bold w-75  m-auto">
            Get guaranteed feature on Female Rockers as an Instagram Story
          </h4>
        </Col>
        <p className="text-light my-4 w-50">
          In order to get featured – guaranteed – in our Instagram story, here's
          what you need to do:
        </p>
        <Col xs={12}>
          <Toast className="m-auto">
            <Toast.Header
              closeButton={false}
              className="d-flex justify-content-between"
            >
              <Badge pill className="bg-danger">
                1
              </Badge>
              <small>🗳️</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              Vote for Gray Dream on this page:{` `}
              <a
                target="_blank"
                href="https://www.fib-risingstars.com/artists/2025"
                className="link-danger"
              >
                FIB FEST 2023
              </a>
              {` `}
            </Toast.Body>
          </Toast>

          <Toast className="m-auto mt-4">
            <Toast.Header
              closeButton={false}
              className="d-flex justify-content-between"
            >
              <Badge pill className="bg-danger">
                2
              </Badge>
              <small>📩</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              After confirming your email and vote, send the final page's
              screenshot to
              <a
                target="_blank"
                href="https://www.instagram.com/morriemusician/"
                className="link-danger"
              >
                @MorrieMusician
              </a>
              {` `}
              (the founder of Female Rockers)
            </Toast.Body>
          </Toast>

          <Toast className="m-auto mt-4">
            <Toast.Header
              closeButton={false}
              className="d-flex justify-content-between"
            >
              <Badge pill className="bg-danger">
                3
              </Badge>
              <small>🥳</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              You'll be guaranteed a story on Female Rocker's Instagram.
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}
