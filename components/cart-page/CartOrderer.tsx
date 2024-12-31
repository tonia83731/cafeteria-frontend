import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

const CartOrderer = () => {
  const t = useTranslations("Cart");
  const { orderersInfo } = useSelector((state: RootState) => state.order);

  return (
    <div className="rounded-lg bg-fern p-4 flex flex-col gap-6">
      <h5 className="font-bold uppercase text-xl">{t("orderers")}</h5>
      <ul className="flex flex-col gap-2 pl-2">
        <li className="flex gap-2 items-center">
          <h5>- {t("input.name")}</h5>
          <p>{orderersInfo?.name}</p>
        </li>
        <li className="flex gap-2 items-center">
          <h5>- {t("input.phone")}</h5>
          <p>{orderersInfo?.phone || "尚未填入資料"}</p>
        </li>
        <li className="flex gap-2 items-center">
          <h5>- {t("input.email")}</h5>
          <p>{orderersInfo?.email || "尚未填入資料"}</p>
        </li>
      </ul>
    </div>
  );
};

export default CartOrderer;
