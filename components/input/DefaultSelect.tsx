import { DefaultSelectProps } from "../../types/input-type";

const DefaultSelect = ({
  label,
  type,
  selectOptions,
  selectValue,
  isHidden,
  dropdownToggle,
  onDropdownToggle,
  onOptionClick,
}: DefaultSelectProps) => {
  //   const [dropdownToggle, setDropdownToggle] = useState(false);

  //   const options = handleSelectOptions(selectOptions, locale as "en" | "zh");

  return (
    <div className="flex flex-col gap-1.5">
      <h5 className="text-base md:text-lg">{label}</h5>
      <div className="relative">
        <button
          onClick={() => onDropdownToggle(type)}
          className={`bg-ivory px-2 rounded-lg ${
            selectValue ? "text-fern" : "text-natural text-sm"
          } w-full h-10 text-start`}
        >
          {selectValue ? selectValue?.label : "請下拉進行選擇"}
        </button>
        {dropdownToggle && (
          <ul className="absolute top-12 w-full z-50 bg-ivory text-fern">
            {selectOptions.map((item) => {
              return (
                <li
                  className={`px-4 py-1.5 cursor-pointer hover:bg-natural-30 ${
                    selectValue &&
                    selectValue.value === item.value &&
                    "bg-natural text-ivory"
                  } ${isHidden && "hidden"}`}
                  key={item.value}
                  onClick={() => onOptionClick(item)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DefaultSelect;
