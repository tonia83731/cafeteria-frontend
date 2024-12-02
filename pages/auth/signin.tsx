import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { clientFetch } from "@/lib/fetch";
import { setCookie } from "cookies-next";
import AuthLayout from "@/components/common/layout/AuthLayout";
import { TbMailFilled } from "react-icons/tb";
import { MdLockPerson } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignInPage = () => {
  const t = useTranslations("Sign");
  const router = useRouter();
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [passwordShowed, setPasswordShowed] = useState(false);

  const handleUserSignin = async (e: FormEvent) => {
    e.preventDefault();
    setError({
      isError: false,
      message: "",
    });
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // console.log(emailRef, passwordRef);

    if (!email || !password) {
      setError({
        isError: true,
        message: t("message.error.blank"),
      });
      console.log(error);
      return;
    }

    const body = {
      email,
      password,
    };
    // console.log(body);

    try {
      const response = await clientFetch("/login", {
        method: "POST",
        body,
      });
      if (response.success) {
        const { token } = response.data;
        // console.log(token);
        setCookie("authToken", token, {
          expires: dayjs().add(3, "day").toDate(),
        });
        router.push(`/`);
      }
    } catch (error) {
      toast.error(`${t("message.signin-false")}`);
      console.log(error);
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

        <form className="flex flex-col gap-6" onSubmit={handleUserSignin}>
          <div className="flex flex-col gap-4">
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
          </div>
          {error.isError && (
            <p className="text-red-500 text-sm">{error.message}</p>
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
