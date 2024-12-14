import { useTranslations } from "next-intl";
import { useAuthContext } from "@/context/authContext";
const CartOrderer = () => {
  const t = useTranslations("Cart");
  const { userProfile } = useAuthContext();
  return (
    <div className="rounded-lg bg-fern p-4 flex flex-col gap-6">
      <h5 className="font-bold uppercase text-xl">{t("orderers")}</h5>
      <ul className="flex flex-col gap-2 pl-2">
        <li className="flex gap-2 items-center">
          <h5 className="">- {t("input.name")}</h5>
          <p className="">{userProfile?.name}</p>
        </li>
        <li className="flex gap-2 items-center">
          <h5 className="">- {t("input.phone")}</h5>
          <p className="">{userProfile?.phone || "尚未填入資料"}</p>
        </li>
        <li className="flex gap-2 items-center">
          <h5 className="">- {t("input.email")}</h5>
          <p className="">{userProfile?.email || "尚未填入資料"}</p>
        </li>
      </ul>
    </div>
  );
};

export default CartOrderer;
