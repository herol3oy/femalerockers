import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "emailjs-com";

export default function ContactForm(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_odvevsb",
        "template_eoz7shs",
        e.target,
        "user_riyH9rMGJtb7M7y5OKfTx"
      )
      .then(
        (result) => {
          console.log(result.text);
          setEmailSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark">
        <Modal.Title className="fw-bold text-light">CONTACT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!emailSent ? (
          <>
            <p>
              Please contact us via{" "}
              <strong>femalerockerscontact@gmail.com</strong> or using the form
              below.
            </p>
            <Form onSubmit={sendEmail}>
              <Form.Group controlId="forFullname">
                <Form.Label className="fw-bold text-dark">Full name</Form.Label>
                <Form.Control
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  name="fullname"
                  type="text"
                  placeholder="Full name"
                />
              </Form.Group>
              <Form.Group className="my-2" controlId="forEmail">
                <Form.Label className="fw-bold text-dark">
                  Email address
                </Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="forTextarea">
                <Form.Label className="fw-bold text-dark">Message</Form.Label>
                <Form.Control
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                  name="message"
                  as="textarea"
                  rows={3}
                  placeholder="Message"
                />
              </Form.Group>
              <Button className="mt-2 fw-bold" variant="success" type="submit">
                Send
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h5 className="text-success fw-bold text-uppercase">
              We received your message!
            </h5>
            <p>
              A member of our team will respond to your inquiry as soon as
              possible. Thanks for contacting <strong>Female Rockers!</strong>
            </p>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
