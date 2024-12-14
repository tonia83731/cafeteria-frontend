import { ReactNode } from "react";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import { useRouter } from "next/router";

import FrontHeader from "../header/FrontHeader";
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
const HomeLayout = ({ children }: { children: ReactNode }) => {
  const { locale } = useRouter();
  return (
    <div
      className={`w-full h-full min-h-screen bg-light text-fern ${
        noto_san.variable
      } ${roboto.variable} ${italiana.variable} ${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      }`}
    >
      {/* Home Header */}
      <FrontHeader />
      {/* Home Body */}
      <div className="relative bg-home-mobile sm:bg-home-desktop bg-cover bg-center bg-no-repeat w-full h-screen pt-[75px] md:pt-0 md:w-[calc(100%-60px)] md:ml-[60px]">
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
