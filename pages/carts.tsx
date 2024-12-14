import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { serverFetch } from "@/lib/fetch";
import { useOrderContext } from "@/context/orderContext";
import FrontLayout from "@/components/layout/FrontLayout";
import CartItems from "@/components/cart-page/CartItems";
import CartCalculate from "@/components/cart-page/CartCalculate";
import CartOrderer from "@/components/cart-page/CartOrderer";
import CartSteps from "@/components/cart-page/CartSteps";
import { DefaultCustomProps, SizeCustomProps } from "@/types/default";
import { CartItemProps, CartPageData } from "@/types/cart-type";

const CartPage = ({ cartItems, total, shippings, payments }: CartPageData) => {
  const t = useTranslations("Cart");
  const { cartProducts, setCartProducts, handleProductPrice } =
    useOrderContext();

  useEffect(() => {
    setCartProducts(cartItems);
    handleProductPrice(total);
  }, [cartItems, total]);

  return (
    <FrontLayout title={`${t("title")}`}>
      <div className="flex flex-col gap-4">
        {cartProducts.map((items: CartItemProps) => {
          return (
            <CartItems
              {...items}
              key={`cartitems-${items.id}`}
              // onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </div>
      {/* rounded-lg bg-fern text-light grid grid-rows-2 md:grid-rows-1 md:grid-cols-[1fr_2fr] p-4 */}
      <div className="text-light flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <CartCalculate />
          <CartOrderer />
        </div>
        <CartSteps shippings={shippings} payments={payments} />
      </div>
    </FrontLayout>
  );
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await serverFetch(context, "/api/carts", "GET");
    // console.log(response);
    const [sizes_res, ices_res, sugars_res] = await Promise.all([
      serverFetch(context, "/api/sizes", "GET"),
      serverFetch(context, "/api/ices", "GET"),
      serverFetch(context, "/api/sugars", "GET"),
    ]);
    // console.log(response);
    const [shipping, payment] = await Promise.all([
      serverFetch(context, "/api/shippings", "GET"),
      serverFetch(context, "/api/payments", "GET"),
    ]);
    const cartItems = response.success ? response.data.cartItems : [];
    const total = response.success ? response.data.total : 0;
    // console.log(shipping, payment);
    let sizes;
    let sugars;
    let ices;
    if (sizes_res.success) {
      sizes = sizes_res.data.map(({ id, title, price }: SizeCustomProps) => {
        return { id, title, price };
      });
    }

    if (sugars_res.success) {
      sugars = sugars_res.data.map(({ id, title }: DefaultCustomProps) => {
        return { id, title };
      });
    }

    if (ices_res.success) {
      ices = ices_res.data.map(({ id, title }: DefaultCustomProps) => {
        return { id, title };
      });
    }
    return {
      props: {
        // userId: userId as string,
        // carts: response.data,
        cartItems,
        total,
        shippings: shipping.data,
        payments: payment.data,
        sizes,
        sugars,
        ices,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        // userId: userId as string,
        carts: [],
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
};
