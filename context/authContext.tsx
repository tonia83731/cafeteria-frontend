import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useTranslations } from "next-intl";
import validator from "validator";
import { clientFetch } from "@/lib/fetch";
import { toast } from "react-toastify";

type UserProfileType = {
  id: number;
  name: string;
  account: string;
  email: string;
  address: string | null;
  phone: string | null;
  isAdmin: boolean;
  language: "zh" | "en";
  invoice: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProfileFormProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

interface AuthState {
  isAuth: boolean;
  userId: number | null;
  userProfile: UserProfileType | null;
  handleAuthConfirm: (user: UserProfileType) => void;
  handleSignout: () => void;
  handleProfileSubmit: (users: ProfileFormProps) => void;
  handleLanguageUpdate: (language: string) => void;
  userProfileError: {
    status: boolean;
    message: string;
  };
}

export const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const t = useTranslations("Profile");
  const { asPath, push } = router;
  const token = getCookie("authToken");
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [userProfileError, setUserProfileError] = useState({
    status: false,
    message: "",
  });

  const handleAuthConfirm = (user: UserProfileType) => {
    setIsAuth(true);
    setUserProfile(user);
  };

  const handleSignout = () => {
    deleteCookie("authToken");
    setIsAuth(false);
    setUserProfile(null);
    router.push({
      pathname: "/",
      query: { signout_success: "true" },
    });
  };

  const handleProfileSubmit = async (users: ProfileFormProps) => {
    setUserProfileError({
      status: false,
      message: "",
    });
    if (!users.name) {
      setUserProfileError({
        status: true,
        message: `${t("message.blank")}`,
      });
      return;
    }
    if (users.name.length < 3 || users.name.length > 50) {
      setUserProfileError({
        status: true,
        message: `${t("message.invalid-name")}`,
      });
      return;
    }
    // if (validator.isEmail(users.email)) {
    //   setUserProfileError({
    //     status: true,
    //     message: `${t("message.invalid-email")}`,
    //   });
    //   return;
    // }
    if (
      users.password &&
      !validator.isStrongPassword(users.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setUserProfileError({
        status: true,
        message: `${t("message.invalid-password")}`,
      });
      return;
    }

    const body = {
      name: users.name,
      ...(users.password ? { password: users.password } : {}),
      phone: users.phone,
      address: users.address,
    };

    try {
      const response = await clientFetch("/users/edit", {
        token,
        method: "PATCH",
        body,
      });

      if (response.success) {
        setUserProfile((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            name: users.name,
            phone: users.phone,
            address: users.address,
          };
        });
        toast.success(t("message.profile-update-success"));
      } else {
        toast.error(t("message.profile-update-failed"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLanguageUpdate = async (language: string) => {
    try {
      const response = await clientFetch("/users/language", {
        method: "PATCH",
        token,
        body: {
          language,
        },
      });
      if (response.success) {
        setUserProfile((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            language: language as string as "en" | "zh",
          };
        });
        push(asPath, asPath, { locale: language });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    setIsAuth(true);
    const payload = jwt.decode(token as string);
    if (payload && typeof payload !== "string") {
      setUserId(payload?.id);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const response = await clientFetch("/users", {
          token,
        });
        if (response.success) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        userId,
        userProfile,
        handleAuthConfirm,
        handleSignout,
        handleProfileSubmit,
        handleLanguageUpdate,
        userProfileError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
