import React from "react";

const FlipCard = ({
  title,
  category,
  image,
  contributor,
  duration,
  preparation,   // this is now an array of { id, text }
  ingredients,   // this is now an array of { id, text }
  usage,
}) => {
  return (
    <div className="group relative w-full max-w-sm h-screen] bg-white rounded-xl shadow-lg  transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image section with category badge */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {category}
        </span>
      </div>

      {/* Content area */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {title}
        </h3>

        {/* Key details grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700"> Duration:</span>
            <p className="text-gray-600">{duration}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700"> Contributor:</span>
            <p className="text-gray-600">{contributor}</p>
          </div>
        </div>

        {/* Ingredients list */}
        <div>
          <span className="font-semibold text-gray-700">Ingredients:</span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            {ingredients.map((item) => (
              <li key={item.id} className="text-gray-600 text-sm">
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Preparation steps */}
        <div>
          <span className="font-semibold text-gray-700"> Preparation:</span>
          <ol className="list-decimal pl-5 mt-1 space-y-1">
            {preparation.map((step) => (
              <li key={step.id} className="text-gray-600 text-sm">
                {step.text}
              </li>
            ))}
          </ol>
        </div>

        {/* Usage */}
        <div>
          <span className="font-semibold text-gray-700"> Usage:</span>
          <p className="text-gray-600 text-sm mt-1 pb-10">{usage}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;