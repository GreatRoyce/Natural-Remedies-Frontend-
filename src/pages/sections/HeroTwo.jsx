import React from "react";
import Reveal from "../../components/ui/Reveal";

const HeroTwo = () => {
  return (
    <div className="w-full py-6  bg-accent flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left Panel */}
      <Reveal direction="left" containerClass="w-full md:w-2/5">
        <div className="text-start text-sm ">
          <p className="px-6 md:pl-16 py-4 bg-primary/90 backdrop-blur-md border border-white/30 rounded-r-full shadow-lg">
            Find remedies by symptoms, <br />
            learn benefits, and <br />
            use them safely.
          </p>
        </div>
      </Reveal>

      {/* Right Panel */}
      <Reveal direction="right" containerClass="w-full md:w-2/5" delay={0.7}>
        <div className="text-start md:text-right text-sm">
          <p className="px-6 md:pr-16 text-white py-4 bg-tertiarybackground/20 backdrop-blur-md border border-white/30 rounded-l-full shadow-lg">
            Share your knowledge, <br />
            publish remedies, and <br />
            help people heal naturally.
          </p>
        </div>
      </Reveal>
    </div>
  );
};

export default HeroTwo;
