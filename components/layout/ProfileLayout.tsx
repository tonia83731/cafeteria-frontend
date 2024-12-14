import { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import FrontLayout from "./FrontLayout";
import { IoIosSettings } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";
import { useRouter } from "next/router";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Profile");
  const { pathname } = useRouter();

  const profile_links = [
    {
      title: `${t("sub-header.settings")}`,
      href: `/profile`,
      icon: <IoIosSettings />,
    },
    {
      title: `${t("sub-header.orders")}`,
      href: `/profile/orders`,
      icon: <FaCartShopping />,
    },
    {
      title: `${t("sub-header.coupons")}`,
      href: `/profile/coupons`,
      icon: <RiCoupon3Fill />,
    },
  ];
  return (
    <FrontLayout title={`${t("title")}`}>
      <header className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
        {profile_links.map(({ title, href, icon }) => {
          return (
            <Link
              href={href}
              className={`flex justify-center items-center gap-1 text-lg ${
                pathname === href
                  ? "bg-natural text-white shadow-md"
                  : "bg-natural-30 text-fern"
              } px-2 py-4 rounded-lg`}
              key={title}
            >
              <div>{icon}</div>
              <div>{title}</div>
            </Link>
          );
        })}
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </FrontLayout>
  );
};

export default ProfileLayout;
