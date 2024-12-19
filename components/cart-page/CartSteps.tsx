import { useTranslations } from "next-intl";
import { useOrderContext } from "@/context/orderContext";
import CartOrder from "./CartOrder";
import CartPersonal from "./CartPersonal";
import CartCard from "./CartCard";
import { CartStepProps } from "@/types/cart-type";

const CartSteps = ({ shippings, payments }: CartStepProps) => {
  const t = useTranslations("Cart");

  const {
    paymentMethod,
    steps,
    handleControlSteps,
    step_disabled_condition,
    handleOrderSubmit,
  } = useOrderContext();

  const steps_tag = [
    {
      id: "step1",
      title: `${t("order")}`,
      tag: <CartOrder shippings={shippings} payments={payments} />,
    },
    {
      id: "step2",
      title: `${t("personal")}`,
      tag: <CartPersonal />,
    },
    ...(paymentMethod?.value === 3
      ? [
          {
            id: "step3",
            title: `${t("payment")}`,
            tag: <CartCard />,
          },
        ]
      : []),
  ];
  const isLastStep = steps === steps_tag.length - 1;
  return (
    <div className="rounded-lg bg-fern p-4 flex flex-col gap-6">
      <h5 className="font-bold uppercase text-xl">{steps_tag[steps].title}</h5>
      <div className="flex flex-col gap-2">{steps_tag[steps].tag}</div>
      <div
        className={`${
          steps === 0
            ? "flex justify-end items-center"
            : "flex justify-between items-center gap-4"
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={() => handleControlSteps("prev")}
          disabled={steps === 0}
          className={`${
            steps === 0 && "hidden"
          } bg-moss rounded-lg hover:shadow-md hover:font-bold py-1 px-4`}
        >
          {t("button.prev")}
        </button>
        {/* Next Button */}
        {!isLastStep && (
          <button
            disabled={step_disabled_condition}
            onClick={() => handleControlSteps("next")}
            className="bg-apricot rounded-lg hover:shadow-md hover:font-bold py-1 px-4 disabled:bg-default-gray"
          >
            {t("button.next")}
          </button>
        )}

        {/* Submit Button */}
        {isLastStep && (
          <button
            onClick={handleOrderSubmit}
            className="bg-apricot rounded-lg hover:shadow-md hover:font-bold py-1 px-4"
          >
            {t("button.submit")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSteps;
