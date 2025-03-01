export type CouponProps = {
  id: number;
  userId: number;
  couponId: number;
  isApplied: boolean;
  code: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  discountType: number;
  discountValue: number;
  endDate: number;
  createdAt: string;
  updatedAt: string;
};
