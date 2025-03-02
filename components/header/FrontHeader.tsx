import { ReactNode, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedAuthStatus, userSignOut } from "@/slices/authSlice";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import TopHeader from "./TopHeader";
import SideHeader from "./SideHeader";
import { getQtyCount } from "@/slices/orderSlice";
import { clientFetch } from "@/lib/client-fetch";

export type NavLinkProps = {
  title: string;
  href?: string;
  icon: ReactNode;
};

export type NavLinksType = {
  title: string;
  href: string;
  icon: ReactNode;
  position: number;
  isHidden: boolean;
};

export type HeaderProps = {
  isAuth?: boolean;
  navlinks: NavLinksType[];
  onSignOut: () => void;
};

const FrontHeader = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { isAuth, userAccount } = useSelector((state: RootState) => state.auth);
  const { cartTotalQty } = useSelector((state: RootState) => state.order);
  const handleSignOut = () => {
    dispatch(userSignOut());
    dispatch(
      updatedAuthStatus({
        isAuth: false,
        user: {
          id: null,
          account: null,
          language: "zh",
        },
      })
    );
    router.push({
      pathname: "/",
      query: { signout_success: "true" },
    });
  };

  const navlinks = useMemo(
    () => [
      {
        title: t("menu"),
        href: `/menu`,
        icon: <MdRestaurantMenu />,
        position: 1,
        isHidden: false,
      },
      {
        title: t("about"),
        href: `/about`,
        icon: <AiOutlineInfo />,
        position: 1,
        isHidden: false,
      },
      {
        title: t("profile"),
        href: isAuth && userAccount ? `/${userAccount}/profile` : "/",
        icon: <TiUser />,
        position: 1,
        isHidden: !isAuth,
      },
      {
        title: `${t("cart")} *${cartTotalQty}`,
        href: isAuth && userAccount ? `/${userAccount}/carts` : "/",
        icon: <FaCartShopping />,
        position: 2,
        isHidden: !isAuth,
      },
      {
        title: t("wish"),
        href: isAuth && userAccount ? `/${userAccount}/wishes` : "/",
        icon: <FaHeart />,
        position: 2,
        isHidden: !isAuth,
      },
      {
        title: isAuth ? t("signout") : t("signin"),
        href: isAuth ? "#" : `/signin`,
        icon: isAuth ? <FaSignOutAlt /> : <FaSignInAlt />,
        position: 2,
        isHidden: false,
      },
    ],
    [t, isAuth, userAccount, cartTotalQty]
  );

  useEffect(() => {
    if (router.pathname === "/about") return;
    if (!token) return;

    const checkedAuth = async () => {
      try {
        const response = await clientFetch("/users/checked-auth", "GET", true);

        if (!response) {
          dispatch(
            updatedAuthStatus({
              isAuth: false,
              user: {
                id: null,
                account: null,
                language: "zh",
              },
            })
          );
          if (router.pathname === "/menut") return;
          router.push("/");
          return;
        }
        const { isAuth, user, cartQty } = response;
        dispatch(updatedAuthStatus({ isAuth, user }));
        dispatch(getQtyCount({ count: cartQty }));
      } catch (error) {
        console.log(error);
      }
    };
    checkedAuth();
  }, [token, router]);

  return (
    <>
      <TopHeader
        isAuth={isAuth}
        navlinks={navlinks}
        onSignOut={handleSignOut}
      />
      <SideHeader
        isAuth={isAuth}
        navlinks={navlinks}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default FrontHeader;
