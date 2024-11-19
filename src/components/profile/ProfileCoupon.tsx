"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { PiCoffeeBeanFill } from "react-icons/pi";
type CouponProps = {
  id: number;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  code: string;
  startDate: Date;
  endDate: Date;
};

const ProfileCoupon = ({
  // id,
  title,
  description,
  code,
  // startDate,
  endDate,
}: CouponProps) => {
  const [isCopy, setIsCopy] = useState(false);
  //   const start_date = dayjs(startDate).format("YYYY-MM-DD");
  const end_date = dayjs(endDate).format("YYYY-MM-DD");
  //   console.log(start_date, end_date);
  //   https://codepen.io/NikhilBobade/pen/yLgKKGg
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };
  return (
    <div className="w-full h-[175px] bg-white px-4 py-2 rounded-lg flex flex-col justify-center gap-6 relative coupon shadow-inner">
      <div className="grid grid-cols-[2.5rem_1fr] gap-4">
        <div className="bg-natural text-white flex justify-center items-center w-10 h-10 rounded-full text-2xl">
          <PiCoffeeBeanFill />
        </div>
        <div className="">
          <h5 className="font-bold text-lg">{title.en}</h5>
          <p className="text-sm text-natural md:line-clamp-2">
            {description.en}
          </p>
          <p className="text-sm text-natural">Due Date: {end_date}</p>
        </div>
      </div>
      <div className="border border-moss-60 py-1 px-4 rounded-lg flex justify-between items-center gap-2">
        <div className="text-base">{code}</div>
        <button
          onClick={handleCopyCode}
          className="border bg-apricot text-white rounded-lg px-2 py-0.5"
        >
          {isCopy ? "COPIED" : "COPY"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCoupon;
