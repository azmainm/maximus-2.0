/* index.tsx*/
import React from "react";
import Hero from "./Hero";
import FeatureCards from "./FeatureCards";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <FeatureCards />
      <Footer />
    </div>
  );
};

export default LandingPage;
