"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";

const StaffHeader = () => {
  const pathname = usePathname();
  const dashboard_nav = [
    {
      id: "products",
      title: "產品列表",
      href: "/staff/dashboard/products",
    },
    {
      id: "orders",
      title: "訂單列表",
      href: "/staff/dashboard/orders",
    },
    {
      id: "coupons",
      title: "優惠券列表",
      href: "/staff/dashboard/coupons",
    },
  ];
  return (
    <header className="fixed top-0 left-0 bg-fern text-ivory w-full h-[75px] leading-[75px]">
      <div className="w-11/12 h-full mx-auto flex justify-between items-center">
        <Link
          href="/staff/dashboard/products"
          className="text-2xl flex items-center gap-1.5"
        >
          <PiCoffeeBeanFill />
          <h1 className="hidden lg:block font-italiana">THE CAFE | STAFF</h1>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="flex items-center gap-2 md:gap-4 md:text-lg">
            {dashboard_nav.map(({ title, href }) => {
              return (
                <Link
                  key={title}
                  href={href}
                  className={
                    pathname === href
                      ? "font-bold underline underline-offset-2"
                      : ""
                  }
                >
                  {title}
                </Link>
              );
            })}
          </nav>
          <button className="text-lg md:text-2xl">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
