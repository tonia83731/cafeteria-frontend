import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { MultiLangProps } from "@/types/default";
import { PiCoffeeBeanFill } from "react-icons/pi";

type CouponProps = {
  //   id: number;
  title: MultiLangProps;
  description: MultiLangProps;
  code: string;
  startDate: string;
  endDate: string;
  //   discountType: string;
  //   discountValue: string;
  //   isPublished: boolean;
};

const ProfileCoupon = ({
  //   id,
  title,
  description,
  code,
  startDate,
  endDate,
}: CouponProps) => {
  const { locale } = useRouter();
  const t = useTranslations("Profile");
  const [isCopy, setIsCopy] = useState(false);
  //   const start_date = dayjs(startDate).format("YYYY-MM-DD");
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
          <h5 className="font-bold text-lg">
            {title[locale as string as "zh" | "en"]}
          </h5>
          <p className="text-sm text-natural md:line-clamp-2">
            {description[locale as string as "zh" | "en"]}
          </p>
          <p className="text-sm text-natural">
            {t("due")}: {end_date}
          </p>
        </div>
      </div>
      <div className="border border-moss-60 py-1 px-4 rounded-lg flex justify-between items-center gap-2">
        <div className="text-base">{code}</div>
        <button
          disabled={new Date(startDate) > new Date()}
          onClick={handleCopyCode}
          className="border bg-apricot text-white rounded-lg px-2 py-0.5"
        >
          {isCopy ? t("button.copied") : t("button.copy")}
        </button>
      </div>
    </div>
  );
};

export default ProfileCoupon;
