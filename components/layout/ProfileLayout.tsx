import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import FrontLayout from "./FrontLayout";
import { IoIosSettings } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Profile");
  const { asPath } = useRouter();
  // console.log(router);
  const { isAuth, userId } = useSelector((state: RootState) => state.auth);

  const profile_links = useMemo(
    () => [
      {
        title: `${t("sub-header.settings")}`,
        href: isAuth && userId ? `/${userId}/profile` : "/",
        icon: <IoIosSettings />,
      },
      {
        title: `${t("sub-header.orders")}`,
        href: isAuth && userId ? `/${userId}/profile/orders` : "/",
        icon: <FaCartShopping />,
      },
      {
        title: `${t("sub-header.coupons")}`,
        href: isAuth && userId ? `/${userId}/profile/coupons` : "/",
        icon: <RiCoupon3Fill />,
      },
    ],
    [isAuth, userId, t]
  );

  return (
    <FrontLayout title={`${t("title")}`}>
      <header className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
        {profile_links.map(({ title, href, icon }) => {
          return (
            <Link
              href={href}
              className={`flex justify-center items-center gap-1 text-lg ${
                asPath === href
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
