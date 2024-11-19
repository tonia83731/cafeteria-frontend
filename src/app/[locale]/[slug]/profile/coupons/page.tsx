import { coupon_dummy } from "@/dummy/coupon_dummy";
import ProfileCoupon from "@/components/profile/ProfileCoupon";
const CouponPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {coupon_dummy.map((coupon) => {
        return <ProfileCoupon {...coupon} key={coupon.id} />;
      })}
    </div>
  );
};

export default CouponPage;
