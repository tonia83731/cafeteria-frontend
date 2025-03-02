import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileOrder from "@/components/profile-page/ProfileOrder";
import { OrderProps } from "@/types/order-type";
import { authFetch } from "@/lib/server-fetch";
import { statusOpts } from "@/data/status-option";
import { clientFetch } from "@/lib/client-fetch";
import Link from "next/link";

const ProfileOrdersPage = ({
  orders,
}: {
  orders: OrderProps[];
  user_id: number | undefined;
}) => {
  const { locale, query } = useRouter();
  const { account } = query;
  const t = useTranslations("Profile");
  const [userOrders, setUserOrders] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState(statusOpts[0]);

  const handleSelectedStatus = async (item: any) => {
    setSelectedStatus(item);
    if (!item.value) {
      setUserOrders(orders);
      return;
    }

    try {
      const response = await clientFetch(
        `/orders/${account}?status=${item.value}`,
        "GET",
        true
      );
      if (response.success) {
        setUserOrders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderCancel = async (orderId: number) => {
    try {
      const response = await clientFetch(
        `/orders/${orderId}/canceled-order`,
        "PATCH",
        true
      );

      if (response.success) {
        const updatedOrders = userOrders.map((item) => {
          return item.id === orderId ? { ...item, status: 4 } : item;
        });
        setUserOrders(updatedOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileLayout>
      <div className="grid grid-cols-4 gap-4 md:w-3/5">
        {statusOpts.map((item) => {
          return (
            <label
              htmlFor={item.value === null ? "all" : item.value}
              className={`w-full ${
                selectedStatus.value === item.value
                  ? "bg-fern text-white"
                  : "border border-fern text-fern cursor-pointer"
              } text-center rounded-full py-1 text-xs sm:text-sm`}
              key={item.value === null ? "all" : item.value}
            >
              <input
                id={item.value === null ? "all" : item.value}
                type="radio"
                className="hidden"
                name="drinks-size"
                onChange={() => handleSelectedStatus(item)}
                checked={selectedStatus.value === item.value}
              />
              {item.title[locale as string as "zh" | "en"]}
            </label>
          );
        })}
      </div>
      {userOrders.length <= 0 ? (
        <div className="w-full text-fern-60">
          {t("no-order")}&nbsp;
          <span className="underline underline-offset-2">
            <Link href="/menu">{t("buy-now")}</Link>
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[2fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr_1fr] bg-moss-60 text-fern font-bold text-sm md:text-base text-center h-6 leading-6 md:h-9 md:leading-9 rounded-sm">
            <div>{t("table.header.status")}</div>
            <div>{t("table.header.price")}</div>
            <div>{t("table.header.shipping")}</div>
            <div className="hidden md:block">{t("table.header.payment")}</div>
          </div>
          <div className="flex flex-col gap-4">
            {userOrders.map((order: any) => {
              console.log(order);
              return (
                <ProfileOrder
                  {...order}
                  key={order.id}
                  onOrderCancel={handleOrderCancel}
                />
              );
            })}
          </div>
        </div>
      )}
    </ProfileLayout>
  );
};

export default ProfileOrdersPage;
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

    const response = await authFetch(context, `/orders/${account}`, "GET");
    return {
      props: {
        orders: response.success ? response.data : [],
        account,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orders: [],
        account,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
