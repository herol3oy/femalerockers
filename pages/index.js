import { useEffect } from "react";
import Carousel from "@components/Carousel";
import Musicians from "@components/Musicians";
import RandomQuote from "@components/RandomQuote";
import CustomHead from "@components/CustomHead";
import ShredBanner from "components/ShredBanner";

export default function Home() {
  useEffect(() => window.scrollTo({ top: 0 }), []);

  return (
    <>
      <CustomHead />
      <Carousel />
      <ShredBanner />
      <Musicians />
      <RandomQuote />
    </>
  );
}
