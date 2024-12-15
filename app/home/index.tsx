/* index.tsx*/
import React from "react";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

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

export async function getStaticProps() {
  return {
    props: {
    },
  };
}