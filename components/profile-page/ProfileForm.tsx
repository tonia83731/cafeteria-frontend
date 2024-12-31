import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedInputChange, updatedInputError } from "@/slices/authSlice";
import validator from "validator";

import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";

import { UserInputProps } from "@/types/user-auth.type";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const t = useTranslations("Profile");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { userInput, isError } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "userInput", name, value }));
  };

  const handleInputError = (inputValue: UserInputProps) => {
    const { name, account, email, password } = inputValue;
    let error = {
      status: false,
      message: "",
    };
    switch (true) {
      case !email || !account || !email:
        error = {
          status: true,
          message: `${t("message.blank")}`,
        };
        break;
      case name.length < 3 || name.length > 50:
        error = {
          status: true,
          message: `${t("message.invalid-name")}`,
        };
        break;
      case account.length < 3 || account.length > 50:
        error = {
          status: true,
          message: `${t("message.invalid-account")}`,
        };
        break;
      case !validator.isEmail(email):
        error = {
          status: true,
          message: `${t("message.invalid-email")}`,
        };
        break;
      case password &&
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }):
        error = {
          status: true,
          message: `${t("message.error.invalid-password")}`,
        };
        break;
      default:
        error = {
          status: false,
          message: "",
        };
        break;
    }
    dispatch(updatedInputError({ error }));
    return error.status;
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (handleInputError(userInput)) {
      return;
    }
    const { name, password, account, email, address, phone } = userInput;
    const body = {
      name,
      ...(password ? { password } : {}),
      address,
      phone,
      account,
      email,
    };
    try {
      const response = await clientFetch("/users/edit", {
        token,
        method: "PATCH",
        body,
      });
      if (!response.success) {
        toast.error(t("message.profile-update-failed"));
        return;
      }
      toast.success(t("message.profile-update-success"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 border border-apricot rounded-lg p-4"
      onSubmit={handleProfileSubmit}
    >
      <DefaultInput
        id="name"
        name="name"
        label="Name"
        icon={<TiUser />}
        placeholder="Coffee Maniac"
        value={userInput.name}
        onInputChange={handleInputChange}
      />
      <DefaultInput
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={<TbMailFilled />}
        // isDisabled={true}
        placeholder="coffee.M@example.com"
        value={userInput.email}
        onInputChange={handleInputChange}
      />
      <DefaultInput
        id="account"
        name="account"
        label="account"
        icon={<MdManageAccounts />}
        // isDisabled={true}
        placeholder="@CoffeeManiac"
        value={userInput.account}
        onInputChange={handleInputChange}
      />
      <DefaultPasswordInput
        id="password"
        name="password"
        label="Password"
        value={userInput.password}
        onInputChange={handleInputChange}
        placeholder="********"
      />
      <DefaultInput
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        icon={<MdOutlinePhoneAndroid />}
        value={userInput.phone}
        onInputChange={handleInputChange}
        placeholder="0912345678"
      />
      <DefaultInput
        id="address"
        name="address"
        label="Address"
        icon={<FaLocationDot />}
        value={userInput.address}
        onInputChange={handleInputChange}
        placeholder="TheCafe Rd. 113"
      />
      {isError.status && (
        <p className="text-heart text-sm">{isError.message}</p>
      )}
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          {t("update-profile")}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
