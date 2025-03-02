import {
  OtherOptionProps,
  PaymentProps,
  ShippingProps,
  SizeOptionProps,
} from "@/types/custom-type";
import { createSlice } from "@reduxjs/toolkit";

interface CustomState {
  sizesOptions: SizeOptionProps[];
  icesOptions: OtherOptionProps[];
  sugarsOptions: OtherOptionProps[];

  shippingOptions: ShippingProps[];
  paymentOptions: PaymentProps[];
}
const initialState: CustomState = {
  sizesOptions: [],
  icesOptions: [],
  sugarsOptions: [],
  shippingOptions: [],
  paymentOptions: [],
};

const customSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    updatedCustomOptions(state, actions) {
      const { sizes, ices, sugars } = actions.payload;
      state.sizesOptions = sizes;
      state.icesOptions = ices;
      state.sugarsOptions = sugars;
    },
    updateOrderOptions(state, actions) {
      const { shipping, payment } = actions.payload;
      state.shippingOptions = shipping;
      state.paymentOptions = payment;
    },
  },
});

export const { updatedCustomOptions, updateOrderOptions } = customSlice.actions;
export default customSlice.reducer;
