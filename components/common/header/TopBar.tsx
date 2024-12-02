"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { getCookie, deleteCookie } from "cookies-next";

// import LangaugeSwitch from "./LanguageIcon";

import { IoIosMore } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import { PiCoffeeBeanFill } from "react-icons/pi";
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineInfo } from "react-icons/ai";
import { TiUser } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
// import { AiOutlineGlobal } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageSwitch from "./LanguageSwtich";

export const logoLink = () => {
  return {
    title: "THE CAFE",
    href: `/`,
    icon: <PiCoffeeBeanFill />,
  };
};

export const navLink = (
  isAuth: boolean,
  t: (key: string) => string,
  slug: string
) => {
  return [
    {
      title: t("menu"),
      href: `/menu`,
      icon: <MdRestaurantMenu />,
      position: 1,
      // isHidden: false,
    },
    {
      title: t("about"),
      href: `/about`,
      icon: <AiOutlineInfo />,
      position: 1,
      // isHidden: false,
    },
    {
      title: t("profile"),
      href: `/${slug}/profile`,
      icon: <TiUser />,
      position: 1,
      // isHidden: !isAuth,
    },
    {
      title: t("cart"),
      href: `/${slug}/cart`,
      icon: <FaCartShopping />,
      position: 2,
      // isHidden: !isAuth,
    },
    {
      title: t("wish"),
      href: `/${slug}/wish`,
      icon: <FaHeart />,
      position: 2,
      // isHidden: !isAuth,
    },
    {
      title: isAuth ? t("signout") : t("signin"),
      href: isAuth ? "#" : `/auth/signin`,
      icon: isAuth ? <FaSignOutAlt /> : <FaSignInAlt />,
      position: 2,
      // isHidden: false,
    },
  ];
};

export const isLinkActive = (pathname: string, href: string) => {
  return pathname === href;
};

const TopBar = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const authToken = getCookie("authToken");
  const isAuth = !!authToken;

  const slug = "123";

  const [isChecked, setIsChecked] = useState(false);
  const logo = logoLink();
  const navbar = navLink(isAuth, t, slug);

  const more = {
    title: t("more"),
    href: "#",
    icon: isChecked ? <RxCross2 /> : <IoIosMore />,
  };

  const handleSignout = () => {
    deleteCookie("authToken");
    router.push(`/`);
  };
  return (
    <header className="w-full h-full relative">
      <nav className="fixed top-0 left-0 right-0 z-[90] w-full h-[75px] leading-[75px] bg-ivory text-natural font-italiana text-xl">
        <div className="px-4 h-full mx-auto flex justify-between items-center">
          <Link
            href={logo.href}
            className="text-2xl sm:text-3xl flex items-center gap-1.5"
          >
            <div className="">{logo.icon}</div>
            <div className="">{logo.title}</div>
          </Link>
          <input
            type="checkbox"
            className="hidden"
            id="more-nav"
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <div className="flex gap-2">
            <label
              title={more.title}
              htmlFor="more-nav"
              className="bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
            >
              {more.icon}
            </label>
            {/* <LangaugeSwitch /> */}
            <div>
              {isAuth ? (
                <button
                  onClick={handleSignout}
                  title="SignOut"
                  className="bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center"
                >
                  <FaSignOutAlt />
                </button>
              ) : (
                <Link
                  title="SignIn"
                  href={`/auth/signin`}
                  className="bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center text-base"
                >
                  <FaSignInAlt />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 ${
          isChecked ? "left-0" : "-left-full"
        } z-[100] w-1/2 min-w-[194px] h-screen flex flex-col gap-4 bg-ivory text-natural font-italiana text-xl shadow-md`}
      >
        <div className="w-full h-[75px] leading-[75px]">
          <Link
            href={logo.href}
            className="h-full px-4 text-2xl sm:text-3xl flex items-center gap-1.5"
          >
            <div className="bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center text-lg">
              {logo.icon}
            </div>
            <div className="">{logo.title}</div>
          </Link>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col">
            {navbar.map((nav, index) => {
              // if (nav.position === 2 || nav.isHidden) return;
              if (nav.position === 2) return;
              return (
                <Link
                  href={
                    nav.href.includes("profile")
                      ? `${nav.href}/settings`
                      : `${nav.href}`
                  }
                  key={`nav-${index}`}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    isLinkActive(pathname, nav.href) && "bg-natural"
                  }`}
                >
                  <div
                    className={`${
                      isLinkActive(pathname, nav.href)
                        ? "bg-ivory text-natural"
                        : "bg-natural text-ivory"
                    } w-6 h-6 rounded-full flex justify-center items-center text-lg`}
                  >
                    {nav.icon}
                  </div>
                  <div
                    className={
                      isLinkActive(pathname, nav.href)
                        ? "text-ivory"
                        : "text-natural"
                    }
                  >
                    {nav.title}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col">
            {navbar.map((nav, index) => {
              // if (nav.position === 1 || nav.isHidden) return;
              if (nav.position === 1) return;
              if (nav.href === "#") {
                return (
                  <button
                    onClick={handleSignout}
                    className="flex items-center gap-2 px-4 py-2"
                    key={`nav-${index}`}
                  >
                    <div
                      className={`bg-natural text-ivory hover:bg-ivory hover:text-natural w-6 h-6 rounded-full flex justify-center items-center text-lg`}
                    >
                      {nav.icon}
                    </div>
                    <div className="text-natural hover:text-ivory">
                      {nav.title}
                    </div>
                  </button>
                );
              }
              return (
                <Link
                  href={nav.href}
                  key={`nav-${index}`}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    isLinkActive(pathname, nav.href) && "bg-natural"
                  }`}
                >
                  <div
                    className={`${
                      isLinkActive(pathname, nav.href)
                        ? "bg-ivory text-natural"
                        : "bg-natural text-ivory"
                    } w-6 h-6 rounded-full flex justify-center items-center text-lg`}
                  >
                    {nav.icon}
                  </div>
                  <div
                    className={
                      isLinkActive(pathname, nav.href)
                        ? "text-ivory"
                        : "text-natural"
                    }
                  >
                    {nav.title}
                  </div>
                </Link>
              );
            })}

            <LanguageSwitch />

            {/* <button
              onClick={handleLanguageSwitch}
              className="flex items-center gap-2 px-4 py-2"

            >
              <div
                className={`bg-natural text-ivory hover:bg-ivory hover:text-natural w-6 h-6 rounded-full flex justify-center items-center text-lg`}
              >
                {nav.icon}
              </div>
              <div className="text-natural hover:text-ivory">{nav.title}</div>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
