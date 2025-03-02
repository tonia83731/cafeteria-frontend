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
  updatedOrderPrice,
} from "@/slices/orderSlice";
import { ShippingProps } from "@/types/custom-type";
import { UserProfileType } from "@/types/user-auth.type";
import { RootState } from "@/store";
import { authFetch } from "@/lib/server-fetch";
import CartUserInfo from "@/components/cart-page/CartUserInfo";
import CartPaymentInfo from "@/components/cart-page/CartPaymentInfo";
import Link from "next/link";

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
  const dispatch = useDispatch();
  const { cartLists, price } = useSelector((state: RootState) => state.order);

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
      {cartLists.length <= 0 ? (
        <div className="w-full text-fern-60">
          {t("no-item")}&nbsp;
          <span className="underline underline-offset-2">
            <Link href="/menu">{t("buy-now")}</Link>
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 h-full max-h-[520px] overflow-y-auto modal">
            {cartLists.map((items: CartItemProps) => {
              return (
                <CartItems
                  {...items}
                  item_price={items.price}
                  key={`cartitems-${items.id}`}
                />
              );
            })}
          </div>
          {/* Personal Info */}
          <CartUserInfo />
          {/* Payment Info */}
          <CartPaymentInfo />
        </>
      )}
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
