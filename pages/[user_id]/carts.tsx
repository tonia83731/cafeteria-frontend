import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { authFetch, clientFetch } from "@/lib/fetch";
import FrontLayout from "@/components/layout/FrontLayout";
import CartItems from "@/components/cart-page/CartItems";
import CartCalculate from "@/components/cart-page/CartCalculate";
import CartOrderer from "@/components/cart-page/CartOrderer";
import CartSteps from "@/components/cart-page/CartSteps";
import {
  SizeCustomProps,
  SugarCustomProps,
  IceCustomProps,
  SizeOptionProps,
  OtherOptionProps,
  PaymentProps,
} from "@/types/custom-type";
import { CartItemProps } from "@/types/cart-type";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartLists,
  getOrderersInfo,
  getQtyCount,
  updatedOrderPrice,
} from "@/slices/orderSlice";
import { updatedCustomOptions, updateOrderOptions } from "@/slices/customSlice";
import { ShippingProps } from "@/types/custom-type";
import { UserProfileType } from "@/types/user-auth.type";
import { RootState } from "@/store";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface CartPageData {
  userInfo: UserProfileType | null;
  cartItem: CartItemProps[];
  cartItemQty: number;
  total: number;
  shippings: ShippingProps[];
  payments: PaymentProps[];
  sizes: SizeOptionProps[];
  sugars: OtherOptionProps[];
  ices: OtherOptionProps[];
}

const CartPage = ({
  userInfo,
  shippings,
  payments,
  cartItem,
  cartItemQty,
  total,
  sizes,
  sugars,
  ices,
}: CartPageData) => {
  const t = useTranslations("Cart");
  const token = getCookie("authToken");
  const { query } = useRouter();
  const { user_id } = query;
  const dispatch = useDispatch();
  const { cartLists, price } = useSelector((state: RootState) => state.order);

  const handleProductDelete = async (id: number) => {
    try {
      const response = await clientFetch(`/carts/${user_id}/${id}`, {
        method: "DELETE",
        token,
      });
      if (!response.success) {
        toast.error(t("message.delete-error"));
        return;
      }

      const updated_cart_items = cartLists.filter((item) => item.id !== id);
      const updated_count = updated_cart_items.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      const total = updated_cart_items.reduce(
        (acc, curr) => acc + curr.total,
        0
      );

      dispatch(
        getCartLists({ data: updated_cart_items, count: updated_count })
      );
      dispatch(updatedOrderPrice({ name: "productPrice", value: total }));
      toast.success(t("message.delete-success"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getCartLists({ data: cartItem }));
    dispatch(getQtyCount({ count: cartItemQty }));
    dispatch(getOrderersInfo({ info: userInfo }));
    dispatch(updateOrderOptions({ shipping: shippings, payment: payments }));
    dispatch(updatedOrderPrice({ name: "productPrice", value: total }));
    dispatch(
      updatedCustomOptions({
        sizes,
        ices,
        sugars,
      })
    );
  }, [
    cartItem,
    cartItemQty,
    userInfo,
    shippings,
    payments,
    total,
    sizes,
    ices,
    sugars,
    dispatch,
  ]);

  useEffect(() => {
    const tax = Math.ceil(price.productPrice * 0.1);
    dispatch(updatedOrderPrice({ name: "taxPrice", value: tax }));
  }, [price.productPrice]);
  useEffect(() => {
    const total = price.productPrice + price.shippingPrice + price.taxPrice;
    dispatch(updatedOrderPrice({ name: "totalPrice", value: total }));
  }, [price.productPrice, price.shippingPrice, price.taxPrice]);

  return (
    <FrontLayout title={`${t("title")}`}>
      <div className="flex flex-col gap-4">
        {cartLists.map((items: CartItemProps) => {
          return (
            <CartItems
              {...items}
              key={`cartitems-${items.id}`}
              onProductDelete={handleProductDelete}
            />
          );
        })}
      </div>
      <div className="text-light flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <CartCalculate />
          <CartOrderer />
        </div>
        <CartSteps />
      </div>
    </FrontLayout>
  );
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user_id } = context.query;

  try {
    const authChecked = await authFetch(context, `/users/checked-auth`, "GET");

    if (!authChecked.isAuth) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const [user, cart] = await Promise.all([
      authFetch(context, `/users/${user_id}`, "GET"),
      authFetch(context, `/carts/${user_id}`, "GET"),
    ]);
    const [size, ice, sugar] = await Promise.all([
      authFetch(context, "/sizes", "GET"),
      authFetch(context, "/ices", "GET"),
      authFetch(context, "/sugars", "GET"),
    ]);

    const [shipping, payment] = await Promise.all([
      authFetch(context, "/shippings", "GET"),
      authFetch(context, "/payments", "GET"),
    ]);

    // console.log(cart);

    return {
      props: {
        userInfo: user.data,
        cartItem: cart.success ? cart.data.cartItems : [],
        cartItemQty: cart.success ? cart.data.cartItems.length : 0,
        total: cart.success ? cart.data.total : 0,
        shippings: shipping.success ? shipping.data : [],
        payments: payment.success ? payment.data : [],
        sizes: size.success
          ? size.data.map(({ id, title, price }: SizeCustomProps) => {
              return { id, title, price };
            })
          : [],
        sugars: sugar.success
          ? sugar.data.map(({ id, title }: SugarCustomProps) => {
              return { id, title };
            })
          : [],
        ices: ice.success
          ? ice.data.map(({ id, title }: IceCustomProps) => {
              return { id, title };
            })
          : [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        userInfo: null,
        cartItem: [],
        cartItemQty: 0,
        total: 0,
        shippings: [],
        payments: [],
        sizes: [],
        sugars: [],
        ices: [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
