import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import Toast from "react-bootstrap/Toast";
import Badge from "react-bootstrap/Badge";
import Image from "next/legacy/image";

const TOASTS = [
  {
    badge: "1",
    icon: "🗳️",
    body: (
      <h5 className="lh-base">
        Vote for Gray Dream on this page:{" "}
        <a
          target="_blank"
          href="https://www.fib-risingstars.com/artists/2025"
          className="link-danger"
        >
          FIB FEST 2023
        </a>{" "}
      </h5>
    ),
  },
  {
    badge: "2",
    icon: "📩",
    body: (
      <h5 className="lh-base">
        After confirming your email and vote, send the final page's screenshot
        to{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/morriemusician/"
          className="link-danger"
        >
          @MorrieMusician
        </a>{" "}
        (the founder of Female Rockers)
      </h5>
    ),
  },
  {
    badge: "3",
    icon: "🥳",
    body: (
      <h5 className="lh-base">
        Add{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/p/Cpr5XCkssW9/"
          className="link-danger"
        >
          this post
        </a>{" "}
        to your story
      </h5>
    ),
  },
];

export default function GetFeatured() {
  return (
    <Container>
      <Row className="text-center d-flex justify-content-center mt-5">
        <Col xs={12}>
          <Link href="/" className="text-decoration-none">
            <Image
              style={{ filter: "none" }}
              src="/female-rockers-logo.svg"
              alt="Female rockers logo"
              layout="fixed"
              width={75}
              height={75}
            />
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
          <h5 className="text-light lh-base fw-bold w-75  m-auto">
            Get guaranteed feature on Female Rockers as an Instagram Story
          </h5>
        </Col>
        <p className="text-light my-4 w-50">
          In order to get featured – guaranteed – in our Instagram story, here's
          what you need to do:
        </p>
        <Col xs={12} className="mb-5">
          {TOASTS.map((toast) => (
            <Toast key={toast.badge} className="m-auto mt-4">
              <Toast.Header
                closeButton={false}
                className="d-flex justify-content-between"
              >
                <Badge pill className="bg-danger">
                  {toast.badge}
                </Badge>
                <small>{toast.icon}</small>
              </Toast.Header>
              <Toast.Body className="bg-dark text-light text-start">
                {toast.body}
              </Toast.Body>
            </Toast>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
