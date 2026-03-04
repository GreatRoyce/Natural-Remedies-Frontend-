import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-medium flex justify-between"
      >
        {title}
        <span>{open ? "-" : "+"}</span>
      </button>

      {open && (
        <div className="text-sm mt-2 whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
