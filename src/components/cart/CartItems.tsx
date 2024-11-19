"use client";
import { useEffect, useState } from "react";
import { CartItemProps } from "@/app/cart/page";
import QuantityBox from "../common/QuantityBox";
import { size_dummy, ice_dummy, sugar_dummy } from "@/dummy/product_dummy";
const CartItems = ({
  id,
  product,
  quantity,
  size,
  ice,
  sugar,
  subPrice,
}: CartItemProps) => {
  const [qty, setQty] = useState(quantity);
  const [editToggle, setEditToggle] = useState(false);
  const [sizeOptions, setSizeOptions] = useState(size);
  const [iceOptions, setIceOptions] = useState(ice);
  const [sugarOptions, setSugarOptions] = useState(sugar);
  const [price, setPrice] = useState(subPrice);
  const handleQuantityClick = (type: "plus" | "minus") => {
    if (type === "plus") setQty(qty + 1);
    if (type === "minus" && qty > 0) setQty(qty - 1);
  };

  useEffect(() => {
    const calculatePrice = () => {
      let totalPrice = product.price;

      if (sizeOptions?.price) totalPrice += sizeOptions.price * qty;
      setPrice(totalPrice);
    };
    calculatePrice();
  }, [sizeOptions, qty]);
  return (
    <div className={editToggle ? "shadow-md rounded-lg" : ""}>
      <div
        className={`shadow-md px-4 py-2 flex flex-col gap-4 ${
          editToggle
            ? "bg-ivory rounded-t-lg "
            : "bg-white rounded-lg shadow-md"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-1">
            <h5 className="font-medium text-lg md:text-xl">{product.name}</h5>
            <div className="w-[108px]">
              <QuantityBox
                quantity={qty}
                onQuantityClick={handleQuantityClick}
              />
            </div>
          </div>
          {product.categoryId === 1 && (
            <div className="border border-fern rounded-sm grid grid-cols-3 text-sm text-fern text-center md:w-1/2">
              <div className="border-r border-fern">
                {sizeOptions?.title.en}{" "}
                {sizeOptions && sizeOptions?.price > 0
                  ? "+" + sizeOptions?.price
                  : ""}
              </div>
              <div className="border-r border-fern">{iceOptions?.title.en}</div>
              <div className="">{sugarOptions?.title.en}</div>
            </div>
          )}
        </div>
        <div className="flex justify-between gap-6 items-center">
          <h5 className="font-medium text-lg text-apricot">${price}</h5>
          <div className="flex items-center gap-2">
            {product.categoryId === 1 && (
              <button
                onClick={() => setEditToggle(!editToggle)}
                className="bg-apricot text-white py-1 w-[80px] md:h-full rounded-lg hover:shadow-md"
              >
                {editToggle ? "Done" : "Edit"}
              </button>
            )}
            <button className="bg-moss-60 text-white py-1 w-[80px] md:h-full rounded-lg">
              Delete
            </button>
          </div>
        </div>
      </div>
      {editToggle && (
        <div className="flex flex-col gap-4 px-4 py-2 rounded-b-lg bg-white">
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">Size Options</h5>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {size_dummy.map((size) => {
                return (
                  <label
                    htmlFor={size.code}
                    className={`w-full ${
                      sizeOptions?.code === size.code
                        ? "bg-fern text-white"
                        : "border border-fern text-fern cursor-pointer"
                    } text-center rounded-full py-1 text-xs sm:text-sm`}
                    key={size.code}
                  >
                    <input
                      id={size.code}
                      type="radio"
                      className="hidden"
                      name="drinks-size"
                      onChange={() => setSizeOptions(size)}
                      checked={sizeOptions?.code === size.code}
                    />
                    {size.title.en} (+${size.price})
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">Ice Options</h5>
            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {ice_dummy.map((ice) => {
                return (
                  <label
                    htmlFor={ice.code}
                    className={`w-full ${
                      iceOptions?.code === ice.code
                        ? "bg-fern text-white"
                        : "border border-fern text-fern cursor-pointer"
                    } text-center rounded-full py-1 text-xs sm:text-sm`}
                    key={ice.code}
                  >
                    <input
                      id={ice.code}
                      type="radio"
                      className="hidden"
                      name="drinks-size"
                      onChange={() => setIceOptions(ice)}
                      checked={iceOptions?.code === ice.code}
                    />
                    {ice.title.en}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">Sugar Options</h5>
            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {sugar_dummy.map((sugar) => {
                return (
                  <label
                    htmlFor={sugar.code}
                    className={`w-full ${
                      sugarOptions?.code === sugar.code
                        ? "bg-fern text-white"
                        : "border border-fern text-fern cursor-pointer"
                    } text-center rounded-full py-1 text-xs sm:text-sm`}
                    key={sugar.code}
                  >
                    <input
                      id={sugar.code}
                      type="radio"
                      className="hidden"
                      name="drinks-size"
                      onChange={() => setSugarOptions(sugar)}
                      checked={sugarOptions?.code === sugar.code}
                    />
                    {sugar.title.en}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
