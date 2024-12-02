import Link from "next/link";
import { useTranslations } from "next-intl";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import { useRouter } from "next/router";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import FrontHeader from "@/components/common/header/Header";
import StepSection from "@/components/home/StepSection";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-italiana",
});
const noto_san = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  variable: "--font-noto-sans",
});

export default function Home() {
  const { locale } = useRouter();
  const t = useTranslations("Home");

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
  return (
    <div
      className={`${noto_san.variable} ${roboto.variable} ${
        italiana.variable
      } ${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      } bg-light text-fern`}
    >
      <FrontHeader />
      <div className="relative bg-home-mobile sm:bg-home-desktop bg-cover bg-center bg-no-repeat w-full h-screen pt-[75px] md:pt-0 md:w-[calc(100%-60px)] md:ml-[60px]">
        <div className="w-full h-full flex flex-col gap-4 md:gap-8 justify-center items-center">
          <div className="">
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
        <Link
          href="/staff/signin"
          title={t("staff")}
          className="absolute bottom-4 left-4 md:left-auto md:right-4 flex justify-center items-center w-10 h-10 text-3xl rounded-full border-2 border-ivory-60 text-ivory-60 hover:border-ivory hover:text-ivory"
        >
          <MdOutlineAdminPanelSettings />
        </Link>
      </div>
      <StepSection />
    </div>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
    },
  };
}
