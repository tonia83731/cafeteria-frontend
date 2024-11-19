// import { useTranslations } from "next-intl";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

export const logo = {
  title: "THE CAFE",
  href: "/",
  icon: <PiCoffeeBeanFill />,
};

export const navLink = (
  isAuth: boolean,
  t: (key: string) => string,
  locale: string
) => {
  return [
    {
      title: t("menu"),
      href: `${locale}/menu`,
      icon: <MdRestaurantMenu />,
      position: 1,
    },
    {
      title: t("about"),
      href: "/about",
      icon: <AiOutlineInfo />,
      position: 1,
    },
    {
      title: t("profile"),
      href: "/profile/settings",
      icon: <TiUser />,
      position: 1,
    },
    {
      title: t("cart"),
      href: "/cart",
      icon: <FaCartShopping />,
      position: 2,
    },
    {
      title: t("wish"),
      href: "/wish",
      icon: <FaHeart />,
      position: 2,
    },
    {
      title: isAuth ? t("signOut") : t("signIn"),
      href: isAuth ? "#" : "/auth/signin",
      icon: isAuth ? <FaSignOutAlt /> : <FaSignInAlt />,
      position: 2,
    },
  ];
};
