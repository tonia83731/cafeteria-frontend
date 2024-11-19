import { creditcards_dummy } from "@/dummy/creditcard_dummy";
import { cardbrand } from "@/data/creditcard-brand";
import Image from "next/image";
const SettingCardForm = () => {
  return (
    <div className="flex flex-col gap-6 border border-apricot rounded-lg p-4">
      <h5 className="text-lg font-bold">CreditCard Settings</h5>
      {creditcards_dummy.map(({ cardNumber, cardType, cvc }) => {
        const brand = cardbrand.find((card) => card.id === cardType);
        return (
          <div className="flex justify-between items-center" key={cvc}>
            <div className="flex items-center gap-2">
              {brand && (
                <Image
                  src={brand?.src}
                  alt={cardType}
                  width={100}
                  height={100}
                  className="w-6 h-6"
                ></Image>
              )}
              <p className="">{cardNumber}</p>
            </div>
            <button className="text-moss text-sm hover:font-medium">
              Delete
            </button>
          </div>
        );
      })}
      <button className="w-[160px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm">
        + Add New Card
      </button>
    </div>
  );
};

export default SettingCardForm;
