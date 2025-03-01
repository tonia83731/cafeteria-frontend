import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { OrderProps, OrderDetailProps } from "@/types/order-type";
import { GoDotFill } from "react-icons/go";
import { orderStatus, paymentOpts, shippingOpts } from "@/data/status-option";
import { clientFetch } from "@/lib/client-fetch";
import { sizeOpts, iceOpts, sugarOpts } from "@/data/product-options";

const ProfileOrder = ({
  id,
  payment,
  shipping,
  status,
  total,
  updatedAt,
  discount,
  onOrderCancel,
}: OrderProps & {
  onOrderCancel: (orderId: number) => void;
}) => {
  const { locale } = useRouter();
  const t = useTranslations("Profile");
  const [detailToggle, setDetailToggle] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetailProps[]>([]);

  const handleDetailedShow = async (id: number) => {
    if (detailToggle === true) {
      setDetailToggle(false);
      setOrderDetail([]);
      return;
    }
    try {
      const response = await clientFetch(
        `/orders/${id}/order-with-items`,
        "GET",
        true
      );
      // console.log(response);
      if (response.success) {
        const orderItems = response.data;
        const data = orderItems.map((item: any) => {
          const { Product, ...rest } = item;
          return {
            ...rest,
            title: {
              zh: Product.title,
              en: Product.title_en,
            },
            price: Product.price,
          };
        });
        setOrderDetail(data);
        setDetailToggle(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${detailToggle ? "shadow-md" : ""}`}>
      <div
        className={`w-full grid grid-cols-[2fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr_1fr] py-1 h-[75px] md:h-[90px] items-center ${
          detailToggle
            ? "bg-ivory rounded-t-sm"
            : "bg-white rounded-sm shadow-md"
        } text-xs md:text-sm text-center leading-12 text-fern`}
      >
        <div className="flex flex-col gap-1 items-center">
          <div
            className={`uppercase ${
              status === 4
                ? "text-default-gray"
                : status === 3
                ? "text-matcha"
                : "text-heart"
            } flex gap-1 justify-center items-center`}
          >
            {status !== 3 && status !== 4 ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-heart"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-heart"></span>
              </span>
            ) : (
              <GoDotFill />
            )}
            <div className="">
              {orderStatus[status].title[locale as string as "en" | "zh"]}
            </div>
          </div>
          <>
            {status === 0 && (
              <button
                onClick={() => onOrderCancel(id)}
                className="w-fit py-1 px-4 rounded-lg text-xs text-center bg-apricot text-white shadow-sm"
              >
                {t("cancel-order")}
              </button>
            )}
            {status === 2 && (
              <div className="text-xs">
                {shipping === 0 ? `${t("pickup")}` : `${t("delivery")}`}
              </div>
            )}
          </>
          <p className="text-xs text-fern-30">
            {t("last-update")}: {dayjs(updatedAt).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div>
            NT${total.toLocaleString()}
            <span className="text-fern-30">
              {" "}
              {discount
                ? ` (${discount.code}: ${
                    discount.discountType === 0
                      ? `${discount.discountValue}%off`
                      : `-NT$${discount.discountValue}`
                  })`
                : ""}
            </span>
          </div>
          <button
            className="border border-natural text-natural text-xs w-fit py-1 px-4 rounded-lg text-center hover:bg-natural hover:text-white"
            onClick={() => handleDetailedShow(id)}
          >
            {t("detail")}
          </button>
        </div>
        <div>
          {shippingOpts[shipping].title[locale as string as "en" | "zh"]}
        </div>
        <div className="hidden md:block">
          {paymentOpts[payment].title[locale as string as "en" | "zh"]}
        </div>
      </div>
      {detailToggle && orderDetail.length > 0 && (
        <div className="bg-white rounded-b-sm flex flex-col gap-1 p-4">
          {orderDetail.map(
            ({ orderId, title, quantity, price, size, ice, sugar }, index) => {
              const hasOpts = size !== null && ice !== null && sugar !== null;
              console.log(hasOpts);
              return (
                <div
                  className="grid grid-cols-[1fr_0.5fr_0.5fr_1.5fr] gap-1 md:gap-2 text-xs md:text-sm"
                  key={`order-item-${orderId}-${index}`}
                >
                  <div className="">
                    {title[locale as string as "en" | "zh"]}
                  </div>
                  <div className="">X {quantity}</div>
                  <div className="">
                    <span className="hidden md:inline-block">NT</span>${" "}
                    {price.toLocaleString()}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-0.5">
                    <div className="">OPTIONS: </div>
                    <div className="">
                      {hasOpts
                        ? `${
                            sizeOpts[size].title[
                              locale as string as "en" | "zh"
                            ]
                          }(+${sizeOpts[size].price}), ${
                            iceOpts[ice].title[locale as string as "en" | "zh"]
                          }, ${
                            sugarOpts[sugar].title[
                              locale as string as "en" | "zh"
                            ]
                          }`
                        : "NULL"}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileOrder;
