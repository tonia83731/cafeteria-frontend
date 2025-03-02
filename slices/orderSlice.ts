import { CartItemProps } from "@/types/cart-type";
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

  shipping: number;
  payment: number;
  couponAvailable: null | boolean;
  discountId: null | number;
  discountCode: string;
  discountType: number | null;
  discountValue: number;
  discount: number;

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
  shipping: 0,
  payment: 0,
  couponAvailable: null,
  discountId: null,
  discountCode: "",
  discountType: null,
  discountValue: 0,
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
    updatedCouponChange(
      state,
      actions: PayloadAction<{
        value: string;
      }>
    ) {
      const { value } = actions.payload;
      state.discountCode = value;
    },
    updatedCouponStatus(
      state,
      actions: PayloadAction<{
        status: boolean;
        coupon: {
          discountId: number;
          discountCode: string;
          discountType: number;
          discountValue: number;
        } | null;
      }>
    ) {
      const { status, coupon } = actions.payload;
      state.couponAvailable = status;
      if (status && coupon) {
        const { discountId, discountCode, discountType, discountValue } =
          coupon;
        state.discountId = discountId;
        state.discountCode = discountCode;
        state.discountType = discountType;
        state.discountValue = discountValue;

        let discount = 0;

        if (discountType === 1) {
          discount = discountValue;
        } else {
          discount = state.price.productPrice * (discountValue / 100);
        }
        state.discount = discount;
        state.price.totalPrice -= discount;
      }
    },
    removeCouponStatus(state) {
      if (!state.couponAvailable) return;
      if (state.couponAvailable) {
        state.couponAvailable = false;
        state.discountId = null;
        state.discountType = null;
        state.discountValue = 0;
        state.price.totalPrice += state.discount;
        state.discount = 0;
      }
    },
    updatedPaymentInfo(
      state,
      actions: PayloadAction<{
        name: "shipping" | "payment";
        value: string;
      }>
    ) {
      const { name, value } = actions.payload;
      state[name] = Number(value);
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
  updatedCouponChange,
  updatedCouponStatus,
  removeCouponStatus,
  updatedOrderPrice,
  getOrderersInfo,
  updatedRecipientInfo,
  updatedSyncChecked,
  updatedPaymentInfo,
  getCartLists,
  getQtyCount,
} = orderSlice.actions;
export default orderSlice.reducer;
