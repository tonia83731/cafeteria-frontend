import { CartItemProps } from "@/types/cart-type";
import { DefaultOptionType } from "@/types/default-input";
import { UserProfileType } from "@/types/user-auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  cartLists: CartItemProps[];
  cartTotalQty: number;
  price: {
    productPrice: number;
    taxPrice: number;
    totalPrice: number;
  };

  shipping: DefaultOptionType | null;
  payment: DefaultOptionType | null;
  couponAvailable: null | boolean;
  discountCode: string;
  discount: 0;

  orderersInfo: UserProfileType | null;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  // 收貨人是否與訂購人相同
  syncChecked: boolean;
}

const initialState: OrderState = {
  cartLists: [],
  cartTotalQty: 0,
  price: {
    productPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  shipping: null,
  payment: null,
  couponAvailable: null,
  discountCode: "",
  discount: 0,

  orderersInfo: null,
  recipientName: "",
  recipientPhone: "",
  recipientAddress: "",
  syncChecked: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updatedSyncChecked(state, actions) {
      const { checked } = actions.payload;
      state.syncChecked = checked;
      if (checked && state.orderersInfo) {
        state.recipientName = state.orderersInfo.name;
        state.recipientPhone = state.orderersInfo?.phone || "";
        state.recipientAddress = state.orderersInfo?.address || "";
      } else {
        state.recipientName = "";
        state.recipientPhone = "";
        state.recipientAddress = "";
      }
    },
    getOrderersInfo(state, actions) {
      const { info } = actions.payload;
      state.orderersInfo = info;
    },
    updatedRecipientInfo(
      state,
      actions: PayloadAction<{
        name: "recipientName" | "recipientPhone" | "recipientAddress";
        value: string;
      }>
    ) {
      const { name, value } = actions.payload;
      state[name] = value;
    },
    updatedCouponStatus(state, actions) {
      const { status } = actions.payload;
      state.couponAvailable = status;
    },
    updatedOrderPrice(
      state,
      actions: PayloadAction<{
        name: "productPrice" | "taxPrice" | "totalPrice";
        value: number;
      }>
    ) {
      const { name, value } = actions.payload;
      state.price[name] = value;
    },
    getCartLists(state, actions) {
      const { data } = actions.payload;
      state.cartLists = data;
    },
    getQtyCount(state, actions) {
      const { count } = actions.payload;
      state.cartTotalQty = count;
    },
  },
});

export const {
  updatedCouponStatus,
  updatedOrderPrice,
  getOrderersInfo,
  updatedRecipientInfo,
  updatedSyncChecked,
  getCartLists,
  getQtyCount,
} = orderSlice.actions;
export default orderSlice.reducer;
