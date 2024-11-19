"use client";
import { useRef } from "react";
import DefaultInput from "../common/Input/DefaultInput";
import DefaultPasswordInput from "../common/Input/DefaultPasswordInput";
// import DefaultFileInput from "../common/Input/DefaultFileInput";
import { TbMailFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const SettingForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  // };
  return (
    <form className="flex flex-col gap-6 border border-apricot rounded-lg p-4">
      <DefaultInput
        id="name"
        name="name"
        label="Name"
        icon={<TiUser />}
        ref={nameRef}
        placeholder="Coffee Maniac"
      />
      <DefaultInput
        id="email"
        name="email"
        type="email"
        label="Email"
        icon={<TbMailFilled />}
        ref={emailRef}
        placeholder="coffee.M@example.com"
      />
      <DefaultPasswordInput
        id="password"
        name="password"
        label="Password"
        ref={passwordRef}
        placeholder="********"
      />
      <DefaultInput
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        icon={<MdOutlinePhoneAndroid />}
        ref={phoneRef}
        placeholder="0912345678"
      />
      <DefaultInput
        id="address"
        name="address"
        label="Address"
        icon={<FaLocationDot />}
        ref={addressRef}
        placeholder="TheCafe Rd. 113"
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
