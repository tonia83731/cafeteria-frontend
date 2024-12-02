"use client";

import { useState } from "react";
import { CategoryAPIData } from "@/pages/menu";

type MenuCategoryProps = {
  category_arr: CategoryAPIData[];
  locale: "en" | "zh";
};
const MenuCategory = ({ category_arr, locale }: MenuCategoryProps) => {
  const [selectCategory, setSelectCategory] = useState("ALL");
  return (
    <div className="grid grid-cols-5 gap-4">
      {category_arr.map(({ code, title }) => {
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
              value={code}
              className="hidden"
              onChange={() => setSelectCategory(code)}
              checked={selectCategory === code}
            />
            {title[locale]}
          </label>
        );
      })}
    </div>
  );
};

export default MenuCategory;
