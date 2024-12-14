import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LogoLink from "./LogoLink";
import LanguageLink from "./LanguageLink";
import NavButton from "./NavButton";
import NavLink from "./NavLink";
import { RxCross2 } from "react-icons/rx";
import { IoIosMore } from "react-icons/io";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { HeaderProps } from "@/types/header";

const TopHeader = ({ isAuth, navlinks, onSignOut }: HeaderProps) => {
  const t = useTranslations("Header");
  const [isToggle, setIsToggle] = useState(false);
  return (
    <header className="fixed top-0 left-0 bg-ivory text-natural w-full z-[999] md:hidden">
      <div className="relative md:hidden">
        {/* mobile version */}
        <div className="w-full h-[75px] leading-[75px] px-4 flex justify-between items-center">
          <LogoLink />
          <div className="flex justify-center items-center gap-2">
            <button
              className="bg-natural text-ivory w-6 h-6 rounded-full flex justify-center items-center"
              onClick={() => setIsToggle(!isToggle)}
              title={t("more")}
            >
              {isToggle ? <RxCross2 /> : <IoIosMore />}
            </button>
            <LanguageLink />
            <div>
              {isAuth ? (
                <button
                  onClick={onSignOut}
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
        <nav
          className={`absolute top-0 ${
            isToggle ? "left-0 drop-shadow-lg" : "-left-full"
          } flex flex-col justify-between h-full min-h-screen w-[200px] bg-ivory pb-4`}
        >
          <div className="flex flex-col gap-4">
            <div className="px-4">
              <LogoLink />
            </div>
            <div className="">
              {navlinks.map((nav) => {
                if (nav.isHidden || nav.position > 1) return;
                return <NavLink {...nav} key={nav.title} />;
              })}
            </div>
          </div>
          <div className="">
            {navlinks.map((nav) => {
              if (nav.isHidden || nav.position < 2) return;
              if (nav.href === "#")
                return (
                  <NavButton
                    {...nav}
                    key={nav.title}
                    onButtonClick={onSignOut}
                  />
                );
              return <NavLink {...nav} key={nav.title} />;
            })}
            <div className="hidden md:block">
              <LanguageLink />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopHeader;
