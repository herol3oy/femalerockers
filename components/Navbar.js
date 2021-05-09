import Link from "next/link";
import Navbar from "@BS/Navbar";
import Container from "@BS/Container";
import TypeFace from "@components/svg/TypeFace";

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
        <Link href="/">
          <a className="m-auto mt-2">
            <TypeFace style={{ width: "150px" }} />
          </a>
        </Link>
      </Navbar>
    </Container>
  );
}
