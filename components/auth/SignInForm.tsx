import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { clientFetch } from "@/lib/fetch";

// import { useAuthContext } from "@/context/authContext";

import DefaultInput from "../input/DefaultInput";
import DefaultPasswordInput from "../input/DefaultPasswordInput";

import { TbMailFilled } from "react-icons/tb";
import { toast } from "react-toastify";

const SignInForm = () => {
  const t = useTranslations("Sign");
  const router = useRouter();
  // const { handleAuthConfirm } = useAuthContext();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  const initializedData = () => {
    setInputValue({
      email: "",
      password: "",
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

  const handleSigninSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError({
      status: false,
      message: "",
    });
    const { email, password } = inputValue;

    if (!email || !password) {
      setIsError({
        status: true,
        message: `${t("message.error.blank")}`,
      });
      return;
    }

    const body = {
      email,
      password,
    };

    try {
      const response = await clientFetch("/login", {
        method: "POST",
        body,
      });
      // console.log(response);
      if (response.success) {
        const expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        setCookie("authToken", response.data.token, {
          expires: expirationDate,
        });
        initializedData();
        router.push({
          pathname: "/",
          query: { signin_success: "true" },
        });
      } else {
        toast.error(`${t("message.signin-false")}`);
      }
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
