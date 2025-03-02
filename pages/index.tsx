import Link from "next/link";
import { useTranslations } from "next-intl";

import HomeLayout from "@/components/layout/HomeLayout";
import StepSection from "@/components/home-page/StepSection";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const t = useTranslations("Home");
  const { signin_success, signout_success, order_placed } = useRouter().query;

  const home_link = [
    {
      href: `/#steps`,
      title: `${t("links.steps")}`,
    },
    {
      href: `/about`,
      title: `${t("links.about")}`,
    },
    {
      href: `/menu`,
      title: `${t("links.orders")}`,
    },
  ];

  useEffect(() => {
    if (signin_success === "true") {
      toast.success(`${t("message.signin-success")}`);
    }
  }, [signin_success]);

  useEffect(() => {
    if (signout_success === "true") {
      toast.success(`${t("message.signout-success")}`);
    }
  }, [signout_success]);

  useEffect(() => {
    if (order_placed === "true") {
      toast.success(`${t("message.order-placed")}`);
    }
  }, [order_placed]);

  return (
    <HomeLayout>
      <div className="w-full h-full flex flex-col gap-4 md:gap-8 justify-center items-center">
        <div>
          <h1 className="text-6xl md:text-8xl text-ivory font-italiana text-center">
            THE CAFE
          </h1>
          <p className="text-center text-base md:text-2xl text-ivory">
            {t("slogan")}
            <br />
            {t("slogan_2")}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-1/2 mx-auto text-center md:grid md:grid-cols-3">
          {home_link.map(({ href, title }, index) => {
            return (
              <Link
                href={href}
                key={`home-link-${index}`}
                className="bg-ivory rounded-lg py-2 md:text-lg"
              >
                {title}
              </Link>
            );
          })}
        </div>
      </div>
      <StepSection />
    </HomeLayout>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
    },
  };
}
