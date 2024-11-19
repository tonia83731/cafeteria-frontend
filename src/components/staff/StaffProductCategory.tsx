"use client";

import { useState } from "react";

type MenuCategoryProps = {
  category_arr: {
    id: number;
    code: string;
    title: {
      zh: string;
      en: string;
    };
  }[];
};
const StaffProductCategory = ({ category_arr }: MenuCategoryProps) => {
  const [selectCategory, setSelectCategory] = useState("ALL");
  return (
    <div className="grid grid-cols-3 gap-4">
      {category_arr.map(({ id, code, title }) => {
        return (
          <label
            htmlFor={code}
            className={`w-full ${
              selectCategory === code
                ? "bg-fern text-light"
                : "border border-fern text-fern cursor-pointer"
            } text-center rounded-full py-1`}
            key={code}
          >
            <input
              id={code}
              type="radio"
              name="category"
              value={id}
              className="hidden"
              onChange={() => setSelectCategory(code)}
              checked={selectCategory === code}
            />
            {title.zh}
          </label>
        );
      })}
    </div>
  );
};

export default StaffProductCategory;
