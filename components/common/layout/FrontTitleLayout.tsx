"use client";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import FrontHeader from "../header/Header";
// import LocaleSwitcher from "../LocaleSwitcher";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import { ToastContainer } from "react-toastify";

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

const FrontTitleLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { locale } = useRouter();
  return (
    <div
      className={`${noto_san.variable} ${roboto.variable} ${
        italiana.variable
      } ${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      } bg-light text-fern`}
    >
      <FrontHeader />
      <div className="pt-[100px] pb-[60px] md:py-12 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px] lg:w-[calc(100%-240px)] lg:pl-[240px]">
        <div className="mx-auto max-w-[1200px] w-11/12 md:w-full">
          <div className="pb-8 w-full flex justify-end">
            <div className="w-1/3 max-w-[120px]">
              {/* <LocaleSwitcher direction="down" /> */}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="font-italiana text-2xl md:text-4xl md:mb-4 uppercase">
              {title}
            </h1>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              draggable={false}
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontTitleLayout;
