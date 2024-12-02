import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
// import { toast } from "react-toastify";
import AuthLayout from "@/components/common/layout/AuthLayout";
import DefaultInput from "@/components/common/Input/DefaultInput";
import DefaultPasswordInput from "@/components/common/Input/DefaultPasswordInput";
import { TbMailFilled } from "react-icons/tb";

const SignInPage = () => {
  const t = useTranslations("Sign");
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

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

    // try {
    //   const response = await fetchRequest("/api/login", "POST", {
    //     email,
    //     password,
    //   });
    //   if (response.success) {
    //     const { user, token } = response.data;
    //     // console.log(user, token);
    //     const { id, name, email, languageId } = user;
    //     const profile: UserProfile = {
    //       id,
    //       name,
    //       email,
    //       languageId,
    //     };
    //     setCookie("authToken", token, {
    //       expires: dayjs().add(3, "day").toDate(),
    //     });
    //     setProfile(profile);
    //     toast.success(`${t("message.sigin-success")}`);
    //     router.push(`/`);
    //   } else {
    //     toast.error(`${t("message.signin-false")}`);
    //   }
    // } catch (error) {
    //   toast.error(`${t("message.signin-false")}`);
    //   console.log(error);
    // }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div className="flex gap-1 items-end">
          <h1 className="text-2xl md:text-4xl font-italiana uppercase">
            {t("signin")}
          </h1>
          <div className="inline text-natural text-sm">
            {t("or")}{" "}
            <span>
              <Link
                href={`/auth/signup`}
                className="underline hover:font-medium"
              >
                {t("signup")}
              </Link>
            </span>
          </div>
        </div>

        {/* <SignInForm /> */}
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
          {error.isError && (
            <p className="text-red-500 text-sm">{error.isError}</p>
          )}
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
      </div>
    </AuthLayout>
  );
};

export default SignInPage;

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}
