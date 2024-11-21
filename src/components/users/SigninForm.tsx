"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";
import { fetchRequest } from "@/api";
import { useUserStore, UserProfile } from "@/store/userStore";
import { toast } from "react-toastify";
import DefaultInput from "../common/Input/DefaultInput";
import DefaultPasswordInput from "../common/Input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";

const SignInForm = () => {
  const t = useTranslations("Sign");
  const { locale } = useParams();
  const router = useRouter();
  const { setProfile } = useUserStore();

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleUserSignin = async (e: FormEvent) => {
    e.preventDefault();
    setError({
      isError: false,
      message: "",
    });
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError({
        isError: true,
        message: t("message.error.blank"),
      });
      return;
    }

    try {
      const response = await fetchRequest("/api/login", "POST", {
        email,
        password,
      });
      if (response.success) {
        const { user, token } = response.data;
        // console.log(user, token);
        const { id, name, email, languageId } = user;
        const profile: UserProfile = {
          id,
          name,
          email,
          languageId,
        };
        setCookie("authToken", token, {
          expires: dayjs().add(3, "day").toDate(),
        });
        setProfile(profile);
        toast.success(`${t("message.sigin-success")}`);
        router.push(`/${locale}`);
      } else {
        toast.error(`${t("message.signin-false")}`);
      }
    } catch (error) {
      toast.error(`${t("message.signin-false")}`);
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleUserSignin}>
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
      {error.isError && <p className="text-red-500 text-sm">{error.isError}</p>}
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
