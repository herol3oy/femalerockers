import Link from "next/link";
import Navbar from "@BS/Navbar";
import Container from "@BS/Container";
import LogoSvg from "@components/LogoSvg";
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
        <div className="text-center text-lg-start text-md-center text-md-start mt-2 mt-lg-0">
          <Link href="/">
            <a
              className="
                site__title
                h5
                fw-bolder
                text-decoration-none
                text-uppercase
                mt-3
                "
            >
              Female Rockers
            </a>
          </Link>
          <p className="small fw-lighter text-light">
            interviews future sensations in rock music
          </p>
        </div>
        <Link href="/">
          <a className="logo__svg">
            <LogoSvg />
          </a>
        </Link>
      </Navbar>
    </Container>
  );
}
