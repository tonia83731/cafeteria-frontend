import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedInputChange } from "@/slices/authSlice";

import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { useTranslations } from "next-intl";

const ProfileForm = () => {
  const t = useTranslations("Profile");
  const dispatch = useDispatch();
  const { userInput } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (name: string, value: any) => {
    // console.log(name, value);
    dispatch(updatedInputChange({ type: "userInput", name, value }));
  };

  return (
    <div className="flex flex-col gap-6 border border-apricot rounded-lg p-4">
      <DefaultInput
        id="name"
        name="name"
        label={t("input.name")}
        icon={<TiUser />}
        placeholder="Coffee Maniac"
        value={userInput.name}
        onInputChange={handleInputChange}
      />
      <DefaultInput
        id="email"
        name="email"
        type="email"
        label={t("input.email")}
        icon={<TbMailFilled />}
        // isDisabled={true}
        placeholder="coffee.M@example.com"
        value={userInput.email}
        onInputChange={handleInputChange}
      />
      <DefaultInput
        id="account"
        name="account"
        label={t("input.account")}
        icon={<MdManageAccounts />}
        isDisabled={true}
        placeholder="@CoffeeManiac"
        value={userInput.account}
        onInputChange={handleInputChange}
      />
      <DefaultPasswordInput
        id="password"
        name="password"
        label={t("input.password")}
        value={userInput.password}
        onInputChange={handleInputChange}
        placeholder="********"
      />
      <DefaultInput
        id="phone"
        name="phone"
        label={t("input.phone")}
        type="tel"
        icon={<MdOutlinePhoneAndroid />}
        value={userInput.phone}
        onInputChange={handleInputChange}
        placeholder="0912345678"
      />
      <DefaultInput
        id="address"
        name="address"
        label={t("input.address")}
        icon={<FaLocationDot />}
        value={userInput.address}
        onInputChange={handleInputChange}
        placeholder="TheCafe Rd. 113"
      />
    </div>
  );
};

export default ProfileForm;
