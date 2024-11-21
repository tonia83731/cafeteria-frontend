"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { logoLink, navLink, isLinkActive } from "./TopBar";
// import LocaleSwitcher from "../LocaleSwitcher";
const SideBar = () => {
  const t = useTranslations("Header");
  const authToken = getCookie("authToken");
  const isAuth = !!authToken;
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const slug = "123";
  const logo = logoLink();
  const navbar = navLink(isAuth, t, slug);

  const handleSignout = () => {
    deleteCookie("authToken");
    router.push(`/`);
  };
  return (
    <div
      className={`fixed top-0 left-0 z-[100] md:w-1/2 md:max-w-[60px] ${
        pathname !== `/` && "lg:w-1/3 lg:max-w-[240px]"
      } h-screen bg-ivory text-natural font-italiana text-xl`}
    >
      <nav className="h-screen">
        <Link
          href={logo.href}
          className="w-full h-[75px] leading-[75px] px-4 text-3xl flex items-center gap-1.5"
        >
          <div className="text-natural flex justify-center items-center text-3xl">
            {logo.icon}
          </div>
          <div className={`hidden ${pathname !== `/` && "lg:block"}`}>
            {logo.title}
          </div>
        </Link>
        <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-between">
          <div className="flex flex-col">
            {navbar.map((nav, index) => {
              if (nav.position === 2 || nav.isHidden) return;
              return (
                <Link
                  href={
                    nav.href.includes("profile")
                      ? `${nav.href}/settings`
                      : `${nav.href}`
                  }
                  title={nav.title}
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
                    className={`md:hidden ${pathname !== `/` && "lg:block"} ${
                      isLinkActive(pathname, nav.href)
                        ? "text-ivory"
                        : "text-natural"
                    }`}
                  >
                    {nav.title}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col">
            {/* <LocaleSwitcher /> */}
            {navbar.map((nav, index) => {
              if (nav.position === 1 || nav.isHidden) return;
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
                    <div
                      className={`md:hidden ${
                        pathname !== `/` && "lg:block"
                      } text-natural hover:text-ivory`}
                    >
                      {nav.title}
                    </div>
                  </button>
                );
              }
              return (
                <Link
                  href={nav.href}
                  title={nav.title}
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
                    className={`md:hidden ${pathname !== `/` && "lg:block"} ${
                      isLinkActive(pathname, nav.href)
                        ? "text-ivory"
                        : "text-natural"
                    }`}
                  >
                    {nav.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
