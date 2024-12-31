import { LangOptionType } from "@/types/custom-type";

type MenuCategoryProps = {
  category_arr: {
    id: number;
    code: string;
    title: {
      zh: string;
      en: string;
    };
  }[];
  locale: LangOptionType;
  selectCategory: number | null;
  onSelectChange: (id: number) => void;
};

const MenuCategory = ({
  category_arr,
  locale,
  selectCategory,
  onSelectChange,
}: MenuCategoryProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-1">
      {category_arr.map(({ id, code, title }) => {
        return (
          <label
            htmlFor={code}
            className={`w-full ${
              selectCategory === id
                ? "bg-fern text-light"
                : "border border-fern text-fern cursor-pointer"
            } text-center rounded-full py-1`}
            key={code}
          >
            <input
              id={code}
              type="radio"
              name="category"
              value={id}
              className="hidden"
              onChange={() => onSelectChange(id)}
              checked={selectCategory === id}
            />
            {title[locale]}
          </label>
        );
      })}
    </div>
  );
};

export default MenuCategory;
