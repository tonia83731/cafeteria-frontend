import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { CartStepProps } from "@/types/cart-type";
import { useOrderContext } from "@/context/orderContext";
import DefaultSelect from "../input/DefaultSelect";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const handleSelectOptions = (selectOptions: any[], locale: "zh" | "en") => {
  return selectOptions.map((opt: any) => ({
    value: opt.id,
    label: opt.title[locale as "en" | "zh"],
  }));
};
const CartOrder = ({ shippings, payments }: CartStepProps) => {
  const t = useTranslations("Cart");
  const { locale } = useRouter();
  const {
    shippingMethod,
    paymentMethod,
    dropdownToggle,
    selectShippingMethod,
    selectPaymentMethod,
    handleDropdownToggle,
    handleCouponAdd,
    handleOrderFormInput,
    handleCouponClear,
    couponAvailabled,
    orderForm,
  } = useOrderContext();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <DefaultSelect
          label={t("shipping-method")}
          type="shipping"
          selectOptions={handleSelectOptions(
            shippings,
            locale as string as "zh" | "en"
          )}
          selectValue={shippingMethod}
          dropdownToggle={dropdownToggle.shipping}
          onOptionClick={(option) => {
            selectShippingMethod(option, shippings);
            handleDropdownToggle("shipping");
          }}
          onDropdownToggle={() => handleDropdownToggle("shipping")}
        />
        <DefaultSelect
          label={t("payment-method")}
          type="payment"
          selectOptions={handleSelectOptions(
            payments,
            locale as string as "zh" | "en"
          )}
          selectValue={paymentMethod}
          dropdownToggle={dropdownToggle.payment}
          onOptionClick={(option) => {
            selectPaymentMethod(option);
            handleDropdownToggle("payment");
          }}
          onDropdownToggle={() => handleDropdownToggle("payment")}
        />
      </div>
      <div className="grid grid-cols-[1fr_80px] gap-2 md:gap-4 items-center">
        <div
          className={`bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern`}
        >
          {couponAvailabled !== null ? (
            <div
              className={`h-10 flex items-center ${
                couponAvailabled ? "text-green-400" : "text-heart"
              }`}
            >
              {couponAvailabled ? <FaCheck /> : <ImCross />}
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            className="w-full h-10 text-fern text-base placeholder:text-natural placeholder:text-sm"
            placeholder={t("input.code")}
            value={orderForm.discount}
            onChange={handleOrderFormInput}
            name="discount"
            id="discount"
          />
          <button disabled={!orderForm.discount} onClick={handleCouponClear}>
            <RxCross2 />
          </button>
        </div>
        <button
          disabled={!orderForm.discount}
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
