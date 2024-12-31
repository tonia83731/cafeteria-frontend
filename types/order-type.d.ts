import { MultiLangProps } from "./default-input";

export type OrderProps = {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  shippingId: number;
  paymentId: number;
  discountId: null | number;
  totalPrice: number;
  status: string;
  payment: MultiLangProps;
  shipping: {
    title: MultiLangProps;
    price: number;
  };
  discount: null | {
    code: string;
    discountType: string;
    discountValue: string;
  };
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetailProps = {
  product: MultiLangProps;
  size: MultiLangProps;
  ice: MultiLangProps;
  sugar: MultiLangProps;
  quantity: number;
  orderId: number;
  price: number;
};
