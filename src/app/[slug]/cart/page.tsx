import { cartitems_dummy } from "@/dummy/cartitem_dummy";
import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import CartItems from "@/components/cart/CartItems";
import CartInfoSteps from "@/components/cart/CartInfoSteps";
type CartOptionsProps = {
  id: number;
  code: string;
  title: {
    zh: string;
    en: string;
  };
};
export type CartItemProps = {
  id: number;
  cartId: number;
  product: {
    id: number;
    categoryId: number;
    name: string;
    price: number;
  };
  quantity: number;
  size: (CartOptionsProps & { price: number }) | null;
  ice: CartOptionsProps | null;
  sugar: CartOptionsProps | null;
  subPrice: number;
};

const CartPage = () => {
  return (
    <FrontTitleLayout title="CART">
      <div className="flex flex-col gap-4">
        {cartitems_dummy.map((item) => {
          return <CartItems {...item} key={item.id} />;
        })}
      </div>
      <section className="" id="payment">
        <div className="w-full bg-fern text-ivory rounded-md shadow-sm py-2 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
          <div className="w-full border-r border-dotted border-ivory px-4">
            <CartInfoSteps />
          </div>
          <div className="w-full px-4">
            <h5 className="text-xl font-medium">Price Calculated</h5>
          </div>
        </div>
      </section>
    </FrontTitleLayout>
  );
};

export default CartPage;
