"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchRequest } from "@/api";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import validator from "validator";
import DefaultInput from "../common/Input/DefaultInput";
import DefaultPasswordInput from "../common/Input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";

const SignUpForm = () => {
  const t = useTranslations("Sign");
  const { locale } = useParams();
  const router = useRouter();

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const handleUserSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError({
      isError: false,
      message: "",
    });
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const phone = phoneRef.current?.value;

    if (!name || !email || !password || !phone) {
      setError({
        isError: true,
        message: t("message.error.blank"),
      });
      return;
    }

    if (name.length > 50 || name.length < 3) {
      setError({
        isError: true,
        message: t("message.error.invalid-name"),
      });
      return;
    }

    if (!validator.isEmail(email)) {
      setError({
        isError: true,
        message: t("message.error.invalid-email"),
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
      setError({
        isError: true,
        message: t("message.error.invalid-password"),
      });
      return;
    }
    try {
      const response = await fetchRequest("/api/login", "POST", {
        name,
        email,
        password,
        phone,
      });
      if (response.success) {
        toast.success(`${t("message.signup-success")}`);
        router.push(`/${locale}/auth/signin`);
      } else {
        toast.error(`${t("message.signup-false")}`);
      }
    } catch (error) {
      toast.error(`${t("message.signup-false")}`);
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleUserSignup}>
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
      {error.isError && <p className="text-red-500 text-sm">{error.isError}</p>}
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
