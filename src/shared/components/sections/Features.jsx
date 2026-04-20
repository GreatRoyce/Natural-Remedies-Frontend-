import React from "react";
import liner from "../../../assets/Line.png";

import FlipCard from "../ui/FlipCard";
import { remedyData } from "../../utils/remedyData";

const Features = () => {
  return (
    <section className=" py-10 px-8 bg-tertiarybackground">
      {/* Header */}
      <div className="w-full md:w-2/5 text-center mb-12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Featured Remedies
        </h2>

        <div
          className="h-1 w-32 mx-auto my-3"
          style={{
            backgroundImage: `url(${liner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <p className="text-lg text-accent font-semibold">
          Popular remedies people trust
        </p>
      </div>

      {/* Cards */}
      <div className=" gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center ">
        {remedyData.map((remedy) => (
          <FlipCard key={remedy.id} {...remedy} />
        ))}
      </div>
    </section>
  );
};

export default Features;
