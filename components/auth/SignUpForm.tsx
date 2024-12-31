import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import validator from "validator";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import {
//   resetForm,
//   updatedInputChange,
//   updatedInputError,
// } from "@/slices/registerSlice";
import {
  resetForm,
  updatedInputChange,
  updatedInputError,
} from "@/slices/authSlice";
import { RootState } from "@/store";
import { clientFetch } from "@/lib/fetch";
import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";

import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";

import { SignupInputProps } from "@/types/user-auth.type";

const SignUpForm = () => {
  const t = useTranslations("Sign");
  const router = useRouter();
  const dispatch = useDispatch();
  const { signupInput, isError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleInputError = (inputValue: SignupInputProps) => {
    const { name, password, email, account, phone } = inputValue;
    let error = {
      status: false,
      message: "",
    };
    switch (true) {
      case !name || !email || !password || !account || !phone:
        error = {
          status: true,
          message: `${t("message.error.blank")}`,
        };
        break;
      case name.length < 3 || name.length > 50:
        error = {
          status: true,
          message: `${t("message.error.invalid-name")}`,
        };
        break;
      case account.length < 3 || account.length > 50:
        error = {
          status: true,
          message: `${t("message.error.invalid-account")}`,
        };
        break;
      case !validator.isEmail(email):
        error = {
          status: true,
          message: `${t("message.error.invalid-email")}`,
        };
        break;
      case !validator.isStrongPassword(password, {
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

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "signupInput", name, value }));
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleInputError(signupInput)) {
      return;
    }

    try {
      const response = await clientFetch("/register", {
        method: "POST",
        body: signupInput,
      });

      if (!response.success) {
        toast.error(`${t("message.signup-false")}`);
        return;
      }

      dispatch(resetForm());
      router.push({
        pathname: "/signin",
        query: { signup_success: "true" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleRegisterSubmit}>
      <div className="flex flex-col gap-4">
        <DefaultInput
          id="name"
          name="name"
          label={t("form.name")}
          icon={<TiUser />}
          placeholder="Coffee Maniac"
          value={signupInput.name}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="account"
          name="account"
          label={t("form.account")}
          icon={<MdAccountBalanceWallet />}
          placeholder="@coffeeManiac"
          value={signupInput.account}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          icon={<TbMailFilled />}
          placeholder="coffee.M@example.com"
          value={signupInput.email}
          onInputChange={handleInputChange}
        />
        <DefaultPasswordInput
          id="password"
          name="password"
          label={t("form.password")}
          placeholder="********"
          value={signupInput.password}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="phone"
          name="phone"
          type="tel"
          label={t("form.phone")}
          icon={<MdOutlinePhoneAndroid />}
          placeholder="0912345678"
          value={signupInput.phone}
          onInputChange={handleInputChange}
        />
      </div>
      {isError.status && <p className="text-red-400">{isError.message}</p>}
      <button
        type="submit"
        className="bg-apricot text-light w-full py-1 rounded-lg text-center hover:drop-shadow-lg"
      >
        {t("button.signup")}
      </button>
    </form>
  );
};

export default SignUpForm;
