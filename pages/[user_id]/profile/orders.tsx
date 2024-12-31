import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { authFetch, clientFetch } from "@/lib/fetch";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileOrder from "@/components/profile-page/ProfileOrder";
import { status_options } from "@/data/status_option";
import { OrderProps } from "@/types/order-type";
import { LangOptionType } from "@/types/custom-type";

const ProfileOrdersPage = ({
  orders,
  user_id,
}: {
  orders: OrderProps[];
  user_id: number | undefined;
}) => {
  //   console.log(orders);
  const { locale } = useRouter();
  const token = getCookie("authToken");
  const t = useTranslations("Profile");
  const [userOrders, setUserOrders] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState(status_options[0]);

  const handleSelectedStatus = (item: any) => {
    if (item.id === "all") setUserOrders(orders);
    else {
      const updated_orders = orders.filter((order: any) =>
        item.include.includes(order.status)
      );
      setUserOrders(updated_orders);
    }
    setSelectedStatus(item);
  };

  const handleOrderCancel = async (orderId: number) => {
    try {
      const response = await clientFetch(
        `/orders/${user_id}/${orderId}/cancel-order`,
        {
          token,
          method: "PATCH",
        }
      );

      if (response.success) {
        const updated_order = userOrders.map((item: any) => {
          return item.id === orderId ? { ...item, status: "canceled" } : item;
        });
        setUserOrders(updated_order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileLayout>
      <div className="grid grid-cols-4 gap-4 md:w-3/5">
        {status_options.map((item) => {
          return (
            <label
              htmlFor={item.id}
              className={`w-full ${
                selectedStatus.id === item.id
                  ? "bg-fern text-white"
                  : "border border-fern text-fern cursor-pointer"
              } text-center rounded-full py-1 text-xs sm:text-sm`}
              key={item.id}
            >
              <input
                id={item.id}
                type="radio"
                className="hidden"
                name="drinks-size"
                onChange={() => handleSelectedStatus(item)}
                checked={selectedStatus.id === item.id}
              />
              {item.title[locale as string as LangOptionType]}
            </label>
          );
        })}
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 md:grid-cols-6 bg-moss-60 text-fern font-bold text-sm md:text-base text-center h-6 leading-6 md:h-9 md:leading-9 rounded-sm">
          <div>{t("table.header.date")}</div>
          <div className="hidden md:block">{t("table.header.items")}</div>
          <div>{t("table.header.price")}</div>
          <div>{t("table.header.shipping")}</div>
          <div className="hidden md:block">{t("table.header.payment")}</div>
          <div>{t("table.header.status")}</div>
        </div>
        <div className="flex flex-col gap-4">
          {userOrders.map((order: any) => {
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
    </ProfileLayout>
  );
};

export default ProfileOrdersPage;
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

    const response = await authFetch(context, `/orders/${user_id}`, "GET");
    return {
      props: {
        orders: response.success ? response.data : [],
        user_id,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orders: [],
        user_id,
        messages: (await import(`../../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
