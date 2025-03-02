import { GetServerSideProps } from "next";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileCoupon from "@/components/profile-page/ProfileCoupon";
import { CouponProps } from "@/types/coupon-type";
import { authFetch } from "@/lib/server-fetch";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

export type FormatedCouponType = {
  id: number;
  couponId: number;
  isApplied: boolean;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  code: string;
  discountType: number;
  discountValue: number;
  endDate: string;
};

const ProfileCouponsPage = ({
  coupons,
}: {
  coupons: {
    id: number;
    couponId: number;
    Coupon: CouponProps;
    userId: string;
    isApplied: false;
    createdAt: string;
    updatedAt: string;
  }[];
}) => {
  const t = useTranslations("Profile");
  const [couponDatas, setCouponDatas] = useState<FormatedCouponType[]>([]);

  useEffect(() => {
    if (coupons.length === 0) return;

    const formatedCoupons = coupons.map(
      ({ id, couponId, isApplied, Coupon }) => {
        const {
          title,
          title_en,
          description,
          description_en,
          code,
          discountType,
          discountValue,
          endDate,
        } = Coupon;

        return {
          id,
          couponId,
          isApplied,
          title,
          title_en,
          description,
          description_en,
          code,
          discountType,
          discountValue,
          endDate: dayjs(endDate * 1000).format("YYYY-MM-DD"),
        };
      }
    );

    setCouponDatas(formatedCoupons);
  }, [coupons]);
  return (
    <ProfileLayout>
      {couponDatas.length <= 0 ? (
        <div className="w-full text-fern-60">{t("no-coupon-item")}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {couponDatas.map((coupon: FormatedCouponType) => {
            return <ProfileCoupon {...coupon} key={coupon.id} />;
          })}
        </div>
      )}
    </ProfileLayout>
  );
};

export default ProfileCouponsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { account } = context.query;
  try {
    const authChecked = await authFetch(context, `/users/checked-auth`, "GET");

    if (!authChecked.isAuth) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const response = await authFetch(context, `/discounts/${account}`, "GET");
    return {
      props: {
        coupons: response.success ? response.data : [],
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coupons: [],
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
