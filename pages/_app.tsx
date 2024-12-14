import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/context/authContext";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { OrderProvider } from "@/context/orderContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Asia/Taipei"
      messages={pageProps.messages}
    >
      <AuthProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
