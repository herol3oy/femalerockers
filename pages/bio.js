import Link from "next/link";
import Container from "@BS/Container";
import Row from "@BS/Row";
import Button from "@BS/Button";
import Image from "@BS/Image";
import Col from "@BS/Col";
import _ from "lodash";

const LINKS = {
  Interviews: "/",
  "Joe Bonamassa Live 1 April": "https://joeb.me/FemaleRockers",
  YouTube: "https://www.youtube.com/channel/UCICZhgoW5PCMlAsVarDU1Tw",
  Twitter: "https://twitter.com/femalerockers_",
  "About Female Rockers": "https://femalerockers.com/page/about",
  Instagram: "https://www.instagram.com/femalerockers_/",
};

export default function bio() {
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
          <p className="text-light fw-bold mb-4 mt-2">@femalerockers_</p>
        </Col>
        <Col xs={12} md={8}>
          {_.map(LINKS, (link, i) => (
            <a key={link} href={link} target="_blank">
              <Button variant="danger" className="mb-3 p-4 w-100 fw-bold">
                <div className="h4 m-0">{i}</div>
              </Button>
            </a>
          ))}
          <Image
            src="/logo.png"
            className="mt-5"
            width={25}
            style={{ filter: "grayscale(0)" }}
          />
        </Col>
      </Row>
    </Container>
  );
}
