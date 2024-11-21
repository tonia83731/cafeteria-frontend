"use client";

import { useLocale } from "next-intl";
import { useState, useTransition } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
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

const LocaleSwitcher = ({ direction }: { direction: "side" | "down" }) => {
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const currLocale = langauges.find((lan) => lan.value === locale);
  const [isToggle, setIsToggle] = useState(false);
  const [localeSelected, setLocaleSelected] = useState(currLocale);
  //   console.log(locale);
  const handleLanguageClick = (language) => {
    const locale = language.value as Locale;
    setLocaleSelected(language);
    setIsToggle(false);
    startTransition(() => {
      setUserLocale(locale);
    });
  };
  return (
    <div className="text-sm md:text-base text-fern relative">
      <div
        onClick={() => setIsToggle(!isToggle)}
        className={`cursor-pointer border h-10 leading-10 border-fern-30 bg-white px-4 rounded-lg flex justify-between items-center ${
          isToggle ? "opacity-100" : "opacity-60"
        }`}
      >
        <div>{localeSelected.label}</div>
        <div className={`transition ${isToggle && "rotate-180"}`}>
          <IoIosArrowDown />
        </div>
      </div>
      {isToggle && (
        <ul
          className={`bg-white rounded-lg absolute w-full ${
            direction === "side"
              ? "top-0 left-[calc(100%+10px)]"
              : "top-[calc(100%+10px)] left-0"
          } drop-shadow-md`}
        >
          {langauges.map((language, index) => {
            return (
              <li
                onClick={() => handleLanguageClick(language)}
                className={`px-4 py-2 cursor-pointer ${
                  index === 0 ? "rounded-t-md" : "rounded-b-md"
                } ${
                  localeSelected.value === language.value
                    ? "bg-apricot text-white"
                    : "bg-white text-brown hover:bg-ivory-60 hover:text-natural"
                }`}
                key={language.value}
              >
                {language.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocaleSwitcher;
