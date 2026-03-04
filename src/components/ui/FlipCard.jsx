import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import Accordion from "./Accordion";
import Marquee from "react-fast-marquee";

const FlipCard = ({
  title,
  category,
  image,
  contributor,
  duration,
  preparation,
  ingredients,
  usage,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-auto h-96 perspective ">
      <div></div>
      <Motion.div
        className="relative w-full  h-full preserve-3d  "
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-primary/95  text-white rounded-xl shadow-md companyname backface-hidden p-4 flex flex-col justify-between">
          <div>
            {/* Header: title and category */}
            <div className="flex justify-between items-start gap-2 mb-4">
              <h3 className="text-sm font-semibold break-words flex-1">
                {title}
              </h3>
              <span className="text-sm opacity-70 whitespace-nowrap">
                {category}
              </span>
            </div>

            {/* Image */}
            <img
              src={image}
              alt={title}
              className="h-56 w-full object-cover rounded-md mb-3"
            />

            {/* Footer: contributor and duration */}
            <div className="flex justify-between items-center text-xs opacity-70">
              <span>By {contributor}</span>
              <span>Duration: {duration}</span>
            </div>
          </div>
          <button
            onClick={() => setFlipped(true)}
            className="px-4 py-2 bg-white text-primary font-semibold rounded-md"
          >
            See More
          </button>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-tertiarybackground text-primary rounded-xl shadow-lg backface-hidden p-4 overflow-y-auto"
          style={{ transform: "rotateY(180deg)" }}
        >
          <Accordion title="Ingredients" content={ingredients} />
          <Accordion title="Preparation" content={preparation} />
          <Accordion title="Usage" content={usage} />

          <button
            onClick={() => setFlipped(false)}
            className="mt-4  px-4 py-2 bg-primary text-white font-semibold rounded-md"
          >
            Back
          </button>
        </div>
      </Motion.div>
    </div>
  );
};

export default FlipCard;
