import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
type QuantityBoxProps = {
  quantity: number;
  onQuantityClick: (type: "plus" | "minus") => void;
};

const QuantityBox = ({ quantity, onQuantityClick }: QuantityBoxProps) => {
  return (
    <div className="grid grid-cols-[2.25rem_1fr_2.25rem] h-9 w-full">
      <button
        onClick={() => onQuantityClick("minus")}
        className="rounded-l-lg bg-natural-30 w-9 h-full flex justify-center items-center"
      >
        <FaMinus />
      </button>
      <input
        type="number"
        className="text-center w-full min-w-9"
        value={quantity}
        min={1}
      />
      <button
        onClick={() => onQuantityClick("plus")}
        className="rounded-r-lg bg-natural-30 w-9 h-full flex justify-center items-center"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityBox;
