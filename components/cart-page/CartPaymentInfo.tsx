import { paymentOpts, shippingOpts } from "@/data/status-option";
import {
  removeCouponStatus,
  resetCartInfo,
  updatedCouponChange,
  updatedCouponStatus,
  updatedPaymentInfo,
} from "@/slices/orderSlice";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { clientFetch } from "@/lib/client-fetch";

const CartPaymentInfo = () => {
  const t = useTranslations("Cart");
  const { locale, query, push } = useRouter();
  const { account } = query;
  const [validationErr, setValidationErr] = useState("");
  const dispatch = useDispatch();
  const {
    price,
    couponAvailable,
    discount,
    discountCode,
    discountId,
    shipping,
    payment,
    recipientName,
    recipientPhone,
    recipientAddress,
  } = useSelector((state: RootState) => state.order);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(
      updatedPaymentInfo({
        name: name as string as "payment" | "shipping",
        value,
      })
    );
  };

  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updatedCouponChange({ value: e.target.value.toUpperCase() }));
  };
  const handleCouponAdd = async () => {
    try {
      const response = await clientFetch(
        `/discounts/${account}/checked-discount-validation`,
        "POST",
        true,
        { code: discountCode }
      );

      if (response?.success) {
        const data = response.data;
        const { status, coupon } = data;

        if (!status) {
          setValidationErr(`${t("message.unavailable")}`);
          return;
        }

        dispatch(updatedCouponStatus({ status, coupon }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCouponRemove = () => {
    dispatch(removeCouponStatus());
  };

  const handlePlacedOrder = async () => {
    const body = {
      recipientName,
      recipientPhone,
      recipientAddress,
      shipping,
      payment,
      discountId,
      discountPrice: discount,
      tax: price.taxPrice,
      productPrice: price.productPrice,
    };

    try {
      const response = await clientFetch(
        `/orders/${account}/placed-order`,
        "POST",
        true,
        body
      );

      if (response?.success) {
        dispatch(resetCartInfo());
        push({
          pathname: "/",
          query: { order_placed: "true" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-fern text-light rounded-md">
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="p-2 md:p-4 flex flex-col gap-4">
          <h5 className="font-medium text-lg">{t("calculate")}</h5>
          <ul className="border-b border-white md:border-b-0 md:border-r pb-4 md:pb-0 flex flex-col gap-2 md:pr-4">
            <div className="border-b border-white pb-2 flex flex-col gap-1">
              <li className="flex justify-between items-center gap-4">
                <p>{t("price.product-price")}</p>
                <p>${price.productPrice}</p>
              </li>
              <li className="flex justify-between items-center gap-4">
                <p>{t("price.tax-price")}</p>
                <p>${price.taxPrice}</p>
              </li>
              {couponAvailable && (
                <li className="flex justify-between items-center gap-4">
                  <p>{t("price.discount-price")}</p>
                  <p>-${discount}</p>
                </li>
              )}
            </div>
            <li className="pt-2 flex justify-between items-center gap-4">
              <p>{t("price.total")}</p>
              <p>${price.totalPrice}</p>
            </li>
          </ul>
        </div>
        <div className="p-2 md:p-4 flex flex-col gap-4">
          <h5 className="font-medium text-lg">{t("payment")}</h5>
          <ul className="pt-4 md:pt-0 flex flex-col gap-2">
            <li className="flex flex-col gap-0.5">
              <div className="grid grid-cols-[3fr_1fr] gap-4">
                <div className="px-2 bg-light rounded-md h-8 text-fern relative">
                  <input
                    type="text"
                    className="placeholder:natural h-8"
                    placeholder="@DISCOUNT"
                    onChange={handleCouponChange}
                    value={discountCode}
                    disabled={couponAvailable as boolean}
                  />
                  {couponAvailable && (
                    <button
                      onClick={handleCouponRemove}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-fern-60 hover:text-fern"
                    >
                      <RxCross2 />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleCouponAdd}
                  className="bg-apricot text-white h-8 px-2 rounded-md"
                >
                  {t("button.add")}
                </button>
              </div>
              {validationErr && <p className="text-red-500">{validationErr}</p>}
            </li>
            <div className="flex flex-col gap-1">
              <li className="grid grid-cols-[1fr_2fr] items-center">
                <label htmlFor="shipping" className="">
                  {t("shipping-method")}:
                </label>
                <select
                  name="shipping"
                  id="shipping"
                  className={`bg-light px-2 rounded-md h-8 placeholder:natural text-fern`}
                  onChange={handleSelectChange}
                  value={shipping}
                >
                  {shippingOpts.map((item) => {
                    return (
                      <option key={`shipping-${item.value}`} value={item.value}>
                        {item.title[locale as string as "en" | "zh"]}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li className="grid grid-cols-[1fr_2fr] items-center">
                <label htmlFor="payment" className="">
                  {t("payment-method")}:
                </label>
                <select
                  name="payment"
                  id="payment"
                  className={`bg-light px-2 rounded-md h-8 placeholder:natural text-fern`}
                  onChange={handleSelectChange}
                  value={payment}
                >
                  {paymentOpts.map((item) => {
                    return (
                      <option
                        key={`payment-${item.value}`}
                        value={item.value}
                        disabled={item.value === 1}
                        className="disabled:text-default-gray"
                      >
                        {item.title[locale as string as "en" | "zh"]}
                      </option>
                    );
                  })}
                </select>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-end pb-2 md:pb-4 pr-2 md:pr-4">
        <button
          onClick={handlePlacedOrder}
          className="bg-apricot text-white h-8 px-4 rounded-md"
        >
          {t("button.submit")}
        </button>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
