import React, { InputHTMLAttributes, forwardRef } from "react";
import cls from "classnames";

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { className = "", ...rest } = props;

  return (
    <input
      className={`border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md px-4 py-2 w-full ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default CustomInput;
