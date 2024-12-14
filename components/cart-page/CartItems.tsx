import { useTranslations } from "next-intl";
import { CartItemProps } from "@/types/cart-type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useOrderContext } from "@/context/orderContext";
import QuantityBox from "../input/QuantityBox";
type LangOptionType = "zh" | "en";

const CartItems = ({
  id,
  product,
  sizeId,
  size,
  sugarId,
  sugar,
  iceId,
  ice,
  quantity,
  total,
}: CartItemProps) => {
  const t = useTranslations("Cart");
  const { locale } = useRouter();
  const {
    // currEditItem,
    customData,
    handleProductDelete,
    handleProductEdit,
    // handleEditDropdown,
    // handleUpdateQuantity,
  } = useOrderContext();
  const tag_style =
    "bg-moss text-white text-xs py-1.5 lg:text-base rounded-md text-center";

  const [customOptions, setCustomOptions] = useState({
    quantity: quantity,
    sizeId: sizeId,
    sugarId: sugarId,
    iceId: iceId,
    total: total,
  });
  //   const [productQuantity, setProductQuantity] = useState(quantity);
  const [editToggle, setEditToggle] = useState(false);
  const handleUpdateQuantity = (type: "plus" | "minus") => {
    if (type === "plus") {
      // const curr_price = (customOptions.quantity + 1) * product.price
      setCustomOptions((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
        // total: curr_price,
      }));
    } else {
      if (quantity === 1) return;
      // const curr_price = (customOptions.quantity - 1) * product.price
      setCustomOptions((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  const handleCartItemEdit = () => {
    if (sizeId && sugarId && iceId) {
      setEditToggle(true);
    } else {
      handleProductEdit(id, customOptions);
    }
  };

  const handleEditCancel = () => {
    setCustomOptions({
      quantity,
      sizeId,
      sugarId,
      iceId,
      total,
    });
    setEditToggle(false);
  };

  useEffect(() => {
    const sizePrice =
      customData.sizes.find((item) => item.id === customOptions.sizeId)
        ?.price || 0;
    const basePrice = product.price || 0;

    const newTotal = (basePrice + sizePrice) * customOptions.quantity;
    setCustomOptions((prev) => ({
      ...prev,
      total: newTotal,
    }));
  }, [
    customOptions.quantity,
    customOptions.sizeId,
    customData.sizes,
    product.price,
  ]);

  return (
    <div>
      <div
        className={`${
          editToggle ? "bg-ivory rounded-t-lg" : "bg-white rounded-lg"
        } px-4 py-2 flex flex-col gap-2 shadow-md`}
      >
        <div className="flex justify-between">
          <h5 className="font-bold text-lg md:text-xl">
            {product.title[locale as LangOptionType]}
          </h5>
          <div className="text-apricot font-bold text-lg md:text-xl">
            ${customOptions.total}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:w-1/2">
          {sizeId && (
            <p className={tag_style}>
              {size?.title[locale as LangOptionType]} (+{size?.price})
            </p>
          )}
          {sugarId && sugar && (
            <p className={tag_style}>{sugar[locale as LangOptionType]}</p>
          )}
          {iceId && ice && (
            <p className={tag_style}>{ice[locale as LangOptionType]}</p>
          )}
        </div>
        <div className="w-full flex justify-between gap-8">
          <div className="md:w-1/2">
            <QuantityBox
              quantity={customOptions.quantity}
              onQuantityClick={handleUpdateQuantity}
            />
          </div>
          <div className="w-full md:w-1/3 text-white grid grid-cols-2 gap-2">
            <button
              onClick={handleCartItemEdit}
              className="bg-apricot w-full rounded-lg hover:drop-shadow-lg py-1"
            >
              {t("button.edit")}
            </button>
            <button
              onClick={() => handleProductDelete(id)}
              className="bg-default-gray w-full rounded-lg hover:drop-shadow-lg py-1"
            >
              {t("button.delete")}
            </button>
          </div>
        </div>
      </div>

      {editToggle && (
        <div className="flex flex-col gap-4 bg-white rounded-b-lg p-4 shadow-md">
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">{t("custom.size-title")}</h5>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
              {customData.sizes.map(({ id, title, price }) => {
                return (
                  <label
                    htmlFor={`size-${id}`}
                    className={`w-full ${
                      customOptions.sizeId === id
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
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, sizeId: id }))
                      }
                      checked={customOptions.sizeId === id}
                    />
                    {title[locale as string as "en" | "zh"]} (+${price})
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">{t("custom.ice-title")}</h5>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
              {customData.ices.map(({ id, title }) => {
                return (
                  <label
                    htmlFor={`ice-${id}`}
                    className={`w-full ${
                      customOptions.iceId === id
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
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, iceId: id }))
                      }
                      checked={customOptions.iceId === id}
                    />
                    {title[locale as string as "en" | "zh"]}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-italiana text-lg">{t("custom.sugar-title")}</h5>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
              {customData.sugars.map(({ id, title }) => {
                return (
                  <label
                    htmlFor={`sugar-${id}`}
                    className={`w-full ${
                      customOptions.sugarId === id
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
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, sugarId: id }))
                      }
                      checked={customOptions.sugarId === id}
                    />
                    {title[locale as string as "en" | "zh"]}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-full md:w-1/3 text-white grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleProductEdit(id, customOptions);
                  setEditToggle(false);
                }}
                className="bg-apricot w-full rounded-lg hover:drop-shadow-lg py-1.5"
              >
                {t("button.confirm")}
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-default-gray w-full rounded-lg hover:drop-shadow-lg py-1.5"
              >
                {t("button.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
