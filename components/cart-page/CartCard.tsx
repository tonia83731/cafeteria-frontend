import { useTranslations } from "next-intl";
import DefaultInput from "../input/DefaultInput";
import { useOrderContext } from "@/context/orderContext";

const CartCard = () => {
  const t = useTranslations("Cart");
  const { cardForm, handleCardFormInput } = useOrderContext();
  return (
    <div className="flex flex-col gap-4">
      <DefaultInput
        id="cardName"
        name="cardName"
        label={`${t("input.cardName")}`}
        placeholder="Coffee Maniac"
        onInputChange={handleCardFormInput}
        value={cardForm.cardName}
        className="h-10"
      />
      <DefaultInput
        id="cardNumber"
        name="cardNumber"
        label={`${t("input.cardNumber")}`}
        placeholder="1111 2222 3333 4444"
        onInputChange={handleCardFormInput}
        value={cardForm.cardNumber}
        className="h-10"
      />
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-4">
        <DefaultInput
          id="cardDate"
          name="cardDate"
          label={`${t("input.cardDate")}`}
          placeholder="11/30"
          onInputChange={handleCardFormInput}
          value={cardForm.cardDate}
          className="h-10"
        />
        <DefaultInput
          id="cardCVC"
          name="cardCVC"
          label={`${t("input.cardCVC")}`}
          placeholder="123"
          onInputChange={handleCardFormInput}
          value={cardForm.cardCVC}
          className="h-10"
        />
      </div>
    </div>
  );
};

export default CartCard;
