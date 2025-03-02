export type OrderProps = {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  shippingId: number;
  paymentId: number;
  discountId: null | number;
  total: number;
  status: number;
  payment: number;
  shipping: number;
  discount: null | {
    code: string;
    discountType: number;
    discountValue: number;
  };
  discountPrice: number;
  tax: number;
  productPrice: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetailProps = {
  orderId: number;
  productId: number;
  title: {
    en: string;
    zh: string;
  };
  price: number;
  size: number;
  ice: number;
  sugar: number;
  quantity: number;
};
