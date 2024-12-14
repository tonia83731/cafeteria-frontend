import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layout/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function SignIn() {
  const t = useTranslations("Sign");
  const { signup_success } = useRouter().query;

  useEffect(() => {
    if (!signup_success) return;
    toast.success(`${t("message.signup-success")}`);
  }, [signup_success]);
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        {/* SignIn Title */}
        <div className="flex gap-1 items-end">
          <h1 className="text-2xl md:text-4xl font-italiana uppercase">
            {t("signin")}
          </h1>
          <div className="inline text-natural text-sm">
            {t("or")}{" "}
            <span>
              <Link href="/signup" className="underline hover:font-medium">
                {t("signup")}
              </Link>
            </span>
          </div>
        </div>
        {/* SignIn Form */}
        <SignInForm />
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
