import React from "react";

const VARIANT_STYLES = {
  primary:
    "bg-primary border-2 text-tertiarybackground font-semibold shadow-xl hover:opacity-90 hover:text-primary hover:bg-primarybackground transition-all  active:scale-95 duration-300",

  secondary:
    "bg-white border-2 border-white text-primary font-medium hover:bg-primary hover:text-tertiarybackground  active:scale-95 transition-all duration-300",

  ghost:
    "bg-transparent text-tertiary hover:underline transition-colors duration-200",
};

const CompBtn = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  text="",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      text={text}
      className={`px-3 py-1 rounded-md transition-colors ${VARIANT_STYLES[variant]} ${className}`}
    >{text || children}
      
    </button>
  );
};

export default CompBtn;
