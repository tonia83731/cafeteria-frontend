"use client";

import { useState } from "react";
import { DefaultInputProps } from "@/types/default-input";
import { MdLockPerson } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
const DefaultPasswordInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onInputChange,
}: DefaultInputProps) => {
  const [passwordShowed, setPasswordShowed] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base md:text-lg">
        {label}
      </label>
      <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 md:h-14 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
        <span className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center">
          <MdLockPerson />
        </span>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type={passwordShowed ? "text" : "password"}
          value={value}
          className="w-full h-10 md:h-14 text-fern text-base placeholder:text-natural placeholder:text-sm"
          onChange={(e) => {
            const { name, value } = e.target;
            onInputChange(name, value);
          }}
        />
        <button
          type="button"
          className="text-natural text-lg w-5 h-10 md:h-14 flex justify-center items-center"
          onClick={() => setPasswordShowed(!passwordShowed)}
        >
          {passwordShowed ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
    </div>
  );
};

export default DefaultPasswordInput;
