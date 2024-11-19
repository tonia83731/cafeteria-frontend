"use client";
import { MenuProductsProps } from "../menu/MenuProduct";
import { FaHeart } from "react-icons/fa6";

const WishProduct = ({
  //   id,
  title,
  description,
  price,
}: MenuProductsProps) => {
  return (
    <div className="bg-white px-4 py-2 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button className="text-xl text-heart">
            <FaHeart />
          </button>
          <h5 className="text-lg font-bold">{title.en}</h5>
        </div>
        <div className="text-apricot text-lg font-bold">${price}</div>
      </div>
      <p className="text-xs md:text-sm text-natural md:line-clamp-4">
        {description.en}
      </p>
    </div>
  );
};

export default WishProduct;
