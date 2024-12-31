import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Select from "react-select";
import { useRouter } from "next/router";
import { authFetch, clientFetch } from "@/lib/fetch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedInputChange, getUserInput } from "@/slices/authSlice";

import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileForm from "@/components/profile-page/ProfileForm";

import { language_options } from "@/data/language_options";
import { UserProps } from "@/types/user-auth.type";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const ProfilePage = ({
  user,
  user_id,
}: {
  user: UserProps;
  user_id: number | undefined;
}) => {
  const t = useTranslations("Profile");
  const token = getCookie("authToken");
  const { locale, push, asPath } = useRouter();
  const dispatch = useDispatch();
  const { userInput } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "userInput", name, value }));
  };

  const handleLanguageUpdate = async () => {
    try {
      const response = await clientFetch(`/users/${user_id}/language`, {
        method: "PATCH",
        token,
        body: {
          language: userInput.language.value,
        },
      });
      if (!response.success) {
        toast.error(t("message.profile-update-failed"));
        return;
      }
      push(asPath, asPath, { locale: userInput.language.value });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const language = language_options.find((lang) => {
      if (userInput) {
        return lang.value === user?.language;
      } else {
        return lang.value === locale;
      }
    });

    const user_value = {
      name: user.name,
      account: user.account,
      password: "",
      email: user.email,
      phone: user.phone,
      address: user.address,
      language,
      invoice: "",
    };
    dispatch(getUserInput({ inputValue: user_value }));
  }, [user]);

  return (
    <ProfileLayout>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[2fr_1fr]">
        <ProfileForm />
        <div className="h-fit border border-apricot rounded-lg p-4 flex flex-col gap-4">
          <h5 className="font-medium uppercase text-lg">{t("language")}</h5>
          <div className="flex flex-col gap-4">
            <Select
              options={language_options}
              defaultValue={userInput.language}
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
              onChange={(newValue) => {
                handleInputChange("language", newValue);
              }}
            />
            <div className="w-full flex justify-end">
              <button
                disabled={user?.language === userInput.language?.value}
                onClick={handleLanguageUpdate}
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
  const { user_id } = context.query;

  try {
    const authChecked = await authFetch(context, `/users/checked-auth`, "GET");

    if (!authChecked.isAuth) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const response = await authFetch(context, `/users/${user_id}`, "GET");

    if (!response.success) {
      return {
        props: {
          user: null,
          user_id,
          messages: (await import(`../../../messages/${context.locale}.json`))
            .default,
        },
      };
    }

    return {
      props: {
        user: response.data,
        user_id,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        user: null,
        user_id,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
