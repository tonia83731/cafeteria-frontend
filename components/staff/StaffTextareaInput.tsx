import { LegacyRef } from "react";

export type TextAreaProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  ref: LegacyRef<HTMLTextAreaElement>;
};
const StaffTextareaInput = ({
  id,
  name,
  label,
  placeholder,
  ref,
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base md:text-lg">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        ref={ref}
        placeholder={placeholder}
        className="border border-fern rounded-lg w-full resize-none hover:resize-y px-4 py-2 text-fern placeholder:text-fern-30 placeholder:text-sm"
      ></textarea>
    </div>
  );
};

export default StaffTextareaInput;
