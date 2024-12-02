import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
// import { toast } from "react-toastify";
import validator from "validator";
import AuthLayout from "@/components/common/layout/AuthLayout";
import DefaultInput from "@/components/common/Input/DefaultInput";
import DefaultPasswordInput from "@/components/common/Input/DefaultPasswordInput";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";

const SignUpPage = () => {
  const t = useTranslations("Sign");
  const nameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
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
    // try {
    //   const response = await fetchRequest("/api/login", "POST", {
    //     name,
    //     email,
    //     password,
    //     phone,
    //   });
    //   if (response.success) {
    //     toast.success(`${t("message.signup-success")}`);
    //     router.push(`/${locale}/auth/signin`);
    //   } else {
    //     toast.error(`${t("message.signup-false")}`);
    //   }
    // } catch (error) {
    //   toast.error(`${t("message.signup-false")}`);
    //   console.log(error);
    // }
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

        {/* <SignUpForm /> */}
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
