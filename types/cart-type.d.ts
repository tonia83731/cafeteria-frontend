import { MultiLangProps } from "./default";
export type CartItemProps = {
  id: number;
  cartId: number;
  productId: number;
  product: {
    id: number;
    title: MultiLangProps;
    image: string;
    price: number;
  };
  size: {
    title: MultiLangProps;
    price: number;
  } | null;
  sizeId: number | null;
  ice: {
    zh: string;
    en: string;
  } | null;
  iceId: number | null;
  sugar: MultiLangProps | null;
  sugarId: number | null;
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
};
export type PaymentProps = {
  id: number;
  title: MultiLangProps;
  createdAt: string;
  updatedAt: string;
};
type ShippingProps = PaymentProps & {
  price: number;
};

interface CartPageData {
  total: number;
  cartItems: CartItemProps[];
  shippings: ShippingProps[];
  payments: any;
  sizes: any;
  sugars: any;
  ices: any;
}

type CartStepProps = {
  shippings: ShippingProps[];
  payments: any;
};
