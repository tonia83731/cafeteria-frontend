import { useTranslations } from "next-intl";
import { FaMagnifyingGlass } from "react-icons/fa6";

const MenuSearch = () => {
  const t = useTranslations("Menu");
  return (
    <label
      htmlFor="menu-search"
      className="relative w-full md:w-4/5 md:justify-self-end border border-fern text-fern rounded-full cursor-pointer"
    >
      <div className="grid grid-cols-[2fr_20px] gap-2 py-1 px-4">
        <input
          id="menu-search"
          type="text"
          className="placeholder:text-natural placeholder:text-sm"
          placeholder={t("search-placeholder")}
        />
        <button className="text-lg w-[20px] absolute right-4 top-1/2 -translate-y-1/2">
          <FaMagnifyingGlass />
        </button>
      </div>
    </label>
  );
};

export default MenuSearch;
