import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updatedFormInfo,
  updatedFormValidation,
  updatedSyncChecked,
} from "@/slices/orderSlice";
import DefaultInput from "../input/DefaultInput";
import { useEffect } from "react";

const CartPersonal = () => {
  const t = useTranslations("Cart");
  const dispatch = useDispatch();
  const { recipientInfo, syncChecked } = useSelector(
    (state: RootState) => state.order
  );

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInfo({ formType: "recipientInfo", name, value }));
  };

  useEffect(() => {
    for (const key in recipientInfo) {
      if (recipientInfo[key] === "") {
        dispatch(
          updatedFormValidation({ type: "recipientInfo", value: false })
        );
      }
    }
    dispatch(updatedFormValidation({ type: "recipientInfo", value: true }));
  }, [recipientInfo]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <DefaultInput
          id="name"
          name="name"
          label={`${t("input.name")}`}
          placeholder="Coffee Maniac"
          onInputChange={handleInputChange}
          value={recipientInfo.name}
          className="h-10"
        />
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
          <DefaultInput
            id="phone"
            name="phone"
            label={`${t("input.phone")}`}
            placeholder="0912345678"
            onInputChange={handleInputChange}
            value={recipientInfo.phone}
            className="h-10"
          />
        </div>
        <DefaultInput
          id="address"
          name="address"
          label={`${t("input.address")}`}
          placeholder="TheCafe Rd. 113"
          onInputChange={handleInputChange}
          value={recipientInfo.address}
          className="h-10"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="sync"
          type="checkbox"
          className="w-4 h-4 accent-apricot"
          checked={!syncChecked}
          onChange={() => dispatch(updatedSyncChecked())}
        />
        <label htmlFor="sync">{t("input.sync")}</label>
      </div>
    </div>
  );
};

export default CartPersonal;
