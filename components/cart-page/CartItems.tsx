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
  onProductDelete,
}: CartItemProps & {
  onProductDelete: (id: number) => void;
}) => {
  const t = useTranslations("Cart");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { locale, query } = useRouter();
  const { user_id } = query;
  const { sizesOptions, icesOptions, sugarsOptions } = useSelector(
    (state: RootState) => state.custom
  );
  const { cartLists, cartTotalQty } = useSelector(
    (state: RootState) => state.order
  );

  const tag_style =
    "bg-moss text-white text-xs py-1.5 lg:text-base rounded-md text-center";

  const [customOptions, setCustomOptions] = useState({
    quantity: quantity,
    sizeId: sizeId,
    sugarId: sugarId,
    iceId: iceId,
    total: total,
  });

  const [editToggle, setEditToggle] = useState(false);

  const handleUpdatedQuantity = async (type: "plus" | "minus") => {
    const updated_qty =
      type === "plus" ? customOptions.quantity + 1 : customOptions.quantity - 1;
    const updated_total = product.price * updated_qty;
    try {
      const response = await clientFetch(`/carts/${user_id}/${id}/quantity`, {
        method: "PATCH",
        token,
        body: {
          quantity: updated_qty,
          total: updated_total,
        },
      });

      if (!response.success) return;

      setCustomOptions((prev) => ({
        ...prev,
        quantity: updated_qty,
        total: updated_total,
      }));

      const updated_cartlist = cartLists.map((item) =>
        item.id === id
          ? { ...item, quantity: updated_qty, total: updated_total }
          : item
      );
      const count = type === "plus" ? cartTotalQty + 1 : cartTotalQty - 1;
      const totalPrice = updated_cartlist.reduce(
        (accu, curr) => accu + curr.total,
        0
      );
      dispatch(getCartLists({ data: updated_cartlist, count }));
      dispatch(updatedOrderPrice({ name: "productPrice", value: totalPrice }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEdit = async (cartItemId: number, body: any) => {
    try {
      const response = await clientFetch(
        `/carts/${user_id}/${cartItemId}/custom`,
        {
          method: "PATCH",
          token,
          body,
        }
      );
      if (!response.success) {
        toast.error(t("message.edit-error"));
        return;
      }

      const updatedProduct = response.data;
      const updatedCart = cartLists.map((item) =>
        item.id === cartItemId ? { ...item, ...updatedProduct } : item
      );

      const totalPrice = updatedCart.reduce((acc, curr) => acc + curr.total, 0);

      dispatch(getCartLists({ data: updatedCart }));
      dispatch(updatedOrderPrice({ name: "productPrice", value: totalPrice }));

      toast.success(t("message.edit-success"));
      setEditToggle(false);
    } catch (error) {
      console.log(error);
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
      sizesOptions.find((item) => item.id === customOptions.sizeId)?.price || 0;
    const basePrice = product.price || 0;

    const newTotal = (basePrice + sizePrice) * customOptions.quantity;
    setCustomOptions((prev) => ({
      ...prev,
      total: newTotal,
    }));
  }, [
    customOptions.quantity,
    customOptions.sizeId,
    sizesOptions,
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
        <div className="w-full grid grid-cols-3 gap-2 md:flex md:justify-between md:gap-8">
          <div className="col-start-1 md:w-1/2">
            <QuantityBox
              quantity={customOptions.quantity}
              onQuantityClick={handleUpdatedQuantity}
            />
          </div>
          <div className="w-full col-start-3 md:w-1/3 text-white grid grid-cols-2 gap-2">
            {(product.categoryId === 3 || product.categoryId === 4) && (
              <button
                onClick={() => setEditToggle(true)}
                className="bg-apricot w-full rounded-lg hover:drop-shadow-lg py-1"
              >
                {t("button.edit")}
              </button>
            )}
            <button
              onClick={() => onProductDelete(id)}
              className={`bg-default-gray w-full rounded-lg hover:drop-shadow-lg py-1 ${
                product.categoryId !== 3 &&
                product.categoryId !== 4 &&
                "col-start-2"
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
              {sizesOptions.map(({ id, title, price }) => {
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
              {icesOptions.map(({ id, title }) => {
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
              {sugarsOptions.map(({ id, title }) => {
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
                onClick={() => handleProductEdit(id, customOptions)}
                disabled={
                  customOptions.sizeId === sizeId &&
                  customOptions.sugarId === sugarId &&
                  customOptions.iceId === iceId
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
