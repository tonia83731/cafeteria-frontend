import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { clientFetch } from "@/lib/fetch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import QuantityBox from "../input/QuantityBox";
import { CartItemProps } from "@/types/cart-type";
import { LangOptionType } from "@/types/custom-type";
import { getCartLists, updatedOrderPrice } from "@/slices/orderSlice";
import { sizeOpts, iceOpts, sugarOpts } from "@/data/product-options";

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
  price,
  onProductDelete,
}: CartItemProps & {
  onProductDelete: (id: number) => void;
}) => {
  const t = useTranslations("Cart");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { locale, query } = useRouter();
  const { account } = query;

  const { cartLists, cartTotalQty } = useSelector(
    (state: RootState) => state.order
  );

  const tag_style =
    "bg-moss text-white text-xs py-1.5 lg:text-base rounded-md text-center";

  const [customOptions, setCustomOptions] = useState({
    quantity: quantity,
    size: size,
    ice: ice,
    sugar: sugar,
    total: price,
  });

  const [editToggle, setEditToggle] = useState(false);

  const handleUpdatedQuantity = async (type: "plus" | "minus") => {
    // const updated_qty =
    //   type === "plus" ? customOptions.quantity + 1 : customOptions.quantity - 1;
    // const updated_total = product.price * updated_qty;
    // try {
    //   const response = await clientFetch(`/carts/${user_id}/${id}/quantity`, {
    //     method: "PATCH",
    //     token,
    //     body: {
    //       quantity: updated_qty,
    //       total: updated_total,
    //     },
    //   });
    //   if (!response.success) return;
    //   setCustomOptions((prev) => ({
    //     ...prev,
    //     quantity: updated_qty,
    //     total: updated_total,
    //   }));
    //   const updated_cartlist = cartLists.map((item) =>
    //     item.id === id
    //       ? { ...item, quantity: updated_qty, total: updated_total }
    //       : item
    //   );
    //   const count = type === "plus" ? cartTotalQty + 1 : cartTotalQty - 1;
    //   const totalPrice = updated_cartlist.reduce(
    //     (accu, curr) => accu + curr.total,
    //     0
    //   );
    //   dispatch(getCartLists({ data: updated_cartlist, count }));
    //   dispatch(updatedOrderPrice({ name: "productPrice", value: totalPrice }));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleProductEdit = async (cartItemId: number, body: any) => {
    // try {
    //   const response = await clientFetch(
    //     `/carts/${user_id}/${cartItemId}/custom`,
    //     {
    //       method: "PATCH",
    //       token,
    //       body,
    //     }
    //   );
    //   if (!response.success) {
    //     toast.error(t("message.edit-error"));
    //     return;
    //   }
    //   const updatedProduct = response.data;
    //   const updatedCart = cartLists.map((item) =>
    //     item.id === cartItemId ? { ...item, ...updatedProduct } : item
    //   );
    //   const totalPrice = updatedCart.reduce((acc, curr) => acc + curr.total, 0);
    //   dispatch(getCartLists({ data: updatedCart }));
    //   dispatch(updatedOrderPrice({ name: "productPrice", value: totalPrice }));
    //   toast.success(t("message.edit-success"));
    //   setEditToggle(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleEditCancel = () => {
    setCustomOptions({
      quantity,
      size,
      sugar,
      ice,
      total: price,
    });
    setEditToggle(false);
  };

  // useEffect(() => {
  //   const sizePrice =
  //     sizesOptions.find((item) => item.id === customOptions.sizeId)?.price || 0;
  //   const basePrice = product.price || 0;

  //   const newTotal = (basePrice + sizePrice) * customOptions.quantity;
  //   setCustomOptions((prev) => ({
  //     ...prev,
  //     total: newTotal,
  //   }));
  // }, [
  //   customOptions.quantity,
  //   customOptions.sizeId,
  //   sizesOptions,
  //   product.price,
  // ]);

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
            ${customOptions.total}
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
              onClick={() => onProductDelete(id)}
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
                onClick={() => handleProductEdit(id, customOptions)}
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
