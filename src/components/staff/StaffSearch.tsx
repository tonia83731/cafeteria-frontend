import { FaMagnifyingGlass } from "react-icons/fa6";

const StaffSearch = ({
  placeholder,
  className = "",
}: {
  placeholder: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-full ${className} border border-fern text-fern rounded-full cursor-pointer`}
    >
      <div className="grid grid-cols-[2fr_20px] gap-2 py-1 px-4">
        <input
          id="staff-search"
          type="text"
          className="placeholder:text-natural placeholder:text-sm"
          placeholder={placeholder}
        />
        <button className="text-lg w-[20px]">
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};

export default StaffSearch;
