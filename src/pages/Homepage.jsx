import React from "react";
import Hero from "./sections/Hero";
import HeroTwo from "./sections/HeroTwo";
import Features from "./sections/Features";
import WhyAndHow from "./sections/WhyAndHow";
import Footer from "../layout/Footer";

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
