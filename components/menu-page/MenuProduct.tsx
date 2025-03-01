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
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sizeOpts, iceOpts, sugarOpts } from "@/data/product-options";
import { getQtyCount } from "@/slices/orderSlice";

type OptionTypes = {
  value: number;
  title: {
    zh: string;
    en: string;
  };
  price?: number;
};

const MenuProduct = ({
  id,
  title,
  title_en,
  description,
  description_en,
  price,
  image,
  categoryId,
  locale,
  isWished,
  hasOpts,
  onWishClick,
}: MenuProductsProps) => {
  const token = getCookie("authToken");
  const t = useTranslations("Menu");
  const dispatch = useDispatch();
  const { isAuth, userAccount } = useSelector((state: RootState) => state.auth);

  const { cartTotalQty } = useSelector((state: RootState) => state.order);
  const [quantity, setQuantity] = useState(0);
  const [authoToggle, setAuthToggle] = useState(false);
  const [optionToggle, setOptionToggle] = useState(false);
  const [sizeOption, setSizeOption] = useState<OptionTypes>(sizeOpts[0]);
  const [iceOption, setIceOption] = useState<OptionTypes>(iceOpts[2]);
  const [sugarOption, setSugarOption] = useState<OptionTypes>(sugarOpts[2]);

  const handleSetDefault = () => {
    setSizeOption(sizeOpts[0]);
    setIceOption(iceOpts[2]);
    setSugarOption(sugarOpts[2]);
  };

  const handleCartToggle = () => {
    if (!token) {
      setAuthToggle(true);
      return;
    }
    setOptionToggle(true);
  };

  const handleAddCart = async (id: number, categoryId: number) => {
    console.log(token);
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
      size: hasOpts ? sizeOption : null,
      sugar: hasOpts ? sugarOption : null,
      ice: hasOpts ? iceOption : null,
    };

    try {
      // const response = await clientFetch(`/carts/${userId}/add-cart`, {
      //   method: "POST",
      //   body,
      //   token,
      // });
      // if (response.success) {
      //   dispatch(getQtyCount({ count: cartTotalQty + quantity }));
      //   handleSetDefault();
      //   setQuantity(0);
      //   setOptionToggle(false);
      //   toast.success(t("message.added-success"));
      // } else {
      //   toast.error(t("message.added-failed"));
      // }
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
              alt={locale === "en" ? title_en : title}
              width={200}
              height={200}
              className="w-[100px] h-[100px] opacity-90 object-cover"
            ></Image>
            <button
              disabled={!isAuth}
              onClick={() => onWishClick(id, isWished)}
              className={`absolute top-1 left-1 text-xl ${
                isWished ? "text-heart" : "text-fern-60"
              } hover:text-heart-60 disabled:hover:text-fern-60`}
            >
              <FaHeart />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold flex justify-between">
              <h5>{locale === "en" ? title_en : title}</h5>
              <div className="text-apricot">${price}</div>
            </div>
            <p className="text-xs text-natural md:line-clamp-4">
              {locale === "en" ? description_en : description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-9">
          <QuantityBox
            quantity={quantity}
            onQuantityClick={handleQuantityClick}
          />

          {hasOpts ? (
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
                {sizeOpts.map(({ value, title, price }) => {
                  return (
                    <label
                      htmlFor={`size-${value}`}
                      className={`w-full ${
                        sizeOption.value === value
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`size-${value}`}
                    >
                      <input
                        id={`size-${value}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setSizeOption({ value, title, price })}
                        checked={sizeOption.value === value}
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
                {iceOpts.map(({ value, title }) => {
                  return (
                    <label
                      htmlFor={`ice-${value}`}
                      className={`w-full ${
                        iceOption.value === value
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`ice-${value}`}
                    >
                      <input
                        id={`ice-${id}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setIceOption({ value, title })}
                        checked={iceOption.value === value}
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
                {sugarOpts.map(({ value, title }) => {
                  return (
                    <label
                      htmlFor={`sugar-${value}`}
                      className={`w-full ${
                        sugarOption.value === value
                          ? "bg-fern text-white"
                          : "border border-fern text-fern cursor-pointer"
                      } text-center rounded-full py-1 text-xs sm:text-sm`}
                      key={`sugar-${value}`}
                    >
                      <input
                        id={`sugar-${value}`}
                        type="radio"
                        className="hidden"
                        name="drinks-size"
                        onChange={() => setSugarOption({ value, title })}
                        checked={sugarOption.value === value}
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
          onClose={() => {
            setQuantity(0);
            setAuthToggle(false);
          }}
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
              onClick={() => {
                setQuantity(0);
                setAuthToggle(false);
              }}
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
