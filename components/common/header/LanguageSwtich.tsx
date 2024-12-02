import { useRouter } from "next/router";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
export const langauges = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "中文",
    value: "zh",
  },
];
const LanguageSwitch = () => {
  const t = useTranslations("Header");
  const locale = useLocale();
  const { push, pathname, query } = useRouter();
  const currLocale = langauges.find((lan) => lan.value === locale);
  const [localeSelected, setLocaleSelected] = useState(currLocale);

  //   const language = language_data.find((lang) => lang.value === locale);

  const handleLanguageSwitch = () => {
    const updated_locale = langauges.find((lan) => lan.value !== locale);
    if (updated_locale) {
      setLocaleSelected(updated_locale);
      push({ pathname, query }, undefined, { locale: updated_locale.value });
    }
  };

  return (
    <button
      onClick={handleLanguageSwitch}
      className="flex items-center gap-2 px-4 py-2"
    >
      <div className="font-roboto font-medium bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center text-lg">
        {localeSelected?.value}
      </div>
      <div
        className={`md:hidden ${
          pathname !== `/` && "lg:block"
        } text-natural hover:text-ivory`}
      >
        {t("curr_language")} {localeSelected?.label}
      </div>
    </button>
  );
};

export default LanguageSwitch;
