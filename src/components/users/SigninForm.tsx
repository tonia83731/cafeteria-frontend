"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import DefaultInput from "../common/Input/DefaultInput";
import DefaultPasswordInput from "../common/Input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
const SignInForm = () => {
  const t = useTranslations("Sign");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  return (
    <form action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <DefaultInput
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          icon={<TbMailFilled />}
          placeholder="coffee.M@example.com"
          ref={emailRef}
        />
        <DefaultPasswordInput
          id="password"
          name="password"
          label={t("form.password")}
          placeholder="********"
          ref={passwordRef}
        />
      </div>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <button
          type="submit"
          className="w-full py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          {t("button.signin")}
        </button>
        <button
          type="button"
          className="w-full  py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          Google {t("button.signin")}
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
