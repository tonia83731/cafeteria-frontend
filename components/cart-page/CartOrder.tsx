import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useMemo } from "react";
import { LangOptionType } from "@/types/custom-type";
import {
  updatedCouponStatus,
  updatedFormInfo,
  updatedFormValidation,
  updatedOrderPrice,
} from "@/slices/orderSlice";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";

const SELECTSTYLE = {
  indicatorSeparator: (styles: any) => ({
    ...styles,
    display: "none",
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#a68e74",
    fontSize: "0.875rem",
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: "0.25rem",
  }),
  control: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "#ffefcd",
    color: "#424530",
    height: "2.5rem",
    width: "100%",
    border: "1px solid #424530",
    borderRadius: "0.5rem",
    caretColor: "transparent",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    boxShadow: "none",
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: state.isSelected ? "#ffefcd" : "white",
    color: "#424530",
    "&:hover": {
      backgroundColor: "rgb(166, 142, 116, .3)",
    },
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: "#424530",
  }),
};
const handleSelectOptions = (selectOptions: any[], locale: LangOptionType) => {
  return selectOptions.map((opt: any) => ({
    value: opt.id,
    label: opt.title[locale as "en" | "zh"],
  }));
};
const CartOrder = () => {
  const t = useTranslations("Cart");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const { shippingOptions, paymentOptions } = useSelector(
    (state: RootState) => state.custom
  );
  const { basicInfo, couponAvailable } = useSelector(
    (state: RootState) => state.order
  );

  const shippings = useMemo(
    () => handleSelectOptions(shippingOptions, locale as LangOptionType),
    [shippingOptions, locale]
  );

  const payments = useMemo(
    () => handleSelectOptions(paymentOptions, locale as LangOptionType),
    [paymentOptions, locale]
  );

  const handleCouponAdd = async () => {
    if (!basicInfo.discount) return;
    try {
      const response = await clientFetch("/discounts/checked", {
        token,
        method: "POST",
        body: {
          code: basicInfo.discount,
        },
      });
      if (!response.success) {
        dispatch(updatedCouponStatus({ status: false }));
        return;
      }

      if (response.available) {
        dispatch(updatedCouponStatus({ status: true }));
        dispatch(
          updatedFormInfo({
            formType: "basicInfo",
            name: "discountId",
            value: response.data.id,
          })
        );
      } else {
        dispatch(updatedCouponStatus({ status: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCouponRemove = () => {
    dispatch(
      updatedFormInfo({
        formType: "basicInfo",
        name: "discountId",
        value: null,
      })
    );
    dispatch(
      updatedFormInfo({
        formType: "basicInfo",
        name: "discount",
        value: "",
      })
    );
    dispatch(updatedCouponStatus({ status: null }));
  };

  useEffect(() => {
    if (!basicInfo?.shipping) return;
    const shippingPrice = shippingOptions.find(
      (item) => item.id === basicInfo.shipping?.value
    );
    dispatch(
      updatedOrderPrice({
        name: "shippingPrice",
        value: shippingPrice?.price ? shippingPrice?.price : 0,
      })
    );
  }, [basicInfo.shipping]);

  useEffect(() => {
    if (basicInfo.shipping && basicInfo.payment) {
      dispatch(updatedFormValidation({ type: "basicInfo", value: true }));
    } else {
      dispatch(updatedFormValidation({ type: "basicInfo", value: false }));
    }
  }, [basicInfo.shipping, basicInfo.payment]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col gap-1.5">
          <h5 className="">{t("shipping-method")}</h5>
          <Select
            options={shippings}
            styles={SELECTSTYLE}
            defaultValue={basicInfo.shipping}
            onChange={(newValue) => {
              dispatch(
                updatedFormInfo({
                  formType: "basicInfo",
                  name: "shipping",
                  value: newValue,
                })
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h5 className="">{t("payment-method")}</h5>
          <Select
            options={payments}
            styles={SELECTSTYLE}
            defaultValue={basicInfo.payment}
            onChange={(newValue) => {
              dispatch(
                updatedFormInfo({
                  formType: "basicInfo",
                  name: "payment",
                  value: newValue,
                })
              );
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_80px] gap-2 md:gap-4 items-center">
        <div
          className={`bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern`}
        >
          {couponAvailable !== null ? (
            <div
              className={`h-10 flex items-center ${
                couponAvailable ? "text-green-400" : "text-heart"
              }`}
            >
              {couponAvailable ? <FaCheck /> : <ImCross />}
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            className="w-full h-10 text-fern text-base placeholder:text-natural placeholder:text-sm"
            placeholder={t("input.code")}
            value={basicInfo.discount}
            onChange={(e) =>
              dispatch(
                updatedFormInfo({
                  formType: "basicInfo",
                  name: "discount",
                  value: e.target.value,
                })
              )
            }
            name="discount"
            id="discount"
          />
          <button disabled={!basicInfo.discount} onClick={handleCouponRemove}>
            <RxCross2 />
          </button>
        </div>
        <button
          disabled={!basicInfo.discount}
          onClick={handleCouponAdd}
          className="bg-apricot rounded-lg hover:shadow-md hover:font-bold h-10 px-4 w-[80px]"
        >
          {t("button.add")}
        </button>
      </div>
    </div>
  );
};

export default CartOrder;
