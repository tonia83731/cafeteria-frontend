"use client";
import { LegacyRef } from "react";
type StaffInputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  ref: LegacyRef<HTMLInputElement>;
};

const StaffDefaultInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  ref,
}: StaffInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium">
        {label}
      </label>
      <div className="border border-fern rounded-lg h-10 leading-10 text-fern">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className="placeholder:text-fern-30 placeholder:text-sm px-4"
          ref={ref}
        />
      </div>
    </div>
  );
};

export default StaffDefaultInput;
