export type CartItemProps = {
  id: number;
  cartId: number;
  title: string;
  title_en: string;
  product_price: number;
  has_opts: boolean;
  price: number;
  size: number | null;
  ice: number | null;
  sugar: number | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
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
