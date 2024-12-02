import { MutableRefObject, ReactNode } from "react";
export type InputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  icon?: ReactNode;
  placeholder: string;
  ref?: MutableRefObject<any>;
};

const DefaultInput = ({
  id,
  name,
  type = "text",
  label,
  icon,
  placeholder,
  ref,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base md:text-lg">
        {label}
      </label>
      <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
        <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
          {icon}
        </span>
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default DefaultInput;
