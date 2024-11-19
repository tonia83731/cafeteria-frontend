"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import QuantityBox from "../common/QuantityBox";
import { FaHeart } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { size_dummy, ice_dummy, sugar_dummy } from "@/dummy/product_dummy";
export type MenuProductsProps = {
  id: number;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  price: number;
  image: string;
  categoryId: number;
  locale: string;
};

const MenuProduct = ({
  id,
  title,
  description,
  price,
  image,
  categoryId,
  locale,
}: MenuProductsProps) => {
  const t = useTranslations("Menu");
  const modalRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(0);
  const [optionToggle, setOptionToggle] = useState(false);
  const [sizeOptions, setSizeOptions] = useState("S");
  const [iceOptions, setIceOptions] = useState("100%-ice");
  const [sugarOptions, setSugarOptions] = useState("100%-sugar");
  const handleSetDefault = () => {
    setSizeOptions("S");
    setIceOptions("100%-ice");
    setSugarOptions("100%-sugar");
  };
  const handleAddCart = (id: number, categoryId: number) => {
    if (categoryId === 1) {
      setOptionToggle(true);
    }
  };
  const handleQuantityClick = (type: "plus" | "minus") => {
    if (type === "plus") setQuantity(quantity + 1);
    if (type === "minus" && quantity > 0) setQuantity(quantity - 1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOptionToggle(false);
        handleSetDefault();
      }
    };
    if (optionToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.removeEventListener("mousedown", handleClickOutside);
  }, [optionToggle]);
  return (
    <>
      <div className="bg-white px-4 py-2 rounded-lg flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_2fr] gap-4 items-center">
          <div className="w-[100px] h-[100px] relative justify-self-center">
            <Image
              src={image}
              alt={title[locale]}
              width={200}
              height={200}
              className="w-[100px] h-[100px] opacity-60"
            ></Image>
            <button className="absolute top-0.5 left-0.5 text-xl text-fern-60 hover:text-heart-60">
              <FaHeart />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold flex justify-between">
              <h5>{title[locale]}</h5>
              <div className="text-apricot">${price}</div>
            </div>
            <p className="text-xs text-natural md:line-clamp-4">
              {description[locale]}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-[1fr_2.5fr] gap-4 h-9">
          <QuantityBox
            quantity={quantity}
            onQuantityClick={handleQuantityClick}
          />
          <button
            onClick={() => handleAddCart(id, categoryId)}
            className="bg-apricot text-white w-full h-full rounded-lg hover:shadow-md"
          >
            {t("button.add-cart")}
          </button>
        </div>
      </div>
      {optionToggle && (
        <div className="fixed top-0 left-0 z-[200] bg-dark-30 w-full h-[calc(100vh-75px)] mt-[75px] md:w-[calc(100%-60px)] md:h-screen md:mt-0 md:ml-[60px] lg:w-[calc(100%-240px)] lg:ml-[240px] flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white w-11/12 md:w-2/3 mx-auto rounded-lg px-4 md:max-w-[800px]"
          >
            <header className="flex justify-between">
              <h2 className="font-italiana text-xl h-9 leading-9">
                {t("custom.title")}
              </h2>
              <button
                onClick={() => {
                  handleSetDefault();
                  setOptionToggle(false);
                }}
                className="text-xl text-fern"
              >
                <RxCross2 />
              </button>
            </header>
            <div className="py-4 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h5 className="font-italiana text-lg">
                    {t("custom.size-title")}
                  </h5>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                    {size_dummy.map(({ id, code, title, price }) => {
                      return (
                        <label
                          htmlFor={code}
                          className={`w-full ${
                            sizeOptions === code
                              ? "bg-fern text-white"
                              : "border border-fern text-fern cursor-pointer"
                          } text-center rounded-full py-1 text-xs sm:text-sm`}
                          key={code}
                        >
                          <input
                            id={code}
                            type="radio"
                            className="hidden"
                            name="drinks-size"
                            onChange={() => setSizeOptions(code)}
                            checked={sizeOptions === code}
                          />
                          {title[locale]} (+${price})
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="font-italiana text-lg">
                    {t("custom.ice-title")}
                  </h5>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                    {ice_dummy.map(({ id, code, title }) => {
                      return (
                        <label
                          htmlFor={code}
                          className={`w-full ${
                            iceOptions === code
                              ? "bg-fern text-white"
                              : "border border-fern text-fern cursor-pointer"
                          } text-center rounded-full py-1 text-xs sm:text-sm`}
                          key={code}
                        >
                          <input
                            id={code}
                            type="radio"
                            className="hidden"
                            name="drinks-size"
                            onChange={() => setIceOptions(code)}
                            checked={iceOptions === code}
                          />
                          {title[locale]}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h5 className="font-italiana text-lg">
                    {t("custom.sugar-title")}
                  </h5>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                    {sugar_dummy.map(({ id, code, title }) => {
                      return (
                        <label
                          htmlFor={code}
                          className={`w-full ${
                            sugarOptions === code
                              ? "bg-fern text-white"
                              : "border border-fern text-fern cursor-pointer"
                          } text-center rounded-full py-1 text-xs sm:text-sm`}
                          key={code}
                        >
                          <input
                            id={code}
                            type="radio"
                            className="hidden"
                            name="drinks-size"
                            onChange={() => setSugarOptions(code)}
                            checked={sugarOptions === code}
                          />
                          {title[locale]}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <footer className="flex flex-col md:grid md:grid-cols-[1fr_1fr_2fr] gap-2 md:gap-4 md:h-9">
                <QuantityBox
                  quantity={quantity}
                  onQuantityClick={handleQuantityClick}
                />
                <button className="bg-apricot text-white w-full h-9 md:h-full rounded-lg hover:shadow-md">
                  {t("button.add-cart")}
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleSetDefault}
                    className="bg-moss-60 text-white w-full h-9 md:h-full rounded-lg"
                  >
                    {t("button.clear")}
                  </button>
                  <button
                    onClick={() => {
                      handleSetDefault();
                      setOptionToggle(false);
                    }}
                    className="bg-moss-60 text-white w-full h-9 md:h-full rounded-lg"
                  >
                    {t("button.cancel")}
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuProduct;
