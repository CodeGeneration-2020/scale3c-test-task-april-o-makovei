import React, { CSSProperties, FC } from "react";
import cls from "classnames";

export interface PaginationProps {
  className?: string;
  style?: CSSProperties;
  current?: number;
  total?: number;
  onChange?: (page: number) => void;
  pageLimit?: number;
  nextPage?: number | null;
}

const Pagination: FC<PaginationProps> = ({
  className,
  style,
  current = 1,
  total = 1,
  onChange = () => null,
  pageLimit = 10,
  nextPage,
}) => {
  const handlePrev = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  const handleNext = () => {
    if (nextPage) {
      onChange(current + 1);
    }
  };

  const render = () => {
    return (
      <>
        {" "}
        {(current - 1) * pageLimit + 1} -{" "}
        {current * pageLimit > total ? total : current * pageLimit} of {total}{" "}
      </>
    );
  };

  if (!total || total === 1) {
    return null;
  }

  return (
    <ul
      className={cls("mt-4 w-full flex justify-center items-center", className)}
      style={style}
    >
      <li>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 mr-4 rounded"
          disabled={current === 1}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
      </li>

      <li>{render()}</li>

      <li>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 ml-4 rounded"
          disabled={current === total}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
