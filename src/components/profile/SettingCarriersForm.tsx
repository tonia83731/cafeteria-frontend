"use client";

import { useRef } from "react";
const SettingCarriersForm = () => {
  const invoiceRef = useRef(null);
  return (
    <div className="flex flex-col gap-6 border border-apricot rounded-lg p-4">
      <h5 className="text-lg font-bold">Carriers Settings</h5>
      <form className="grid grid-cols-[2fr_1fr] items-center gap-4">
        <div className="bg-ivory flex justify-between px-2 gap-2 text-fern w-full h-10 rounded-lg hover:border hover:border-fern focus-within:border focus-within:border-fern">
          <input
            id="carriers"
            name="carriers"
            type="text"
            ref={invoiceRef}
            placeholder="/ABCDEFG"
            className="w-full h-10 px-2 text-fern text-base placeholder:text-natural placeholder:text-sm"
          />
        </div>
        <button className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingCarriersForm;
