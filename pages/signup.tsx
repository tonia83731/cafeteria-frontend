import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import { useTranslations } from "next-intl";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUp() {
  const t = useTranslations("Sign");
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* SignUp Title */}
        <div className="flex gap-1 items-end">
          <h1 className="text-2xl md:text-4xl font-italiana uppercase">
            {t("signup")}
          </h1>
          <div className="inline text-natural text-sm">
            {t("or")}{" "}
            <span>
              <Link href="/signin" className="underline hover:font-medium">
                {t("signin")}
              </Link>
            </span>
          </div>
        </div>
        {/* SignUp Form */}
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
    },
  };
}
