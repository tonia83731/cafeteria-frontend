import { InputProps } from "@/types/input-type";

const DefaultInput = ({
  id,
  name,
  type = "text",
  label,
  icon,
  placeholder,
  value,
  isDisabled,
  className = "h-10 md:h-14",
  onInputChange,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base md:text-lg">
        {label}
      </label>
      <div
        className={`bg-ivory flex justify-between px-2 gap-2 text-fern w-full ${className} rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern`}
      >
        {icon && (
          <span
            className={`text-natural text-lg w-5 ${className} flex justify-center items-center`}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onInputChange(e)}
          className={`w-full ${className} text-fern text-base placeholder:text-natural placeholder:text-sm`}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default DefaultInput;
