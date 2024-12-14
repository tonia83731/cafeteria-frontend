import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/context/authContext";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import TopHeader from "./TopHeader";
import SideHeader from "./SideHeader";

const FrontHeader = () => {
  const t = useTranslations("Header");
  const { isAuth, handleSignout } = useAuthContext();

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
        href: isAuth ? `/profile` : "/",
        icon: <TiUser />,
        position: 1,
        isHidden: !isAuth,
      },
      {
        title: t("cart"),
        href: isAuth ? `/carts` : "/",
        icon: <FaCartShopping />,
        position: 2,
        isHidden: !isAuth,
      },
      {
        title: t("wish"),
        href: isAuth ? `/wishes` : "/",
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
    [t, isAuth]
  );

  // const handleSignout = () => {};
  return (
    <>
      <TopHeader
        isAuth={isAuth}
        navlinks={navlinks}
        onSignOut={handleSignout}
      />
      <SideHeader
        isAuth={isAuth}
        navlinks={navlinks}
        onSignOut={handleSignout}
      />
    </>
  );
};

export default FrontHeader;
