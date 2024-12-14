import { useTranslations } from "next-intl";
import DefaultInput from "../input/DefaultInput";
import { useOrderContext } from "@/context/orderContext";

const CartPersonal = () => {
  const t = useTranslations("Cart");
  const { orderForm, handleOrderFormInput, syncChecked, handleSyncChecked } =
    useOrderContext();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <DefaultInput
          id="name"
          name="name"
          label={`${t("input.name")}`}
          placeholder="Coffee Maniac"
          onInputChange={handleOrderFormInput}
          value={orderForm.name}
          className="h-10"
        />
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
          <DefaultInput
            id="phone"
            name="phone"
            label={`${t("input.phone")}`}
            placeholder="0912345678"
            onInputChange={handleOrderFormInput}
            value={orderForm.phone}
            className="h-10"
          />
          {/* <DefaultInput
            id="email"
            name="email"
            type="email"
            label={`${t("input.email")}`}
            placeholder="Coffee.M@example.com"
            onInputChange={handleOrderFormInput}
            value={orderForm.email}
            className="h-10"
          /> */}
        </div>
        <DefaultInput
          id="address"
          name="address"
          label={`${t("input.address")}`}
          placeholder="TheCafe Rd. 113"
          onInputChange={handleOrderFormInput}
          value={orderForm.address}
          className="h-10"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="sync"
          type="checkbox"
          className="w-4 h-4 accent-apricot"
          checked={syncChecked}
          onChange={handleSyncChecked}
        />
        <label htmlFor="sync">{t("input.sync")}</label>
      </div>
    </div>
  );
};

export default CartPersonal;
