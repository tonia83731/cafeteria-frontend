"use client";
import { useRef, useState } from "react";
import Select from "react-select";
import { handleOptions, CARTSELECTSTYLES } from "@/constants/select-style";
import { shipping_dummy } from "@/dummy/order_dummy";
import { payment_dummy } from "../../dummy/order_dummy";
import CartInput from "./CartInput";

const shipping_options = handleOptions(shipping_dummy, "en");
const payment_options = handleOptions(payment_dummy, "en");

const CartInfoSteps = () => {
  const [currStep, setCurrStep] = useState(1);
  return (
    <div className="flex flex-col gap-6">
      {currStep === 1 && <CartStep1 />}
      {currStep === 2 && <CartStep2 />}
      {currStep === 3 && <CartStep3 />}
      <div
        className={`flex ${
          currStep === 1 ? "justify-end" : "justify-between"
        } items-center gap-2`}
      >
        <button
          onClick={() => setCurrStep(currStep - 1)}
          className={
            currStep === 1
              ? "hidden"
              : "bg-moss-60 text-white py-1 w-[80px] md:h-full rounded-lg "
          }
        >
          Prev
        </button>
        <button
          onClick={() => setCurrStep(currStep + 1)}
          className={
            currStep === 3
              ? "hidden"
              : "bg-apricot text-white py-1 w-[80px] md:h-full rounded-lg hover:shadow-md"
          }
        >
          Next
        </button>
        {currStep === 3 && (
          <button className="bg-apricot text-white py-1 w-[80px] md:h-full rounded-lg hover:shadow-md">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const CartStep1 = () => {
  const shippingRef = useRef(null);
  const paymentRef = useRef(null);
  return (
    <>
      <h5 className="text-xl font-medium">Order Info.</h5>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="shipping" className="text-base font-medium">
            Shipping
          </label>
          <Select
            id="shipping"
            ref={shippingRef}
            options={shipping_options}
            styles={CARTSELECTSTYLES}
            defaultValue={shipping_options[0]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="payment" className="text-base font-medium">
            Payment
          </label>
          <Select
            id="payment"
            ref={paymentRef}
            options={payment_options}
            defaultValue={payment_options[0]}
            styles={CARTSELECTSTYLES}
          />
        </div>
      </div>
    </>
  );
};
const CartStep2 = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  return (
    <>
      <h5 className="text-xl font-medium">Recipient Info.</h5>
      <div className="flex flex-col gap-4">
        <CartInput
          label="Name"
          id="name"
          name="name"
          ref={nameRef}
          placeholder="Cafe Maniac"
        />
        <CartInput
          label="Phone"
          id="phone"
          name="phone"
          ref={phoneRef}
          type="tel"
          placeholder="12345678"
        />
        <CartInput
          label="Address"
          id="address"
          name="address"
          ref={addressRef}
          placeholder="The Cafe Rd. 520"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="user-check"
            className="accent-apricot w-4 h-4"
          />
          <label htmlFor="user-check" className="">
            Apply User Information
          </label>
        </div>
      </div>
    </>
  );
};
const CartStep3 = () => {
  // const nameRef = useRef(null);
  const numberRef = useRef(null);
  const dateRef = useRef(null);
  const cvcRef = useRef(null);
  return (
    <>
      <h5 className="text-xl font-medium">Payment Info.</h5>
      <div className="flex flex-col gap-4">
        <button className="py-1.5 rounded-lg text-center border border-ivory text-ivory hover:bg-ivory hover:border-0 hover:text-fern shadow-sm">
          Choose card
        </button>
        <CartInput
          label="Card Number"
          id="card-number"
          name="card-number"
          ref={numberRef}
          placeholder="1111 2222 3333 4444"
        />
        <div className="grid grid-cols-2 gap-4">
          <CartInput
            label="Date"
            id="date"
            name="date"
            ref={dateRef}
            placeholder="11/31"
          />
          <CartInput
            label="CVC"
            id="cvc"
            name="cvc"
            ref={cvcRef}
            placeholder="123"
          />
        </div>
      </div>
    </>
  );
};

export default CartInfoSteps;
