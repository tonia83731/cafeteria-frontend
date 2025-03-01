import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { PiCoffeeBeanFill } from "react-icons/pi";
import { FormatedCouponType } from "@/pages/[account]/profile/coupons";

const ProfileCoupon = ({
  title,
  title_en,
  description,
  description_en,
  code,
  endDate,
}: FormatedCouponType) => {
  const { locale } = useRouter();
  const t = useTranslations("Profile");
  const [isCopy, setIsCopy] = useState(false);
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
              {locale === "en" ? title_en : title}
            </h5>
          </div>
          <p className="text-sm text-natural md:line-clamp-2">
            {locale === "en" ? description_en : description}
          </p>
          <p className="text-sm text-natural">
            {t("due")}: {endDate}
          </p>
        </div>
      </div>
      <div className="border border-moss-60 py-1 px-4 rounded-lg flex justify-between items-center gap-2">
        <div className="text-base">{code}</div>
        <button
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
