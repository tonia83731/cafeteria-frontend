import { IoIosSettings } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";

export const profile_link = [
  {
    title: "Settings",
    href: "/profile/settings",
    icon: <IoIosSettings />,
  },
  {
    title: "Orders",
    href: "/profile/orders",
    icon: <FaCartShopping />,
  },
  {
    title: "Coupons",
    href: "/profile/coupons",
    icon: <RiCoupon3Fill />,
  },
];
