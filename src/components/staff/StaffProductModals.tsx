"use client";
import { ChangeEvent, useState, useRef } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import {
  SELECTSTYLES,
  MULTISELECTSTYLES,
  handleOptions,
  SelectOptionTypes,
} from "@/constants/select-style";
import StaffModals from "./StaffModals";
import StaffDefaultInput from "./StaffDefaultInput";
import StaffTextareaInput from "./StaffTextareaInput";
import { category_dummy } from "@/dummy/category_dummy";
import { size_dummy, sugar_dummy, ice_dummy } from "@/dummy/product_dummy";

const category_options = category_dummy
  .filter(({ id }) => id !== 0)
  .map(({ id, title }) => {
    return {
      value: id.toString(),
      label: title.zh,
    };
  });
const size_options = handleOptions(size_dummy, "zh");
const ice_options = handleOptions(ice_dummy, "zh");
const sugar_options = handleOptions(sugar_dummy, "zh");
type inputOptionsState = {
  category: SelectOptionTypes | null;
  sizeOption: MultiValue<SelectOptionTypes>;
  iceOption: MultiValue<SelectOptionTypes>;
  sugarOption: MultiValue<SelectOptionTypes>;
};

interface I_StaffProductModals {
  type: "create" | "edit";
}
const StaffProductModals = ({ type }: I_StaffProductModals) => {
  const namezhRef = useRef(null);
  const nameenRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionzhRef = useRef(null);
  const descriptionenRef = useRef(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [inputOptions, setInputOptions] = useState<inputOptionsState>({
    category: null,
    sizeOption: size_options,
    iceOption: ice_options,
    sugarOption: sugar_options,
  });
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <>
      <button
        onClick={() => setModalToggle(true)}
        className="bg-apricot text-white px-4 py-1 rounded-lg md:text-lg"
      >
        {type === "create" ? "新增" : "編輯"}
      </button>
      {modalToggle && (
        <StaffModals title="新增產品" onClose={() => setModalToggle(false)}>
          <form className="flex flex-col gap-6 h-full max-h-[500px] px-4 overflow-y-auto overflow-x-hidden modal">
            <div className="flex flex-col gap-4">
              <label htmlFor="file" className="flex items-center gap-2">
                <div className="w-[150px] h-full md:h-[30px] flex justify-center items-center gap-1.5 border border-fern text-fern hover:border-0 hover:bg-natural hover:text-white text-sm rounded-lg px-4 py-1 hover:shadow cursor-pointer">
                  選擇檔案
                </div>
                <p className="text-xs text-natural">
                  可上傳.jpg, .jpeg, .png，檔案不超過500MB
                </p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
              </label>
              <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <StaffDefaultInput
                  label="產品名稱"
                  id="nameZh"
                  name="nameZh"
                  placeholder="請輸入產品名稱"
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
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-base font-medium">
                  商品類別
                </label>
                <Select
                  id="category"
                  options={category_options}
                  styles={SELECTSTYLES}
                  placeholder="請選擇商品類別"
                  onChange={(
                    newValue: SingleValue<SelectOptionTypes>,
                    actionMeta: ActionMeta<SelectOptionTypes>
                  ) => {
                    if (newValue) {
                      setInputOptions((prev) => ({
                        ...prev,
                        category: newValue,
                      }));
                    }
                    console.log(actionMeta);
                  }}
                />
              </div>
              {inputOptions.category &&
                Number(inputOptions.category?.value) === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sizeOption"
                        className="text-base font-medium"
                      >
                        飲料尺寸
                      </label>
                      <Select
                        id="sizeOption"
                        isMulti
                        options={size_options}
                        styles={MULTISELECTSTYLES}
                        defaultValue={inputOptions.sizeOption}
                        onChange={(
                          newValue: MultiValue<SelectOptionTypes>,
                          actionMeta: ActionMeta<SelectOptionTypes>
                        ) => {
                          setInputOptions((prev) => ({
                            ...prev,
                            sizeOption: newValue,
                          }));
                          console.log(actionMeta);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="sugarOption"
                        className="text-base font-medium"
                      >
                        飲料甜度
                      </label>
                      <Select
                        id="sugarOption"
                        isMulti
                        options={sugar_options}
                        styles={MULTISELECTSTYLES}
                        defaultValue={inputOptions.sugarOption}
                        onChange={(
                          newValue: MultiValue<SelectOptionTypes>,
                          actionMeta: ActionMeta<SelectOptionTypes>
                        ) => {
                          setInputOptions((prev) => ({
                            ...prev,
                            sugarOption: newValue,
                          }));
                          console.log(actionMeta);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="iceOption"
                        className="text-base font-medium"
                      >
                        飲料冰塊
                      </label>
                      <Select
                        id="iceOption"
                        isMulti
                        options={ice_options}
                        styles={MULTISELECTSTYLES}
                        defaultValue={inputOptions.iceOption}
                        onChange={(
                          newValue: MultiValue<SelectOptionTypes>,
                          actionMeta: ActionMeta<SelectOptionTypes>
                        ) => {
                          setInputOptions((prev) => ({
                            ...prev,
                            iceOption: newValue,
                          }));
                          console.log(actionMeta);
                        }}
                      />
                    </div>
                  </div>
                )}
              <StaffDefaultInput
                label="產品價格"
                id="price"
                name="price"
                type="number"
                placeholder="請輸入產品價格"
                ref={priceRef}
              />
              <div className="flex flex-col gap-4">
                <StaffTextareaInput
                  label="產品介紹"
                  id="descriptionzh"
                  name="descriptionzh"
                  placeholder="請輸入產品介紹"
                  ref={descriptionzhRef}
                />
                <StaffTextareaInput
                  label="Product Description"
                  id="descriptionen"
                  name="descriptionen"
                  placeholder="Enter the product description"
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

export default StaffProductModals;
