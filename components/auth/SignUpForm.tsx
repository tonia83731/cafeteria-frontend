import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import validator from "validator";
import { useRouter } from "next/router";
import { clientFetch } from "@/lib/fetch";
import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";

import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const t = useTranslations("Sign");
  const router = useRouter();

  const [inputValue, setInputValue] = useState({
    name: "",
    password: "",
    email: "",
    account: "@",
    phone: "",
  });
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  const initializedData = () => {
    setInputValue({
      name: "",
      password: "",
      email: "",
      account: "@",
      phone: "",
    });
    setIsError({
      status: false,
      message: "",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError({
      status: false,
      message: "",
    });

    const { name, password, email, account, phone } = inputValue;
    if (!name || !email || !password || !account || !phone) {
      setIsError({
        status: true,
        message: `${t("message.error.blank")}`,
      });
      return;
    }
    if (name.length < 3 || name.length > 50) {
      setIsError({
        status: true,
        message: `${t("message.error.invalid-name")}`,
      });
      return;
    }
    if (account.length < 3 || account.length > 50) {
      setIsError({
        status: true,
        message: `${t("message.error.invalid-account")}`,
      });
      return;
    }
    if (!validator.isEmail(email)) {
      setIsError({
        status: true,
        message: `${t("message.error.invalid-email")}`,
      });
      return;
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setIsError({
        status: true,
        message: `${t("message.error.invalid-password")}`,
      });
      return;
    }

    const body = {
      name,
      password,
      email,
      account,
      phone,
    };
    try {
      const response = await clientFetch("/register", {
        method: "POST",
        body,
      });

      if (response.success) {
        initializedData();
        router.push({
          pathname: "/signin",
          query: { signup_success: "true" },
        });
      } else {
        toast.error(`${t("message.signup-false")}`);
      }
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
          value={inputValue.name}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="account"
          name="account"
          label={t("form.account")}
          icon={<MdAccountBalanceWallet />}
          placeholder="@coffeeManiac"
          value={inputValue.account}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          icon={<TbMailFilled />}
          placeholder="coffee.M@example.com"
          value={inputValue.email}
          onInputChange={handleInputChange}
        />
        <DefaultPasswordInput
          id="password"
          name="password"
          label={t("form.password")}
          placeholder="********"
          value={inputValue.password}
          onInputChange={handleInputChange}
        />
        <DefaultInput
          id="phone"
          name="phone"
          type="tel"
          label={t("form.phone")}
          icon={<MdOutlinePhoneAndroid />}
          placeholder="0912345678"
          value={inputValue.phone}
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
