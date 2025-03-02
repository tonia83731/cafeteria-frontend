import { updatedRecipientInfo, updatedSyncChecked } from "@/slices/orderSlice";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartUserInfo = () => {
  const t = useTranslations("Cart");
  const dispatch = useDispatch();
  const {
    orderersInfo,
    recipientName,
    recipientAddress,
    recipientPhone,
    syncChecked,
  } = useSelector((state: RootState) => state.order);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      updatedRecipientInfo({
        name: name as string as
          | "recipientName"
          | "recipientPhone"
          | "recipientAddress",
        value,
      })
    );
  };

  const handleSyncChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    dispatch(updatedSyncChecked({ checked }));
  };

  return (
    <div className="bg-fern text-light rounded-md">
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="p-2 md:p-4 flex flex-col gap-4">
          <h5 className="font-medium text-lg">{t("orderer")}</h5>
          <ul className="border-b border-white md:border-b-0 md:border-r pb-4 md:pb-0 flex flex-col gap-1">
            <li className="grid grid-cols-[1fr_2fr]">
              <p>{t("order-input.name")}: </p>
              <p>{orderersInfo?.name}</p>
            </li>
            <li className="grid grid-cols-[1fr_2fr]">
              <p>{t("order-input.email")}: </p>
              <p>{orderersInfo?.email}</p>
            </li>
            <li className="grid grid-cols-[1fr_2fr]">
              <p>{t("order-input.phone")}: </p>
              <p>{orderersInfo?.phone || `${t("order-input.no-content")}`}</p>
            </li>
            <li className="grid grid-cols-[1fr_2fr]">
              <p>{t("order-input.address")}: </p>
              <p>{orderersInfo?.address || `${t("order-input.no-content")}`}</p>
            </li>
          </ul>
        </div>
        <div className="p-2 md:p-4 flex flex-col gap-4">
          <h5 className="font-medium text-lg">{t("recipient")}</h5>
          <ul className="pt-4 md:pt-0 flex flex-col gap-1">
            <li className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="recipientName" className="">
                {t("recipient-input.name")}:
              </label>
              <input
                type="text"
                id="recipientName"
                name="recipientName"
                className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                placeholder="Cafe Maniac"
                value={recipientName}
                onChange={handleInputChange}
              />
            </li>
            <li className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="recipientPhone" className="">
                {t("recipient-input.phone")}:
              </label>
              <input
                type="text"
                id="recipientPhone"
                name="recipientPhone"
                className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                placeholder="0912345678"
                value={recipientPhone}
                onChange={handleInputChange}
              />
            </li>
            <li className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="recipientAddress" className="">
                {t("recipient-input.address")}:
              </label>
              <input
                id="recipientAddress"
                name="recipientAddress"
                type="text"
                className="bg-light px-2 rounded-md h-8 placeholder:natural text-fern"
                placeholder="Cafe Rd. 123"
                value={recipientAddress}
                onChange={handleInputChange}
              />
            </li>
            <li className="flex items-center gap-1">
              <input
                type="checkbox"
                id="sync"
                checked={syncChecked}
                className="accent-apricot"
                onChange={handleSyncChecked}
              />
              <label htmlFor="sync" className="">
                {t("recipient-input.sync")}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartUserInfo;
