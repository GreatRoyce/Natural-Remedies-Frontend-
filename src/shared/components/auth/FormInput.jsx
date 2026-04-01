import React from "react";

const FormInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        w-full
        px-4
        py-2
        rounded-lg
        border
        border-secondarybackground
        focus:outline-none
        focus:ring-1
        focus:ring-primary
        text-sm
        transition-all
        duration-200
        ${className}
      `}
      {...rest}
    />
  );
};

export default FormInput;
