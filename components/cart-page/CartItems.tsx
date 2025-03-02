import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import QuantityBox from "../input/QuantityBox";
import { CartItemProps } from "@/types/cart-type";
import {
  getCartLists,
  getQtyCount,
  updatedOrderPrice,
} from "@/slices/orderSlice";
import { sizeOpts, iceOpts, sugarOpts } from "@/data/product-options";
import { clientFetch } from "@/lib/client-fetch";

const CartItems = ({
  id,
  title,
  title_en,
  product_price,
  has_opts,
  size,
  sugar,
  ice,
  quantity,
  item_price,
}: CartItemProps & {
  item_price: number;
}) => {
  const t = useTranslations("Cart");
  const dispatch = useDispatch();
  const { locale, query } = useRouter();
  const { account } = query;

  const { cartLists, cartTotalQty, price } = useSelector(
    (state: RootState) => state.order
  );

  const tag_style =
    "bg-moss text-white text-xs py-1.5 lg:text-base rounded-md text-center";

  const [customOptions, setCustomOptions] = useState({
    quantity: quantity,
    size: size,
    ice: ice,
    sugar: sugar,
    total: item_price,
  });

  const [editToggle, setEditToggle] = useState(false);

  const handleProductDelete = async () => {
    try {
      const response = await clientFetch(
        `/carts/${account}/${id}/delete-cart-item`,
        "DELETE",
        true
      );

      if (response?.success) {
        dispatch(
          getQtyCount({
            count: cartTotalQty - customOptions.quantity,
          })
        );
        const updated_cartlists = cartLists.filter((cart) => cart.id !== id);
        const updated_product_prices = updated_cartlists.reduce(
          (acc, curr) => (acc += curr.price),
          0
        );
        dispatch(
          updatedOrderPrice({
            name: "productPrice",
            value: updated_product_prices,
          })
        );
        dispatch(getCartLists({ data: updated_cartlists }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatedQuantity = async (type: "plus" | "minus") => {
    const updated_qty =
      type === "plus" ? customOptions.quantity + 1 : customOptions.quantity - 1;
    const curr_product_price = has_opts
      ? product_price + sizeOpts[customOptions.size as number].price
      : product_price;
    const updated_total = curr_product_price * updated_qty;

    try {
      const response = await clientFetch(
        `/carts/${account}/${id}/updated-cart-item-quantity`,
        "PATCH",
        true,
        {
          quantity: updated_qty,
        }
      );

      if (response?.success) {
        setCustomOptions((prev) => ({
          ...prev,
          quantity: updated_qty,
          total: updated_total,
        }));

        // 更新 購物車 數量
        dispatch(
          getQtyCount({
            count: type === "plus" ? cartTotalQty + 1 : cartTotalQty - 1,
          })
        );
        // 更新 產品 & 總價
        const updated_cartlists = cartLists.map((cart) => {
          return cart.id === id
            ? { ...cart, quantity: updated_qty, price: updated_total }
            : cart;
        });
        const updated_product_prices = updated_cartlists.reduce(
          (acc, curr) => (acc += curr.price),
          0
        );
        dispatch(
          updatedOrderPrice({
            name: "productPrice",
            value: updated_product_prices,
          })
        );
        dispatch(getCartLists({ data: updated_cartlists }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEdit = async () => {
    if (!has_opts) return;

    const body = {
      size: customOptions.size,
      ice: customOptions.ice,
      sugar: customOptions.sugar,
    };
    // see if price are the same
    const curr_product_price = product_price + sizeOpts[size as number].price;
    const updated_product_price =
      product_price + sizeOpts[customOptions.size as number].price;
    const isSamePrice = curr_product_price === updated_product_price;

    const productPrice = price.productPrice;
    // cartItemId ===> id
    console.log(body, isSamePrice, productPrice);
  };

  const handleEditCancel = () => {
    setCustomOptions({
      quantity,
      size,
      sugar,
      ice,
      total: item_price,
    });
    setEditToggle(false);
  };

  return (
    <div>
      <div
        className={`${
          editToggle ? "bg-ivory rounded-t-lg" : "bg-white rounded-lg"
        } px-4 py-2 flex flex-col gap-2 shadow-md`}
      >
        <div className="flex justify-between">
          <h5 className="font-bold text-lg md:text-xl">
            {locale === "en" ? title_en : title}
          </h5>
          <div className="text-apricot font-bold text-lg md:text-xl">
            ${customOptions.total}{" "}
            <span className="text-sm text-natural">(${product_price})</span>
          </div>
        </div>
        {has_opts && (
          <div className="grid grid-cols-3 gap-2 md:w-1/2">
            {customOptions.size !== null && (
              <p className={tag_style}>
                {
                  sizeOpts[customOptions.size].title[
                    locale as string as "en" | "zh"
                  ]
                }{" "}
                (+
                {sizeOpts[customOptions.size].price})
              </p>
            )}
            {customOptions.ice !== null && (
              <p className={tag_style}>
                {
                  iceOpts[customOptions.ice].title[
                    locale as string as "en" | "zh"
                  ]
                }
              </p>
            )}
            {customOptions.sugar !== null && (
              <p className={tag_style}>
                {
                  sugarOpts[customOptions.sugar].title[
                    locale as string as "en" | "zh"
                  ]
                }
              </p>
            )}
          </div>
        )}
        <div className="w-full grid grid-cols-3 gap-2 md:flex md:justify-between md:gap-8">
          <div className="col-start-1 md:w-1/2">
            <QuantityBox
              quantity={customOptions.quantity}
              onQuantityClick={handleUpdatedQuantity}
            />
          </div>
          <div className="w-full col-start-3 md:w-1/3 text-white grid grid-cols-2 gap-2">
            {has_opts && (
              <button
                onClick={() => setEditToggle(true)}
                className="bg-apricot w-full rounded-lg hover:drop-shadow-lg py-1"
              >
                {t("button.edit")}
              </button>
            )}
            <button
              onClick={handleProductDelete}
              className={`bg-moss-60 w-full rounded-lg hover:drop-shadow-lg py-1 ${
                !has_opts && "col-start-2"
              }`}
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
              {sizeOpts.map(({ value, title, price }) => {
                return (
                  <label
                    htmlFor={`size-${value}`}
                    className={`w-full ${
                      customOptions.size === value
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
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, size: value }))
                      }
                      checked={customOptions.size === value}
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
              {iceOpts.map(({ value, title }) => {
                return (
                  <label
                    htmlFor={`ice-${value}`}
                    className={`w-full ${
                      customOptions.ice === value
                        ? "bg-fern text-white"
                        : "border border-fern text-fern cursor-pointer"
                    } text-center rounded-full py-1 text-xs sm:text-sm`}
                    key={`ice-${value}`}
                  >
                    <input
                      id={`ice-${value}`}
                      type="radio"
                      className="hidden"
                      name="drinks-size"
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, ice: value }))
                      }
                      checked={customOptions.ice === value}
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
              {sugarOpts.map(({ value, title }) => {
                return (
                  <label
                    htmlFor={`sugar-${value}`}
                    className={`w-full ${
                      customOptions.sugar === value
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
                      onChange={() =>
                        setCustomOptions((prev) => ({ ...prev, sugar: value }))
                      }
                      checked={customOptions.sugar === value}
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
                onClick={handleProductEdit}
                disabled={
                  customOptions.size === size &&
                  customOptions.sugar === sugar &&
                  customOptions.ice === ice
                }
                className="bg-apricot w-full rounded-lg hover:shadow-lg py-1.5 disabled:hover:shadow-none disabled:bg-default-gray disabled:text-white"
              >
                {t("button.confirm")}
              </button>

              <button
                onClick={handleEditCancel}
                className="bg-default-gray w-full rounded-lg hover:shadow-lg py-1.5"
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
