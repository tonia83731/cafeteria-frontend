"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import DefaultInput from "../common/Input/DefaultInput";
import DefaultPasswordInput from "../common/Input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";

const SignUpForm = () => {
  const t = useTranslations("Sign");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  return (
    <form action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <DefaultInput
          id="name"
          name="name"
          label={t("form.name")}
          icon={<TiUser />}
          ref={nameRef}
          placeholder="Coffee Maniac"
        />
        <DefaultInput
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          icon={<TbMailFilled />}
          ref={emailRef}
          placeholder="coffee.M@example.com"
        />
        <DefaultPasswordInput
          id="password"
          name="password"
          label={t("form.password")}
          ref={passwordRef}
          placeholder="********"
        />
        <DefaultInput
          id="phone"
          name="phone"
          label={t("form.phone")}
          type="tel"
          icon={<MdOutlinePhoneAndroid />}
          ref={phoneRef}
          placeholder="0912345678"
        />
      </div>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <button
          type="submit"
          className="w-full py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          {t("button.signup")}
        </button>
        <button
          type="button"
          className="w-full  py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          Google {t("button.signup")}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
