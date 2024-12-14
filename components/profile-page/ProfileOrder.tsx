import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { clientFetch } from "@/lib/fetch";
import { MultiLangProps } from "@/types/default";
import { GoDotFill } from "react-icons/go";
type OrdersProps = {
  id: number;
  itemCount: number;
  payment: MultiLangProps;
  shipping: {
    title: MultiLangProps;
    price: number;
  };
  discount: {
    code: string;
    discountType: string;
    discountValue: string;
  };
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  onOrderCancel: (orderId: number) => void;
};

type OrderDetailProps = {
  product: MultiLangProps;
  size: MultiLangProps;
  ice: MultiLangProps;
  sugar: MultiLangProps;
  quantity: number;
  orderId: number;
  price: number;
};

const ProfileOrder = ({
  id,
  itemCount,
  payment,
  shipping,
  status,
  totalPrice,
  createdAt,
  discount,
  onOrderCancel,
}: OrdersProps) => {
  const { locale } = useRouter();
  const token = getCookie("authToken");
  const t = useTranslations("Profile");
  const [detailToggle, setDetailToggle] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailProps[]>([]);
  const order_date = dayjs(createdAt).format("YYYY-MM-DD");

  const handleDetailedShow = async (id: number) => {
    // setDetailToggle(!detailToggle);
    if (detailToggle === true) {
      setDetailToggle(false);
      setOrderDetail([]);
      return;
    }
    try {
      const response = await clientFetch(`/orders/${id}`, {
        token,
      });
      if (response.success) {
        const order_items = response.data.orderItems;
        setOrderDetail(order_items);
        setDetailToggle(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOrderCancel = async (id: number) => {
  //   console.log(id);
  //   try {} catch (error) {
  //     console.log(error)
  //   }
  // };
  return (
    <div className={`${detailToggle ? "shadow-md" : ""}`}>
      <button
        onClick={() => handleDetailedShow(id)}
        className={`w-full grid grid-cols-4 md:grid-cols-6 items-center ${
          detailToggle
            ? "bg-ivory rounded-t-sm"
            : "bg-white rounded-sm shadow-md"
        } text-xs md:text-sm text-center h-12 leading-12 text-fern`}
      >
        <div>{order_date}</div>
        <div className="hidden md:block">{itemCount}</div>
        <div>{totalPrice}</div>
        <div>{shipping.title[locale as string as "zh" | "en"]}</div>
        <div className="hidden md:block">
          {payment[locale as string as "zh" | "en"]}
        </div>
        <div
          className={`uppercase ${
            status === "canceled"
              ? "text-default-gray"
              : status === "completed"
              ? "text-matcha"
              : "text-heart"
          } flex gap-1 justify-center items-center`}
        >
          {status !== "completed" && status !== "canceled" ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-heart"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-heart"></span>
            </span>
          ) : (
            <GoDotFill />
          )}
          <div className="">{status}</div>
        </div>
      </button>
      {detailToggle && orderDetail.length > 0 && (
        <div className="bg-white rounded-b-sm grid grid-cols-[0.5fr_2fr] gap-4 p-4">
          {discount ? (
            <div className="h-full flex justify-center items-center text-xs md:text-sm">
              {discount.code}
            </div>
          ) : (
            <div className="h-full flex justify-center items-center text-xs md:text-sm text-default-gray">
              {t("no-coupon")}
            </div>
          )}
          <div className="flex flex-col justify-center gap-2">
            {orderDetail.map((order, index) => {
              return (
                <div
                  key={`detail-${index}`}
                  className={`flex flex-col gap-1 ${
                    index !== 0 && "border-t border-default-gray border-dotted"
                  }`}
                >
                  <div className="flex justify-between items-center gap-4 font-medium text-sm md:text-base">
                    <div>
                      {order.product[locale as string as "en" | "zh"]} x
                      {order.quantity}
                    </div>
                    <div className="text-apricot">${order.price}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                    {order.size && (
                      <div className="bg-moss-60 text-white py-0.5 text-center rounded-sm">
                        {order.size[locale as string as "en" | "zh"]}
                      </div>
                    )}
                    {order.sugar && (
                      <div className="bg-moss-60 text-white py-0.5 text-center rounded-sm">
                        {order.sugar[locale as string as "en" | "zh"]}
                      </div>
                    )}
                    {order.ice && (
                      <div className="bg-moss-60 text-white py-0.5 text-center rounded-sm">
                        {order.ice[locale as string as "en" | "zh"]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {status === "pending" && (
              <div className="w-full flex justify-end">
                <button
                  onClick={() => onOrderCancel(id)}
                  className="w-fit py-1 px-4 rounded-lg text-center bg-apricot text-white shadow-sm"
                >
                  {t("cancel-order")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrder;
