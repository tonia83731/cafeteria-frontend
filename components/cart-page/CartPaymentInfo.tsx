import { paymentOpts, shippingOpts } from "@/data/status-option";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CartPaymentInfo = () => {
  const t = useTranslations("Cart");
  const { locale } = useRouter();
  const { price, couponAvailable, discount } = useSelector(
    (state: RootState) => state.order
  );

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
                  <p>${discount}</p>
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
            <li className="grid grid-cols-[3fr_1fr] gap-4">
              <input
                type="text"
                className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                placeholder="@DISCOUNT"
              />
              <button className="bg-apricot text-white h-8 px-2 rounded-md">
                {t("button.add")}
              </button>
            </li>
            <div className="flex flex-col gap-1">
              <li className="grid grid-cols-[1fr_2fr] items-center">
                <label htmlFor="shipping" className="">
                  {t("shipping-method")}:
                </label>
                <select
                  name="shipping"
                  id="shipping"
                  className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                >
                  {shippingOpts.map((item) => {
                    return (
                      <option
                        key={`shipping-${item.value}`}
                        value={item.value}
                        className=""
                      >
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
                  className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                >
                  {paymentOpts.map((item) => {
                    return (
                      <option
                        key={`payment-${item.value}`}
                        value={item.value}
                        className=""
                        disabled={item.value === 1}
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
        <button className="bg-apricot text-white h-8 px-4 rounded-md">
          {t("button.submit")}
        </button>
      </div>
    </div>
  );
};

export default CartPaymentInfo;
