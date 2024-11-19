"use client";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Pagination = () => {
  const [currPage, setCurrPage] = useState(1);
  const page_arr = new Array(5).fill(0).map((_, index) => index + 1);
  const handleArrowClick = (type: "prev" | "next") => {
    if (type === "prev") {
      setCurrPage(currPage - 1);
    } else {
      setCurrPage(currPage + 1);
    }
  };
  const handleNumberClick = (num: number) => {
    setCurrPage(num);
  };
  return (
    <div className="flex items-center justify-center md:justify-end gap-2">
      <button
        className="text-xl flex justify-center items-center w-8 h-8 rounded-md bg-white border border-moss-60 disabled:border-none disabled:bg-moss disabled:text-default-gray"
        id="prev"
        onClick={() => handleArrowClick("prev")}
        disabled={currPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {page_arr.map((page) => {
        return (
          <button
            onClick={() => handleNumberClick(page)}
            className={`text-base flex justify-center items-center w-8 h-8 rounded-md bg-white border ${
              currPage === page
                ? "border-apricot text-apricot font-medium"
                : "border-moss-60"
            }`}
            key={page}
          >
            {page}
          </button>
        );
      })}
      <button
        className="text-xl flex justify-center items-center w-8 h-8 rounded-md bg-white border border-moss-60 disabled:border-none disabled:bg-moss disabled:text-default-gray"
        id="next"
        onClick={() => handleArrowClick("next")}
        disabled={currPage === page_arr.length}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
