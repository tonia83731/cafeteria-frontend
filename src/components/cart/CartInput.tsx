"use client";
import { LegacyRef, ReactNode } from "react";
export type InputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  icon?: ReactNode;
  placeholder: string;
  ref: LegacyRef<HTMLInputElement>;
};

const CartInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  ref,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="ext-base font-medium text-ivory">
        {label}
      </label>
      <div className="bg-white flex justify-between px-2 gap-2 text-fern w-full h-10 rounded-lg">
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className="w-full h-10 text-fern text-base placeholder:text-natural placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default CartInput;
