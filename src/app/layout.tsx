import "./globals.css";
import { Metadata } from "next";
import { Roboto, Italiana, Noto_Sans_TC } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  title: "THE CAFE",
  description: "Relax and Refresh. Sip Serenity at Our Tea and Coffee Haven",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body
          className={`${noto_san.variable} ${roboto.variable} ${
            italiana.variable
          } ${
            locale === "zh" ? "font-noto_sans" : "font-roboto"
          } bg-light text-fern`}
        >
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
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
