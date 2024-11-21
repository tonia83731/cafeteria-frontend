import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IoIosSettings } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";
import { ReactNode } from "react";

const ProfileLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params;
}) => {
  const t = useTranslations("Profile");
  const slug = "123";
  // console.log(params);
  const profile_link = [
    {
      title: "Settings",
      href: `/${params.locale}/${slug}/profile/settings`,
      icon: <IoIosSettings />,
    },
    {
      title: "Orders",
      href: `/${params.locale}/${slug}/profile/orders`,
      icon: <FaCartShopping />,
    },
    {
      title: "Coupons",
      href: `/${params.locale}/${slug}/profile/coupons`,
      icon: <RiCoupon3Fill />,
    },
  ];
  return (
    <FrontTitleLayout title={t("title")}>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
        {profile_link.map(({ title, href, icon }) => {
          return (
            <Link
              href={href}
              key={title}
              className={`flex justify-center items-center gap-1 text-lg bg-natural-30 px-2 py-4 rounded-lg`}
            >
              <div className="">{icon}</div>
              <div className="">{title}</div>
            </Link>
          );
        })}
      </div>
      {children}
    </FrontTitleLayout>
  );
};

export default ProfileLayout;
