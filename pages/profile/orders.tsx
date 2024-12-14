import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { serverFetch, clientFetch } from "@/lib/fetch";
import ProfileLayout from "@/components/layout/ProfileLayout";
import ProfileOrder from "@/components/profile-page/ProfileOrder";

const ProfileOrdersPage = ({ orders }: { orders: any }) => {
  //   console.log(orders);
  const { locale } = useRouter();
  const token = getCookie("authToken");
  const t = useTranslations("Profile");
  const status = [
    {
      id: "all",
      title: {
        zh: "全部",
        en: "All",
      },
      include: [],
    },
    {
      id: "ongoing",
      title: {
        zh: "進行中",
        en: "On-Going",
      },
      include: ["pending", "preparing", "delivering", "picking up"],
    },
    {
      id: "completed",
      title: {
        zh: "已完成",
        en: "Completed",
      },
      include: ["completed"],
    },
    {
      id: "canceled",
      title: {
        zh: "已取消",
        en: "Canceled",
      },
      include: ["canceled"],
    },
  ];
  const [userOrders, setUserOrders] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState(status[0]);

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
      const response = await clientFetch(`/orders/${orderId}/cancel`, {
        token,
        method: "PATCH",
      });

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
        {status.map((item) => {
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
              {item.title[locale as string as "zh" | "en"]}
            </label>
          );
        })}
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 md:grid-cols-6 bg-moss text-fern font-bold text-sm md:text-base text-center h-6 leading-6 md:h-9 md:leading-9 rounded-sm">
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
  try {
    const response = await serverFetch(context, "/api/orders", "GET");
    return {
      props: {
        orders: response.success ? response.data : [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        orders: [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
