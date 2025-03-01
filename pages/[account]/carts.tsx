import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import FrontLayout from "@/components/layout/FrontLayout";
import CartItems from "@/components/cart-page/CartItems";
import { PaymentProps } from "@/types/custom-type";
import { CartItemProps } from "@/types/cart-type";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartLists,
  getOrderersInfo,
  getQtyCount,
  updatedOrderPrice,
} from "@/slices/orderSlice";
import { ShippingProps } from "@/types/custom-type";
import { UserProfileType } from "@/types/user-auth.type";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { authFetch } from "@/lib/server-fetch";
import CartUserInfo from "@/components/cart-page/CartUserInfo";
import CartPaymentInfo from "@/components/cart-page/CartPaymentInfo";

interface CartPageData {
  userInfo: UserProfileType | null;
  cartItem: CartItemProps[];
  cartItemQty: number;
  total: number;
  shippings: ShippingProps[];
  payments: PaymentProps[];
}

const CartPage = ({ userInfo, cartItem, total }: CartPageData) => {
  const t = useTranslations("Cart");
  const { query } = useRouter();
  const { account } = query;
  const dispatch = useDispatch();
  const { cartLists, price } = useSelector((state: RootState) => state.order);

  const handleProductDelete = async (productId: number) => {
    // try {
    //   const response = await clientFetch(`/carts/${user_id}/${id}`, {
    //     method: "DELETE",
    //     token,
    //   });
    //   if (!response.success) {
    //     toast.error(t("message.delete-error"));
    //     return;
    //   }
    //   const updated_cart_items = cartLists.filter((item) => item.id !== id);
    //   const updated_count = updated_cart_items.reduce(
    //     (acc, curr) => acc + curr.quantity,
    //     0
    //   );
    //   const total = updated_cart_items.reduce(
    //     (acc, curr) => acc + curr.total,
    //     0
    //   );
    //   dispatch(
    //     getCartLists({ data: updated_cart_items, count: updated_count })
    //   );
    //   dispatch(updatedOrderPrice({ name: "productPrice", value: total }));
    //   toast.success(t("message.delete-success"));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    dispatch(getCartLists({ data: cartItem }));
    dispatch(getOrderersInfo({ info: userInfo }));
    dispatch(updatedOrderPrice({ name: "productPrice", value: total }));
  }, [cartItem, userInfo, total, dispatch]);

  useEffect(() => {
    const tax = Math.ceil(price.productPrice * 0.1);
    dispatch(updatedOrderPrice({ name: "taxPrice", value: tax }));
  }, [price.productPrice, dispatch]);
  useEffect(() => {
    const total = price.productPrice + price.taxPrice;
    dispatch(updatedOrderPrice({ name: "totalPrice", value: total }));
  }, [price.productPrice, price.taxPrice, dispatch]);

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
      {/* Personal Info */}
      <CartUserInfo />
      {/* Payment Info */}
      <CartPaymentInfo />
    </FrontLayout>
  );
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { account } = context.query;

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

    const res = await authFetch(
      context,
      `/carts/${account}/cart-and-cart-item`,
      "GET"
    );

    if (res?.success) {
      const data = res?.data;
      const { user, cart } = data;

      const cartItem = cart.CartItems;
      const formatedCartItems = cartItem.map((items: any) => {
        const { Product, ...item } = items;
        return {
          ...item,
          title: Product.title,
          title_en: Product.title_en,
          product_price: Product.price,
          has_opts: Product.Category.hasOpts,
        };
      });
      const total = cartItem.reduce(
        (acc: number, curr: any) => (acc += curr.price),
        0
      );

      return {
        props: {
          userInfo: user,
          cartItem: formatedCartItems,
          total,
          messages: (await import(`../../messages/${context.locale}.json`))
            .default,
        },
      };
    }

    return {
      props: {
        userInfo: null,
        cartItem: [],
        total: 0,
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
        total: 0,
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
