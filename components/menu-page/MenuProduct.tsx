import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
// import { useAuthContext } from "@/context/authContext";
// import { useOrderContext } from "@/context/orderContext";
// import { MultiLangProps } from "@/types/default";
import { MenuProductsProps } from "@/types/menu-type";
import QuantityBox from "../input/QuantityBox";
import Modal from "../common/Modal";
import { FaHeart } from "react-icons/fa6";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getQtyCount } from "@/slices/orderSlice";

const MenuProduct = ({
  id,
  title,
  description,
  price,
  image,
  categoryId,
  locale,
  isWished,
  onWishClick,
}: MenuProductsProps) => {
  const token = getCookie("authToken");
  const t = useTranslations("Menu");
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { sizesOptions, icesOptions, sugarsOptions } = useSelector(
    (state: RootState) => state.custom
  );

  const { cartTotalQty } = useSelector((state: RootState) => state.order);
  const [quantity, setQuantity] = useState(0);
  const [authoToggle, setAuthToggle] = useState(false);
  const [optionToggle, setOptionToggle] = useState(false);
  const [sizeOption, setSizeOption] = useState(1);
  const [iceOption, setIceOption] = useState(1);
  const [sugarOption, setSugarOption] = useState(1);

  const handleSetDefault = () => {
    setSizeOption(1);
    setIceOption(1);
    setSugarOption(1);
  };

  const handleCartToggle = () => {
    if (!token) {
      setAuthToggle(true);
      return;
    }
    setOptionToggle(true);
  };

  const handleAddCart = async (id: number, categoryId: number) => {
    if (!token) {
      setAuthToggle(true);
      return;
    }
    if (quantity <= 0) {
      toast.error(t("message.empty"));
      return;
    }
    const body = {
      productId: id,
      quantity,
      sizeId: categoryId === 3 || categoryId === 4 ? sizeOption : null,
      sugarId: categoryId === 3 || categoryId === 4 ? sugarOption : null,
      iceId: categoryId === 3 || categoryId === 4 ? iceOption : null,
    };

    try {
      const response = await clientFetch(`/carts/${userId}/add-cart`, {
        method: "POST",
        body,
        token,
      });

      if (response.success) {
        dispatch(getQtyCount({ count: cartTotalQty + quantity }));
        handleSetDefault();
        setQuantity(0);
        setOptionToggle(false);
        toast.success(t("message.added-success"));
      } else {
        toast.error(t("message.added-failed"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityClick = (type: "plus" | "minus") => {
    if (type === "plus") setQuantity(quantity + 1);
    if (type === "minus" && quantity > 0) setQuantity(quantity - 1);
  };

  const handleModalClose = () => {
    setOptionToggle(false);
    handleSetDefault();
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg flex flex-col gap-2">
        <div className="grid grid-cols-[100px_2fr] gap-4 items-center">
          <div className="w-[100px] h-[100px] relative justify-self-center">
            <Image
              src={image}
              alt={title[locale]}
              width={200}
              height={200}
              className="w-[100px] h-[100px] opacity-90 object-cover"
            ></Image>
            <button
              disabled={!token}
              onClick={() => onWishClick(id, isWished)}
              className={`absolute top-1 left-1 text-xl ${
                isWished ? "text-heart" : "text-fern-60"
              } hover:text-heart-60`}
            >
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
        <div className="grid grid-cols-2 gap-4 h-9">
          <QuantityBox
            quantity={quantity}
            onQuantityClick={handleQuantityClick}
          />

          {categoryId === 3 || categoryId === 4 ? (
            <button
              disabled={quantity === 0}
              onClick={() => handleCartToggle()}
              className="bg-apricot text-white w-full h-9 rounded-lg hover:shadow-md disabled:bg-default-gray disabled:text-white"
            >
              {t("button.add-cart")}
            </button>
          ) : (
            <button
              disabled={quantity === 0}
              onClick={() => handleAddCart(id, categoryId)}
              className="bg-apricot text-white w-full h-9 rounded-lg hover:shadow-md disabled:bg-default-gray disabled:text-white"
            >
              {t("button.add-cart")}
            </button>
          )}
        </div>
      </div>
      {optionToggle && (
        <Modal
          title={`${t("custom.title")}`}
          onClose={handleModalClose}
          isOpen={optionToggle}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h5 className="font-italiana text-lg">
                {t("custom.size-title")}
              </h5>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                {sizesOptions.map(({ id, title, price }) => {
                  return (
                    <label
                      htmlFor={`size-${id}`}
                      className={`w-full ${
                        sizeOption === id
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`size-${id}`}
                    >
                      <input
                        id={`size-${id}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setSizeOption(id)}
                        checked={sizeOption === id}
                      />
                      {title[locale]} (+${price})
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-italiana text-lg">{t("custom.ice-title")}</h5>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                {icesOptions.map(({ id, title }) => {
                  return (
                    <label
                      htmlFor={`ice-${id}`}
                      className={`w-full ${
                        iceOption === id
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`ice-${id}`}
                    >
                      <input
                        id={`ice-${id}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setIceOption(id)}
                        checked={iceOption === id}
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
                {sugarsOptions.map(({ id, title }) => {
                  return (
                    <label
                      htmlFor={`sugar-${id}`}
                      className={`w-full ${
                        sugarOption === id
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`sugar-${id}`}
                    >
                      <input
                        id={`sugar-${id}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setSugarOption(id)}
                        checked={sugarOption === id}
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
            <button
              onClick={() => handleAddCart(id, categoryId)}
              className="bg-apricot text-white w-full h-9 md:h-full rounded-lg hover:shadow-md"
            >
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
        </Modal>
      )}
      {authoToggle && (
        <Modal
          title={`${t("auth.title")}`}
          onClose={() => setAuthToggle(false)}
          isOpen={authoToggle}
        >
          <div>{t("auth.message")}</div>
          <footer className="grid grid-cols-2 gap-4">
            <Link
              href="/signin"
              className="bg-apricot text-white w-full h-9 leading-9 md:h-full md:leading-normal rounded-lg hover:shadow-md text-center md:py-1.5"
            >
              {t("auth.to-signin")}
            </Link>
            <button
              onClick={() => setAuthToggle(false)}
              className="bg-moss-60 text-white w-full h-9 md:h-full rounded-lg hover:shadow-md md:py-1.5"
            >
              {t("button.cancel")}
            </button>
          </footer>
        </Modal>
      )}
    </>
  );
};

export default MenuProduct;
