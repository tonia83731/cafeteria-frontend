import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";

export const language_options = [
  {
    value: "zh",
    label: "中文",
  },
  {
    value: "en",
    label: "English",
  },
];

const LanguageLink = ({ className = "w-6 h-6" }: { className?: string }) => {
  const { locale, asPath, push, pathname } = useRouter();
  const { isAuth, userProfile } = useAuthContext();

  const [currlanguage, setCurrlanguage] = useState(() => {
    const user_language = language_options.find(
      (lang) => lang.value === userProfile?.language
    );
    const default_language = language_options.find(
      (lang) => lang.value === locale
    );
    return isAuth && user_language ? user_language : default_language;
  });

  const handleLanguageSwitch = () => {
    const new_language = language_options.find((lang) => lang.value !== locale);
    if (new_language) {
      setCurrlanguage(new_language);
      push(asPath, asPath, { locale: new_language.value });
    }
  };

  useEffect(() => {
    const user_language = language_options.find(
      (lang) => lang.value === userProfile?.language
    );
    const default_language = language_options.find(
      (lang) => lang.value === locale
    );
    // setCurrlanguage(isAuth && user_language ? user_language : default_language);

    const new_language =
      isAuth && user_language ? user_language : default_language;

    if (new_language?.value !== currlanguage?.value) {
      setCurrlanguage(new_language);
      if (new_language?.value !== locale) {
        push(asPath, asPath, { locale: new_language?.value }).catch((err) => {
          console.error("Error updating locale:", err);
        });
      }
    }
  }, [isAuth, userProfile?.language, locale]);
  return (
    <button
      disabled={isAuth}
      className="flex items-center gap-2"
      onClick={handleLanguageSwitch}
    >
      <div
        className={`${className} bg-natural text-ivory rounded-full flex justify-center items-center font-medium text-sm`}
      >
        {currlanguage?.value.toUpperCase()}
      </div>
      <div
        className={`hidden ${
          pathname !== "/signin" &&
          pathname !== "/signup" &&
          pathname !== "/" &&
          "lg:block"
        }`}
      >
        {currlanguage?.label}
      </div>
    </button>
  );
};

export default LanguageLink;
