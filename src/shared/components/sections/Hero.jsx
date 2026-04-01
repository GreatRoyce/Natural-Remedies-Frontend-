import React from "react";
import { motion as Motion } from "framer-motion";
import Bottle from "../../../assets/bottle.png";
import Navbar from "../layout/Navbar";
import CompBtn from "../ui/CompBtn";


function Hero() {
  return (
    <main className="m-1 rounded-t-lg max-h-[80vh] pt-16 shadow-md bg-gradient-to-t from-primary from-[50%] to-tertiary">
      <Navbar />

      <Motion.section
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          duration: 2,
          delay: 1,
        }}
        className="max-w-3xl mx-auto px-8 md:pl-20 flex items-center "
      >
        {/* Left Content */}
        <div className="flex flex-col gap-1 sm:gap-4 ">
          <h1 className="companyname text-4xl sm:text-5xl md:text-6xl font-bold text-accent leading-tight">
            Natural Remedies
          </h1>

          <p className="text-sm sm:text-lg text-white max-w-xl">
            Discover natural remedies explained clearly and created by trusted
            herbalists.
          </p>

          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 3,
              delay: 1.5,
            }}
            className="flex gap-4 mt-4 flex-wrap mb-4"
          >
            <CompBtn variant="primary">Explore Remedies</CompBtn>
            <CompBtn variant="secondary">Join as Herbalist</CompBtn>
          </Motion.div>
        </div>

        {/* Right Image: Only visible on md screens and up */}
        <div className="hidden md:flex justify-center md:justify-end overflow-hidden">
          <Motion.img
            initial={{ scale: 0.2, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              duration: 4,
              delay: 2,
            }}
            src={Bottle}
            alt="Natural Remedy Bottle"
            className="bottle w-60 md:w-72 lg:w-80 object-contain drop-shadow-xl"
          />
        </div>
      </Motion.section>
    </main>
  );
}

export default Hero;
