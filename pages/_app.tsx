import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { store } from "@/store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Asia/Taipei"
      messages={pageProps.messages}
    >
      <Provider store={store}>
        <Head>
          <title>THE CAFE</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </NextIntlClientProvider>
  );
}
