import { serverFetch } from "@/lib/fetch";
import { GetServerSideProps } from "next";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileCoupon from "@/components/profile-page/ProfileCoupon";

const ProfileCouponsPage = ({ coupons }: { coupons: any }) => {
  return (
    <ProfileLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {coupons.map((coupon: any) => {
          return <ProfileCoupon {...coupon} key={coupon.id} />;
        })}
      </div>
    </ProfileLayout>
  );
};

export default ProfileCouponsPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await serverFetch(context, "/api/discounts", "GET");
    return {
      props: {
        coupons: response.success ? response.data : [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coupons: [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
