import { GetServerSideProps } from "next";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/authContext";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileForm from "@/components/profile-page/ProfileForm";

import { language_options } from "@/components/header/LanguageLink";

const ProfilePage = () => {
  const t = useTranslations("Profile");
  const { locale } = useRouter();
  const {
    userProfile,
    handleProfileSubmit,
    handleLanguageUpdate,
    userProfileError,
  } = useAuthContext();

  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const language = language_options.find((lang) => {
    if (userProfile) {
      return lang.value === userProfile?.language;
    } else {
      return lang.value === locale;
    }
  });
  const [perferLanguage, setPerferLanguage] = useState(language);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleProfileSubmit(users);
  };

  useEffect(() => {
    if (!userProfile) return;
    setUsers({
      name: userProfile?.name,
      email: userProfile?.email,
      password: "",
      phone: userProfile?.phone ? userProfile?.phone : "",
      address: userProfile?.address ? userProfile?.address : "",
    });
  }, [userProfile]);

  return (
    <ProfileLayout>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[2fr_1fr]">
        <ProfileForm
          userProfile={users}
          onInputChange={(e) =>
            setUsers((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          isError={userProfileError}
          onProfileSubmit={(e) => handleSubmit(e)}
        />
        <div className="h-fit border border-apricot rounded-lg p-4 flex flex-col gap-4">
          <h5 className="font-medium uppercase text-lg">{t("language")}</h5>
          <div className="flex flex-col gap-4">
            <Select
              options={language_options}
              defaultValue={perferLanguage}
              styles={{
                indicatorSeparator: (styles) => ({
                  ...styles,
                  display: "none",
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "#a68e74",
                  fontSize: "0.875rem",
                }),
                clearIndicator: (styles) => ({
                  ...styles,
                  display: "none",
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  display: "none",
                }),
                menu: (styles) => ({
                  ...styles,
                  borderRadius: "0.25rem",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#ffefcd",
                  height: "2.5rem",
                  width: "100%",

                  border: "none",
                  borderRadius: "0.5rem",
                  caretColor: "transparent",
                  paddingLeft: "0.5rem",
                  paddingRight: "1rem",
                  boxShadow: "none",
                  "&:hover": {
                    border: "1px solid #424530",
                  },
                  "&:focus": {
                    border: "1px solid #424530",
                  },
                  "&:active": {
                    border: "1px solid #424530",
                  },
                }),
                option: (styles, state) => ({
                  ...styles,
                  backgroundColor: state.isSelected
                    ? "rgb(255, 239, 205, .6)"
                    : "white",
                  color: "#424530",
                  "&:hover": {
                    backgroundColor: "rgb(255, 239, 205, .6)",
                  },
                }),
              }}
              onChange={(newValue, actionMeta) => {
                console.log(newValue, actionMeta);
                setPerferLanguage(
                  newValue as SetStateAction<
                    { value: string; label: string } | undefined
                  >
                );
              }}
            />
            <div className="w-full flex justify-end">
              <button
                disabled={userProfile?.language === perferLanguage?.value}
                onClick={() => {
                  if (perferLanguage) {
                    handleLanguageUpdate(perferLanguage?.value);
                  }
                }}
                className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm disabled:bg-default-gray"
              >
                {t("update-profile")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  // try {
  //   const response = await serverFetch(context, "/api/users", "GET");
  //   return {
  //     props: {
  //       users: response.success ? response.data : [],
  //       messages: (await import(`../../messages/${context.locale}.json`))
  //         .default,
  //     },
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     props: {
  //       users: [],
  //       messages: (await import(`../../messages/${context.locale}.json`))
  //         .default,
  //     },
  //   };
  // }
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
};
