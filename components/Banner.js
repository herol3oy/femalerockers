import { useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function Banner() {
  const [banner, setBanner] = useState(true);

  return (
    banner && (
      <Container fluid className="banner">
        <Row className="py-2">
          <small className="fw-bold text-light text-center">
            📣 We interview future sensations in rock music -{` `}
            <Link
              href="https://www.instagram.com/female_rockers/"
              className="link-warning"
            >
              instagram
            </Link>
            <Button
              size="sm"
              onClick={() => setBanner(false)}
              type="button"
              className="btn-close bg-light"
              aria-label="Close"
            ></Button>
          </small>
        </Row>
      </Container>
    )
  );
}
