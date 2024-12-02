"use client";
import { useRef } from "react";
import StaffDefaultInput from "./StaffDefaultInput";

const StaffSigninForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <StaffDefaultInput
          label="電子郵件"
          id="email"
          type="email"
          name="email"
          placeholder="staff@example.com"
          ref={emailRef}
        />
        <StaffDefaultInput
          label="密碼"
          id="password"
          type="password"
          name="password"
          placeholder="********"
          ref={passwordRef}
        />
      </div>
      <button
        type="submit"
        className="w-full py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
      >
        Sign In
      </button>
    </form>
  );
};

export default StaffSigninForm;
