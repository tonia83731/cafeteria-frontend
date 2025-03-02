import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserInput, updatedInputError } from "@/slices/authSlice";

import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileForm from "@/components/profile-page/ProfileForm";

import { language_options } from "@/data/language-options";
import { UserInputProps, UserProps } from "@/types/user-auth.type";
import { authFetch } from "@/lib/server-fetch";
import ProfileLanguage from "@/components/profile-page/ProfileLanguage";
import ProfileInvoice from "@/components/profile-page/ProfileInvoice";
import validator from "validator";
import { clientFetch } from "@/lib/client-fetch";
import { toast } from "react-toastify";

const ProfilePage = ({ user }: { user: UserProps }) => {
  const t = useTranslations("Profile");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { locale, push, asPath, query } = useRouter();
  const { account } = query;
  const dispatch = useDispatch();
  const { userInput, isError } = useSelector((state: RootState) => state.auth);

  const handleInputError = (inputValue: UserInputProps) => {
    const { name, email, password, invoice } = inputValue;

    const invoice_regex = /^\/[0-9A-Z.\-+]{7}$/;

    let error = {
      status: false,
      message: "",
    };
    switch (true) {
      case !name || !email:
        error = {
          status: true,
          message: `${t("message.blank")}`,
        };
        break;
      case name.length < 3 || name.length > 50:
        error = {
          status: true,
          message: `${t("message.invalid-name")}`,
        };
        break;
      case !validator.isEmail(email):
        error = {
          status: true,
          message: `${t("message.invalid-email")}`,
        };
        break;
      case password &&
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }):
        error = {
          status: true,
          message: `${t("message.invalid-password")}`,
        };
        break;
      case invoice && !invoice_regex.test(invoice):
        error = {
          status: true,
          message: `${t("message.invalid-invoice")}`,
        };
      default:
        error = {
          status: false,
          message: "",
        };
        break;
    }
    dispatch(updatedInputError({ error }));
    return error.status;
  };

  const handleProfileUpdated = async () => {
    if (handleInputError(userInput)) {
      return;
    }

    const { name, password, email, address, phone, invoice, language } =
      userInput;

    const body = {
      name,
      ...(password ? { password } : {}),
      email,
      ...(address ? { address } : {}),
      ...(phone ? { phone } : {}),
      ...(invoice ? { invoice } : {}),
      language: language.value,
    };

    const isLaugageUpdated = language.value !== user.language;

    try {
      const response = await clientFetch(
        `/users/${account}/user-profile-edit`,
        "PUT",
        true,
        body
      );
      if (!response?.success) {
        toast.error(`${t("message.profile-update-failed")}`);
        return;
      }

      toast.success(`${t("message.profile-update-success")}`);
      if (isLaugageUpdated) {
        push(asPath, asPath, { locale: language.value });
      }
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
      phone: user.phone ?? "",
      address: user.address ?? "",
      language,
      invoice: user.invoice ?? "",
    };
    dispatch(getUserInput({ inputValue: user_value }));
  }, [user]);

  useEffect(() => {
    const { name, email, password, phone, address, language, invoice } =
      userInput;

    if (
      name === user.name &&
      email === user.email &&
      password === user.password &&
      phone === user.phone &&
      address === user.address &&
      invoice === user.invoice &&
      language.value === user.language
    ) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [userInput]);
  return (
    <ProfileLayout>
      {isError.status && (
        <p className="text-heart text-sm">{isError.message}</p>
      )}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[2fr_1fr]">
        <ProfileForm />
        <div className="flex flex-col gap-4 md:justify-between">
          <div className="flex flex-col gap-4">
            <ProfileLanguage />
            <ProfileInvoice />
          </div>
          <button
            disabled={isBtnDisabled}
            onClick={handleProfileUpdated}
            className="w-full py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm disabled:bg-default-gray"
          >
            {t("update-profile")}
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { account } = context.query;

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

    const response = await authFetch(
      context,
      `/users/${account}/user-profile`,
      "GET"
    );

    if (!response.success) {
      return {
        props: {
          user: null,
          account,
          messages: (await import(`../../../messages/${context.locale}.json`))
            .default,
        },
      };
    }

    const res = response.data;
    const user = {
      ...res,
      phone: res.phone ? res.phone : "",
      address: res.address ? res.address : "",
      invoice: res.invoice ? res.invoice : "",
      password: res.password ? res.password : "",
    };

    return {
      props: {
        user,
        account,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        user: null,
        account,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
