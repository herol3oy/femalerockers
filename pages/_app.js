// import { useEffect } from "react";
import { useRouter } from "next/router";
// import * as gtag from "../lib/gtag";
import Navbar from "../components/Navbar";
import Footer from "@components/Footer";
import Banner from "@components/Banner";
import CookiesConsent from "@components/CookiesConsent";
import "@styles/main.scss";
import dynamic from "next/dynamic";

const NewsLetterPopup = dynamic(() => import("@components/NewsLetterPopup"));

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isBioPage = router.route === "/bio";
  const isShredCollabPage = router.route === "/ShredCollab";
  const isFeature = router.route === "/GetFeaturedNow";

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      {!isBioPage && !isShredCollabPage && !isFeature && <Banner />}
      {!isBioPage && !isShredCollabPage && !isFeature && <Navbar />}
      <Component {...pageProps} />
      {!isBioPage && !isShredCollabPage && !isFeature && <Footer />}
      {!isBioPage && !isShredCollabPage && !isFeature && <NewsLetterPopup />}
      {!isBioPage && !isShredCollabPage && !isFeature && <CookiesConsent />}
    </>
  );
}
