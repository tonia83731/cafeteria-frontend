import { useTranslations } from "next-intl";
import CartOrder from "./CartOrder";
import CartPersonal from "./CartPersonal";
import CartCard from "./CartCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updatedFormSteps } from "@/slices/orderSlice";

const CartSteps = () => {
  const t = useTranslations("Cart");
  const dispatch = useDispatch();
  const { formSteps, basicInfo, validation } = useSelector(
    (state: RootState) => state.order
  );

  const steps_tag = [
    {
      id: "step1",
      title: `${t("order")}`,
      tag: <CartOrder />,
    },
    {
      id: "step2",
      title: `${t("personal")}`,
      tag: <CartPersonal />,
    },
    ...(basicInfo.payment?.value === 3
      ? [
          {
            id: "step3",
            title: `${t("payment")}`,
            tag: <CartCard />,
          },
        ]
      : []),
  ];
  const isLastStep = formSteps === steps_tag.length - 1;

  return (
    <div className="rounded-lg bg-fern p-4 flex flex-col gap-6">
      <h5 className="font-bold uppercase text-xl">
        {steps_tag[formSteps].title}
      </h5>
      <div className="flex flex-col gap-2">{steps_tag[formSteps].tag}</div>
      <div
        className={`${
          formSteps === 0
            ? "flex justify-end items-center"
            : "flex justify-between items-center gap-4"
        }`}
      >
        <button
          onClick={() => dispatch(updatedFormSteps({ type: "prev" }))}
          disabled={formSteps === 0}
          className={`${
            formSteps === 0 && "hidden"
          } bg-moss rounded-lg hover:shadow-md hover:font-bold py-1 px-4`}
        >
          {t("button.prev")}
        </button>
        {isLastStep ? (
          <button
            // onClick={handleOrderSubmit}
            disabled={
              formSteps === 0
                ? validation.basicInfo
                : formSteps === 1
                ? validation.recipientInfo
                : validation.cardInfo
            }
            className="bg-apricot rounded-lg hover:shadow-md hover:font-bold py-1 px-4 disabled:bg-default-gray"
          >
            {t("button.submit")}
          </button>
        ) : (
          <button
            disabled={
              formSteps === 0
                ? validation.basicInfo
                : formSteps === 1
                ? validation.recipientInfo
                : validation.cardInfo
            }
            onClick={() => dispatch(updatedFormSteps({ type: "next" }))}
            className="bg-apricot rounded-lg hover:shadow-md hover:font-bold py-1 px-4 disabled:bg-default-gray"
          >
            {t("button.next")}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSteps;
