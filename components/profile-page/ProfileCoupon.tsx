import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { CouponProps } from "@/types/coupon-type";
import { LangOptionType } from "@/types/custom-type";

const ProfileCoupon = ({
  title,
  description,
  code,
  startDate,
  endDate,
}: CouponProps) => {
  const { locale } = useRouter();
  const t = useTranslations("Profile");
  const [isCopy, setIsCopy] = useState(false);
  const end_date = dayjs(endDate).format("YYYY-MM-DD");
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
    <div className="w-full h-[175px] bg-ivory px-4 py-2 rounded-lg flex flex-col justify-center gap-6 relative coupon">
      <div className="grid grid-cols-[2.5rem_1fr] gap-4">
        <div className="bg-natural text-white flex justify-center items-center w-10 h-10 rounded-full text-2xl">
          <PiCoffeeBeanFill />
        </div>
        <div className="">
          <div className="">
            <h5 className="font-bold text-lg">
              {title[locale as string as LangOptionType]}
            </h5>
          </div>
          <p className="text-sm text-natural md:line-clamp-2">
            {description[locale as string as LangOptionType]}
          </p>
          <p className="text-sm text-natural">
            {t("due")}: {end_date}
          </p>
        </div>
      </div>
      <div className="border border-moss-60 py-1 px-4 rounded-lg flex justify-between items-center gap-2">
        <div className="text-base">{code}</div>
        <button
          disabled={
            new Date(startDate) > new Date() || new Date(endDate) < new Date()
          }
          onClick={handleCopyCode}
          className="border bg-apricot text-white rounded-lg px-2 py-0.5 disabled:bg-default-gray"
        >
          {isCopy ? t("button.copied") : t("button.copy")}
        </button>
      </div>
    </div>
  );
};

export default ProfileCoupon;
