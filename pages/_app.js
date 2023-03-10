import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "@components/Footer";
import Banner from "@components/Banner";
import CookiesConsent from "@components/CookiesConsent";
import "@styles/main.scss";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsLetterPopup = dynamic(() => import("@components/NewsLetterPopup"));

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isBioPage = router.route === "/bio";
  const isShredCollabPage = router.route === "/ShredCollab";
  const isFeature = router.route === "/GetFeaturedNow";
  const homePage = router.route === "/";

  return (
    <>
      {!isBioPage && !isShredCollabPage && !isFeature && <Banner />}
      {!isBioPage && !isShredCollabPage && !isFeature && <Navbar />}
      <Component {...pageProps} />
      {!isBioPage && !isShredCollabPage && !isFeature && <Footer />}
      {!isBioPage && !isShredCollabPage && !isFeature && !homePage && (
        <NewsLetterPopup />
      )}
      {!isBioPage && !isShredCollabPage && !isFeature && <CookiesConsent />}
    </>
  );
}
