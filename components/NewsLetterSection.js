import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function NewsLetterSection() {
  return (
    <Container fluid="sm">
      <Row className="flex-xs-column align-items-center my-5 text-center text-md-start text-lg-start">
        <Col>
          <h1>
            <span className="newsletter-title text-white fw-bolder">
              Unleashing the Next Generation of Rock Stars
            </span>
          </h1>
          <p className="text-white fw-light fs-3">
            Subscribe to our exclusive newsletter and be the first to discover
            the rising stars of rock
          </p>
          <Button
            href="https://www.instagram.com/female_rockers/"
            target="_blank"
            variant="outline-danger"
            size="lg"
          >
            Instagram — +200K 👩‍🎤
          </Button>
        </Col>
        <Col xs lg="5">
          <form
            method="post"
            action="https://femalerockers.us19.list-manage.com/subscribe/post?u=a1033c7d8b2c72e78fd17743a&id=fee35bc5cb"
            className="glow-effect w-100 validate user"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            noValidate
          >
            <div
              className="d-flex flex-column  justify-content-between"
              id="mc_embed_signup_scroll"
            >
              <div className="mc-field-group w-100">
                <input
                  type="email"
                  name="EMAIL"
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="your@email.com"
                  className="d-flex position-relative form-control-lg align-items-stretch rounded-0 border border-danger border border-1 shadow flex-fill w-100 required email"
                  id="mce-EMAIL"
                  required
                />
              </div>
              <div id="mce-responses">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                />
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                />
              </div>
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_a1033c7d8b2c72e78fd17743a_fee35bc5cb"
                  tabIndex={-1}
                  defaultValue
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe — it's free!"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="d-flex position-relative rounded-0 justify-content-center w-100 mt-1 button btn btn-lg btn-danger"
                />
              </div>
            </div>
          </form>
        </Col>
      </Row>
      <style jsx global>{`
        .newsletter-title {
          position: relative;
          background-color: #b03c37;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 4px 7px;
          color: #1b1b1b;
          max-width: max-content;
        }

        .newsletter-sub-title {
          position: relative;
          background-color: white;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 4px 7px;
          color: black;
          max-width: max-content;
        }
      `}</style>
    </Container>
  );
}
