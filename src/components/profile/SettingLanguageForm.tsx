"use client";

import Select from "react-select";
import { langauge_options } from "@/data/languages";
import { useRef } from "react";
import { DEFAULTSELECTSTYLES } from "@/constants/select-style";
const SettingLanguageForm = () => {
  const langaugeRef = useRef(null);
  return (
    <div className="flex flex-col gap-6 border border-apricot rounded-lg p-4">
      <h5 className="text-lg font-bold">Language Perference</h5>
      <form className="grid grid-cols-[2fr_1fr] items-center gap-4">
        <Select
          id="langauges"
          ref={langaugeRef}
          options={langauge_options}
          styles={DEFAULTSELECTSTYLES}
          defaultValue={langauge_options[1]}
        />
        <button className="w-[80px] py-1.5 rounded-lg text-center bg-apricot text-white shadow-sm">
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingLanguageForm;
