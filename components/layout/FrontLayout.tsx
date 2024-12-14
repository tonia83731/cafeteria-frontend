import { ReactNode } from "react";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
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
const FrontLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  const { locale } = useRouter();
  return (
    <div
      className={`w-full h-full min-h-screen bg-light text-fern ${
        noto_san.variable
      } ${roboto.variable} ${italiana.variable} ${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      }`}
    >
      {/* FrontHeader */}
      <FrontHeader />
      {/* FrontBody */}
      <div className="pt-[100px] pb-[60px] md:py-12 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px] lg:w-[calc(100%-240px)] lg:pl-[240px]">
        <div className="mx-auto max-w-[1200px] w-11/12 md:w-full">
          <div className="flex flex-col gap-8">
            <h1 className="font-italiana text-2xl md:text-4xl md:mb-4 uppercase">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
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
  );
};

export default FrontLayout;
