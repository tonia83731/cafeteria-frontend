import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { QuantityBoxProps } from "@/types/default-input";

const QuantityBox = ({ quantity, onQuantityClick }: QuantityBoxProps) => {
  return (
    <div className="grid grid-cols-[2.25rem_1fr_2.25rem] h-9 w-full">
      <button
        onClick={() => onQuantityClick("minus")}
        className="rounded-l-md bg-natural-30 w-9 h-full flex justify-center items-center"
      >
        <FaMinus />
      </button>
      <div className="text-center w-full min-w-9 flex justify-center items-center">
        {quantity}
      </div>
      <button
        onClick={() => onQuantityClick("plus")}
        className="rounded-r-md bg-natural-30 w-9 h-full flex justify-center items-center"
      >
        <FaPlus />
      </button>
    </div>
  );
};
export default QuantityBox;
