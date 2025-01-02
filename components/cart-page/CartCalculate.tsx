import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

const CartCalculate = () => {
  const t = useTranslations("Cart");
  const { price } = useSelector((state: RootState) => state.order);
  return (
    <div className="rounded-lg bg-fern p-4 flex flex-col gap-6">
      <h5 className="font-bold uppercase text-xl">{t("calculate")}</h5>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between gap-4">
            <p>{t("price.product-price")}</p>
            <p className="font-medium">${price.productPrice}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p>{t("price.shipping-price")}</p>
            <p className="font-medium">${price.shippingPrice}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p>{t("price.tax-price")}</p>
            <p className="font-medium">${price.taxPrice}</p>
          </div>
        </div>
        <div className="w-full h-1 border-b-2 border-white"></div>
        <div className="flex justify-between gap-4">
          <p>{t("price.total")}</p>
          <p className="font-medium">${price.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CartCalculate;
