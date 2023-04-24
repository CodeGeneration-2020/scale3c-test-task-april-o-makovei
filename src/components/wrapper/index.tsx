import cls from "classnames";
import { PropsWithChildren } from "react";

interface INextContainer extends PropsWithChildren {
  className?: string;
}
const NextContainer = ({ children, className }: INextContainer) => {
  return (
    <div className={cls("min-w-vw min-h-vh-50px p-[10px]", className)}>
      {children}
    </div>
  );
};

export default NextContainer;
