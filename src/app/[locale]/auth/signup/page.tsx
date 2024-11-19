import Link from "next/link";
import SignUpForm from "@/components/users/SignupForm";
import { useTranslations } from "next-intl";

const SignUpPage = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations("Sign");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 items-end">
        <h1 className="text-2xl md:text-4xl font-italiana uppercase">
          {t("signup")}
        </h1>
        <div className="inline text-natural text-sm">
          {t("or")}{" "}
          <span>
            <Link
              href={`/${locale}/auth/signin`}
              className="underline hover:font-medium"
            >
              {t("signin")}
            </Link>
          </span>
        </div>
      </div>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
