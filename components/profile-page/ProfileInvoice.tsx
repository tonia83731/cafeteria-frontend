import { RootState } from "@/store";
import DefaultInput from "../input/DefaultInput";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { updatedInputChange } from "@/slices/authSlice";

const ProfileInvoice = () => {
  const t = useTranslations("Profile");
  const dispatch = useDispatch();
  const { userInput } = useSelector((state: RootState) => state.auth);
  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "userInput", name, value }));
  };

  return (
    <div className="h-fit border border-apricot rounded-lg p-4 flex flex-col gap-4">
      <h5 className="font-medium uppercase text-lg">{t("invoice")}</h5>
      <DefaultInput
        id="invoice"
        name="invoice"
        label=""
        placeholder="/1234567"
        value={userInput.invoice}
        onInputChange={handleInputChange}
        className="h-10 md:h-12 px-2"
      />
    </div>
  );
};

export default ProfileInvoice;
