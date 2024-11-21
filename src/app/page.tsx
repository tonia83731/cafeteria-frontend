import Link from "next/link";
import { useTranslations } from "next-intl";
import StepSection from "@/components/home/StepSection";
import FrontHeader from "@/components/common/header/Header";
import LocaleSwitcher from "@/components/common/LocaleSwitcher";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export default function Home() {
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
    <>
      <FrontHeader />
      <div className="relative bg-home-mobile sm:bg-home-desktop bg-cover bg-center bg-no-repeat w-full h-screen pt-[75px] md:pt-0 md:w-[calc(100%-60px)] md:ml-[60px]">
        <div className="pt-4 px-4 w-full flex justify-end">
          <div className="w-1/3 max-w-[120px]">
            <LocaleSwitcher direction="down" />
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-4 md:gap-8 justify-center items-center">
          <div className="">
            <h1 className="text-6xl md:text-8xl text-ivory font-italiana text-center">
              THE CAFE
            </h1>
            <p className="text-center text-base md:text-2xl text-ivory">
              {/* <div dangerouslySetInnerHTML={{ __html: t("slogan") }} /> */}
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
    </>
  );
}
