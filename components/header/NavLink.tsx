import Link from "next/link";
import { useRouter } from "next/router";
import { NavLinkProps } from "./FrontHeader";

export const isLinkActive = (pathname: string, href: string) => {
  return pathname === href || pathname.includes(href);
};

const NavLink = ({ title, href, icon }: NavLinkProps) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={href as string}
      className={`flex items-center gap-2 px-4 py-2 ${
        isLinkActive(pathname, href as string) && "bg-natural"
      }`}
    >
      <div
        className={`${
          isLinkActive(pathname, href as string)
            ? "bg-ivory text-natural"
            : "bg-natural text-ivory"
        } w-6 h-6 rounded-full flex justify-center items-center text-lg`}
      >
        {icon}
      </div>
      <div
        className={`${
          isLinkActive(pathname, href as string) ? "text-ivory" : "text-natural"
        } md:hidden ${
          pathname !== "/signin" &&
          pathname !== "/signup" &&
          pathname !== "/" &&
          "lg:block"
        }`}
      >
        {title}
      </div>
    </Link>
  );
};

export default NavLink;
