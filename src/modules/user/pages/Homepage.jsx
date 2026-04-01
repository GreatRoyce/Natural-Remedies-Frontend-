import React from "react";
import Hero from "../../../shared/components/sections/Hero";
import HeroTwo from "../../../shared/components/sections/HeroTwo";
import Features from "../../../shared/components/sections/Features";
import WhyAndHow from "../../../shared/components/sections/WhyAndHow";
import Footer from "../../../shared/components/layout/Footer";

const Homepage = () => {
  
  return (
    <div className="bg-tertiarybackground overflow-hidden">
      <Hero />
      <HeroTwo/>
      <Features />
      <WhyAndHow />
      <Footer />
    </div>
  );
};

export default Homepage;
