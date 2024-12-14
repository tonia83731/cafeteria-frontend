import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
type MenuSearchProps = {
  inputValue: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearClick: () => void;
};

const MenuSearch = ({
  inputValue,
  onInputChange,
  onSearchClick,
  onClearClick,
}: MenuSearchProps) => {
  const t = useTranslations("Menu");
  return (
    <label
      htmlFor="menu-search"
      className="relative w-full md:w-4/5 md:justify-self-end border border-fern text-fern rounded-full cursor-pointer"
    >
      <div className="grid grid-cols-[2fr_0.25fr] gap-2 py-1 px-4">
        <input
          id="menu-search"
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e)}
          className="placeholder:text-natural placeholder:text-sm"
          placeholder={t("search-placeholder")}
        />
        <div>
          <button
            onClick={onClearClick}
            className="text-lg w-[20px] text-fern-60 hover:text-fern absolute right-10 top-1/2 -translate-y-1/2"
          >
            <RxCross2 />
          </button>
          <button
            onClick={onSearchClick}
            className="text-lg w-[20px] absolute right-4 top-1/2 -translate-y-1/2"
          >
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>
    </label>
  );
};
export default MenuSearch;
