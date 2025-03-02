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
  const { locale } = router.query;
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Asia/Taipei"
      messages={pageProps.messages}
    >
      <Provider store={store}>
        <Head>
          <title>THE CAFE</title>
          <meta property="og:title" content="THE CAFE" key="title" />
          <meta
            property="og:description"
            content={
              locale === "en"
                ? "Relax and Refresh. Sip Serenity at Our Tea and Coffee Haven"
                : "放鬆身心，煥然一新。 在我們的茶與咖啡天堂品味寧靜"
            }
            key="title"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </NextIntlClientProvider>
  );
}
