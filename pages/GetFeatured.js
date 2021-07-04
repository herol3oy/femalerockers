import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Logo from "@components/svg/Logo";
import Link from "next/link";
import Toast from "react-bootstrap/Toast";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

export default function GetFeatured() {
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
            className="text-light fw-light  mt-2 mb-0"
            style={{ letterSpacing: "2px" }}
          >
            Get Featured
          </p>
          <a
            href="https://www.instagram.com/female_rockers/"
            className="link-danger "
          >
            @female_rockers
          </a>
          <hr />
          <h4 className="text-light fw-bold w-75  m-auto">
            In order to get a guaranteed feature, here's what you need to do:
          </h4>
        </Col>
        <Col xs={12}>
          <Toast className="m-auto mt-4">
            <Toast.Header
              closeButton={false}
              className="d-flex justify-content-between"
            >
              <Badge pill className="bg-danger">
                1
              </Badge>
              <small>follow</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              Follow{` `}
              <a
                href="https://www.instagram.com/morriemusician/"
                className="link-danger"
              >
                @morriemusician
              </a>
              {` `}
              <Badge className="bg-success">Admin</Badge>
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
              <small>story</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              Add one of his posts to your story and mention {` `}
              <a
                href="https://www.instagram.com/morriemusician/"
                className="link-danger"
              >
                @morriemusician
              </a>
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
              <small>DM</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              DM the post that you'd like to be featured on female rockers to
              {` `}
              <a
                href="https://www.instagram.com/morriemusician/"
                className="link-danger"
              >
                @morriemusician
              </a>
              . Do not DM female rockers, the amount of messages received is
              huge there.
            </Toast.Body>
          </Toast>

          <Toast className="m-auto mt-4 mb-4">
            <Toast.Header
              closeButton={false}
              className="d-flex justify-content-between"
            >
              <Badge pill className="bg-danger">
                4
              </Badge>
              <small>done</small>
            </Toast.Header>
            <Toast.Body className="bg-dark text-light">
              A story is guaranteed on{` `}
              <a
                href="https://www.instagram.com/female_rockers/"
                className="link-danger"
              >
                @female_rockers
              </a>
            </Toast.Body>
          </Toast>
          <small className="text-danger">
            Thanks for your interest in this community 🙏🤘
          </small>
        </Col>
      </Row>
    </Container>
  );
}
