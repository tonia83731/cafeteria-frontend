import { useTranslations } from "next-intl";
import DefaultInput from "../input/DefaultInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updatedFormInfo, updatedFormValidation } from "@/slices/orderSlice";
import { useEffect } from "react";
// import { useOrderContext } from "@/context/orderContext";

const CartCard = () => {
  const t = useTranslations("Cart");
  const dispatch = useDispatch();
  const { cardInfo } = useSelector((state: RootState) => state.order);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInfo({ formType: "cardInfo", name, value }));
  };

  useEffect(() => {
    for (const key in cardInfo) {
      if (cardInfo[key] === "") {
        dispatch(updatedFormValidation({ type: "cardInfo", value: false }));
      }
    }
    dispatch(updatedFormValidation({ type: "cardInfo", value: true }));
  }, [cardInfo]);
  return (
    <div className="flex flex-col gap-4">
      <DefaultInput
        id="cardName"
        name="cardName"
        label={`${t("input.cardName")}`}
        placeholder="Coffee Maniac"
        onInputChange={handleInputChange}
        value={cardInfo.cardName}
        className="h-10"
      />
      <DefaultInput
        id="cardNumber"
        name="cardNumber"
        label={`${t("input.cardNumber")}`}
        placeholder="1111 2222 3333 4444"
        onInputChange={handleInputChange}
        value={cardInfo.cardNumber}
        className="h-10"
      />
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <DefaultInput
          id="cardDate"
          name="cardDate"
          label={`${t("input.cardDate")}`}
          placeholder="11/30"
          onInputChange={handleInputChange}
          value={cardInfo.cardDate}
          className="h-10"
        />
        <DefaultInput
          id="cardCVC"
          name="cardCVC"
          label={`${t("input.cardCVC")}`}
          placeholder="123"
          onInputChange={handleInputChange}
          value={cardInfo.cardCVC}
          className="h-10"
        />
      </div>
    </div>
  );
};

export default CartCard;

//  const handleCardFormInput = (e: ChangeEvent<HTMLInputElement>) => {
//    const name = e.target.name;
//    let value = e.target.value;

//    if (name === "cardNumber") {
//      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
//    }

//    if (name === "cardDate") {
//      value = value.replace(/(\d{2})(?=\d)/g, "$1/").slice(0, 5);
//    }

//    setCardForm((prev) => ({ ...prev, [name]: value }));
//  };
