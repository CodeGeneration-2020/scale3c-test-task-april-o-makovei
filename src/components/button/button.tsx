import React, {
  BaseSyntheticEvent,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
} from "react";

interface ICustomButton
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void> | void;
  isLoading?: boolean;
}

const CustomButton: FC<ICustomButton> = (props) => {
  const { children, onClick, isLoading, ...rest } = props;

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="submit"
      disabled={isLoading}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
