import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";

import { TbMailFilled } from "react-icons/tb";
import { RootState } from "@/store";
import {
  resetForm,
  updatedInputChange,
  updatedInputError,
} from "@/slices/authSlice";
import { SigninInputProps } from "../../types/user-auth.type";
import { clientFetch } from "@/lib/client-fetch";

const SignInForm = () => {
  const t = useTranslations("Sign");
  const router = useRouter();
  const dispatch = useDispatch();
  const { signinInput, isError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "signinInput", name, value }));
  };

  const handleInputError = (inputValue: SigninInputProps) => {
    const { email, password } = inputValue;
    let error = {
      status: false,
      message: "",
    };
    switch (true) {
      case !email || !password:
        error = {
          status: true,
          message: `${t("message.error.blank")}`,
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

  const handleSigninSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleInputError(signinInput)) return;

    try {
      const response = await clientFetch("/login", "POST", false, signinInput);
      if (!response.success) {
        toast.error(`${t("message.signin-false")}`);
        return;
      }
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      setCookie("authToken", response.data.token, {
        expires: expirationDate,
      });
      dispatch(resetForm());
      router.push({
        pathname: "/",
        query: { signin_success: "true" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      className="flex flex-col gap-6"
      onSubmit={handleSigninSubmit}
    >
      <div className="flex flex-col gap-4">
        <DefaultInput
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          icon={<TbMailFilled />}
          placeholder="coffee.M@example.com"
          value={signinInput.email}
          onInputChange={handleInputChange}
        />
        <DefaultPasswordInput
          id="password"
          name="password"
          label={t("form.password")}
          placeholder="********"
          value={signinInput.password}
          onInputChange={handleInputChange}
        />
      </div>
      {isError.status && <p className="text-red-400">{isError.message}</p>}
      <button
        type="submit"
        className="bg-apricot text-light w-full py-1 rounded-lg text-center hover:drop-shadow-lg"
      >
        {t("button.signin")}
      </button>
    </form>
  );
};

export default SignInForm;
