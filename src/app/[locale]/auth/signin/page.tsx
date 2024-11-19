import Link from "next/link";
import SignInForm from "@/components/users/SigninForm";
import { useTranslations } from "next-intl";
const SignInPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Sign");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 items-end">
        <h1 className="text-2xl md:text-4xl font-italiana uppercase">
          {t("signin")}
        </h1>
        <div className="inline text-natural text-sm">
          {t("or")}{" "}
          <span>
            <Link
              href={`/${locale}/auth/signup`}
              className="underline hover:font-medium"
            >
              {t("signup")}
            </Link>
          </span>
        </div>
      </div>

      <SignInForm />
    </div>
  );
};

export default SignInPage;
