import { MultiLangProps } from "./default-input";

export type CouponProps = {
  id: number;
  userId: number;
  couponId: number;
  isApplied: boolean;
  code: string;
  title: MultiLangProps;
  description: MultiLangProps;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
