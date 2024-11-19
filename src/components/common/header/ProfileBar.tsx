"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile_link } from "@/data/profile-subheader";
const ProfileBar = () => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid md:grid-cols-3 md:grid-rows-1">
      {profile_link.map(({ title, href, icon }) => {
        return (
          <Link
            href={href}
            key={`profile-${title}`}
            className={`flex justify-center items-center gap-2 bg-natural-30 rounded-lg py-4 text-lg md:text-xl ${
              pathname === href ? "font-medium border-[1.5px] border-fern" : ""
            }`}
          >
            <div>{icon}</div>
            <div>{title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileBar;
