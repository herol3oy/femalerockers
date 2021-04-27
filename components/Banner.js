import { useState } from "react";
import Link from "next/link";
import Container from "@BS/Container";
import Row from "@BS/Row";
import Button from "@BS/Button";

export default function Banner() {
  const [banner, setBanner] = useState(true);

  return (
    banner && (
      <Container fluid className="banner">
        <Row className="py-2">
          <small className="fw-bold text-light text-center">
            📣 Try your chance of being interviewed by tagging us on {` `}
            <Link href="https://www.instagram.com/female_rockers/">
              <a className="link-danger">instagram</a>
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
