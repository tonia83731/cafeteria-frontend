import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import validator from "validator";
import AuthLayout from "@/components/common/layout/AuthLayout";
import { MdLockPerson, MdOutlinePhoneAndroid } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { clientFetch } from "@/lib/fetch";

const SignUpPage = () => {
  const t = useTranslations("Sign");
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const [passwordShowed, setPasswordShowed] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  // const initializedInput = () => {
  //   if (nameRef.current) {
  //     nameRef.current.value = "";
  //   }
  //   if (emailRef.current) {
  //     emailRef.current.value = "";
  //   }
  //   if (passwordRef.current) {
  //     passwordRef.current.value = "";
  //   }
  //   if (phoneRef.current) {
  //     phoneRef.current.value = "";
  //   }
  //   setError({
  //     isError: false,
  //     message: "",
  //   });
  // };
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

    const body = {
      name,
      email,
      password,
      phone,
    };

    console.log(body);
    try {
      const response = await clientFetch("/register", {
        method: "POST",
        body,
      });

      if (response.success) {
        // toast.success(`${t("message.signup-success")}`);
        // initializedInput();
        router.push(`/auth/signin`);
      } else {
        toast.error(`${t("message.signup-false")}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${t("message.signup-false")}`);
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div className="flex gap-1 items-end">
          <h1 className="text-2xl md:text-4xl font-italiana uppercase">
            {t("signup")}
          </h1>
          <div className="inline text-natural text-sm">
            {t("or")}{" "}
            <span>
              <Link
                href={`/auth/signin`}
                className="underline hover:font-medium"
              >
                {t("signin")}
              </Link>
            </span>
          </div>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleUserSignup}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-base md:text-lg">
                {t("form.name")}
              </label>
              <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
                <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
                  <TiUser />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={nameRef}
                  placeholder="Coffee Maniac"
                  className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-base md:text-lg">
                {t("form.email")}
              </label>
              <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
                <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
                  <TbMailFilled />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="coffee.M@example.com"
                  className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-base md:text-lg">
                {t("form.password")}
              </label>
              <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
                <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
                  <MdLockPerson />
                </span>
                <input
                  id="password"
                  name="password"
                  placeholder="********"
                  type={passwordShowed ? "text" : "password"}
                  className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
                  ref={passwordRef}
                />
                <button
                  type="button"
                  className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center"
                  onClick={() => setPasswordShowed(!passwordShowed)}
                >
                  {passwordShowed ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-base md:text-lg">
                {t("form.phone")}
              </label>
              <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
                <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
                  <MdOutlinePhoneAndroid />
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  ref={phoneRef}
                  placeholder="0912345678"
                  className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
                />
              </div>
            </div>
          </div>
          {error.isError && (
            <p className="text-red-500 text-sm">{error.isError}</p>
          )}
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
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}
