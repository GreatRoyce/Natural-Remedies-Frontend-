import React from "react";
import liner from "../../../assets/Line.png";

import FlipCard from "../ui/FlipCard";
import { remedyData } from "../../utils/remedyData";



const Features = () => {
  return (
    <section className=" py-10 px-8 bg-tertiarybackground">
      {/* Header */}
      <div className="w-full md:w-2/5 text-center mb-12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Remedies</h2>

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
      <div className=" max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:gap-4 md:gap-2 sm:grid sm:grid-cols-2 lg:flex md:justify-center [&>*]:min-w-[250px]">
        {remedyData.map((remedy) => (
          <FlipCard key={remedy.id} {...remedy} />
        ))}
      </div>
    </section>
  );
};

export default Features;
