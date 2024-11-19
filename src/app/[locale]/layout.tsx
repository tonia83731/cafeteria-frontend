/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "THE CAFE",
  description: "Relax and Refresh. Sip Serenity at Our Tea and Coffee Haven",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <main
      className={`${
        locale === "zh" ? "font-noto_sans" : "font-roboto"
      } bg-light text-fern`}
    >
      <NextIntlClientProvider messages={messages}>
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
      </NextIntlClientProvider>
    </main>
  );
}
