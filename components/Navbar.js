import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/legacy/image";

export default function navbar() {
  return (
    <Container fluid>
      <Navbar
        className="
        container
        d-flex
        flex-column-reverse
        flex-lg-row
        justify-content-md-between
        justify-content-center 
        align-items-center
        my-3"
        expand="lg"
      >
        <Link href="/" className="m-auto d-flex gap-2">
          <Image
            className="logo__svg"
            style={{ filter: "none" }}
            src="/female-rockers-logo.svg"
            alt="Female rockers logo"
            layout="fixed"
            width={90}
            height={170}
          />
          <Image
            src="/female-rockers-text-svg.svg"
            alt="Female rockers logo"
            layout="fixed"
            width={90}
            height={170}
          />
        </Link>
      </Navbar>
    </Container>
  );
}
