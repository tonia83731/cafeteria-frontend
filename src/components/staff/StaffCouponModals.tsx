"use client";
import { ChangeEvent, useState, useRef } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import {
  SELECTSTYLES,
  MULTISELECTSTYLES,
  handleOptions,
  SelectOptionTypes,
} from "@/constants/select-style";
import DatePicker from "react-datepicker";
import StaffModals from "./StaffModals";
import StaffDefaultInput from "./StaffDefaultInput";
import StaffTextareaInput from "./StaffTextareaInput";
import { category_dummy } from "@/dummy/category_dummy";
interface I_StaffProductModals {
  type: "create" | "edit";
}
type DateRangeType = {
  startDate: Date | null;
  endDate: Date | null;
};
const category_options = category_dummy.map(({ id, title }) => {
  return {
    value: id.toString(),
    label: title.zh,
  };
});
const discountType_options = [
  {
    value: "percentage",
    label: "百分比折扣",
  },
  {
    value: "amount",
    label: "金額折扣",
  },
];
const StaffCouponModals = ({ type }: I_StaffProductModals) => {
  const namezhRef = useRef(null);
  const nameenRef = useRef(null);
  const codeRef = useRef(null);
  const discountTypeRef = useRef(null);
  const discountValueRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionzhRef = useRef(null);
  const descriptionenRef = useRef(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: null,
  });

  return (
    <>
      <button
        onClick={() => setModalToggle(true)}
        className="bg-apricot text-white px-4 py-1 rounded-lg md:text-lg"
      >
        {type === "create" ? "新增" : "編輯"}
      </button>
      {modalToggle && (
        <StaffModals title="新增優惠券" onClose={() => setModalToggle(false)}>
          <form className="flex flex-col gap-6 h-full max-h-[500px] px-4 overflow-y-auto overflow-x-hidden modal">
            <div className="flex flex-col gap-4">
              {/* name */}
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <StaffDefaultInput
                  label="優惠券名稱"
                  id="nameZh"
                  name="nameZh"
                  placeholder="請輸入優惠券名稱"
                  ref={namezhRef}
                />
                <StaffDefaultInput
                  label="Product Name"
                  id="nameEn"
                  name="nameEn"
                  placeholder="Enter the product name"
                  ref={nameenRef}
                />
              </div>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <StaffDefaultInput
                  label="優惠券CODE"
                  id="code"
                  name="code"
                  placeholder="請輸入Code"
                  ref={codeRef}
                />
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="startDate" className="text-base font-medium">
                    有效日期
                  </label>
                  <DatePicker
                    className="w-full border border-fern rounded-lg h-10 leading-10 text-fern placeholder:text-fern-30 placeholder:text-sm px-4"
                    selected={dateRange.startDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setDateRange({ startDate: start, endDate: end });
                    }}
                    minDate={new Date()}
                    selectsRange
                    startDate={dateRange.startDate as Date}
                    endDate={dateRange.endDate as Date}
                    placeholderText="選擇日期範圍"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="discountType"
                    className="text-base font-medium"
                  >
                    折扣類型
                  </label>
                  <Select
                    id="discountType"
                    ref={discountTypeRef}
                    options={discountType_options}
                    styles={SELECTSTYLES}
                    placeholder="請選擇折扣類型"
                  />
                </div>
                <StaffDefaultInput
                  label="折扣金額"
                  id="discountValue"
                  name="discountValue"
                  placeholder="請輸入折扣金額"
                  ref={discountValueRef}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-base font-medium">
                    折扣類別
                  </label>
                  <Select
                    id="category"
                    defaultValue={category_options[0]}
                    ref={categoryRef}
                    options={category_options}
                    styles={SELECTSTYLES}
                    placeholder="請選擇折扣類別"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <StaffTextareaInput
                  label="優惠券介紹"
                  id="descriptionzh"
                  name="descriptionzh"
                  placeholder="請輸入優惠券介紹"
                  ref={descriptionzhRef}
                />
                <StaffTextareaInput
                  label="Coupon Description"
                  id="descriptionen"
                  name="descriptionen"
                  placeholder="Enter the coupon description"
                  ref={descriptionenRef}
                />
              </div>
            </div>
            <footer className="flex flex-col gap-2 md:grid md:grid-cols-2">
              <button
                type="button"
                onClick={() => setModalToggle(false)}
                className="bg-moss-60 text-white py-1 w-full md:h-full rounded-lg"
              >
                取消
              </button>
              {type === "create" ? (
                <button
                  type="submit"
                  className="bg-apricot text-white py-1 w-full md:h-full rounded-lg hover:shadow-md"
                >
                  新增
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-apricot text-white py-1 w-full md:h-full rounded-lg hover:shadow-md"
                >
                  修改
                </button>
              )}
            </footer>
          </form>
        </StaffModals>
      )}
    </>
  );
};

export default StaffCouponModals;
