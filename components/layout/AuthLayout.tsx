import { ReactNode } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import AuthHeader from "../header/AuthHeader";

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

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { locale } = useRouter();
  return (
    <div
      className={`w-full h-full min-h-screen bg-light text-fern ${
        noto_san.variable
      } ${roboto.variable} ${italiana.variable} ${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      }`}
    >
      {/* AuthHeader */}
      <AuthHeader />
      {/* AuthBody */}
      <div className="pt-[100px] pb-[60px] md:py-12 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px]">
        <div className="w-11/12 max-w-[900px] md:w-1/2 mx-auto">{children}</div>
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

export default AuthLayout;
