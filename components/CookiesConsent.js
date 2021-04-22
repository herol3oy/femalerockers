import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookiesConsent() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I agree 😉"
      style={{
        background: "#2f2f2f",
        color: "#fff",
        justifyContent: "center",
        margin: "auto",
        lineHeight: "initial !important",
      }}
      buttonStyle={{
        color: "#fff",
        backgroundColor: "#dc3545",
        fontSize: "13px",
        marginTop: "15px",
        padding: ".6rem",
        height: "40px",
        borderRadius: ".25rem",
        fontWeight: "bolder  ",
      }}
      contentStyle={{
        flex: "none",
        width: "fit-content",
        textAlign: "center",
      }}
      expires={150}
    >
      <small className="fw-light">
        We use cookies to give you the best experience possible. Continue
        browsing or review our {` `}
        <Link href="/privacypolicy">
          <a>
            <u className="text-light">privacy policy</u>
          </a>
        </Link>{" "}
        and{" "}
        <Link className="text-light" href="/terms">
          <a>
            <u className="text-light">terms</u>
          </a>
        </Link>
        {` `} to learn more.
      </small>
    </CookieConsent>
  );
}
