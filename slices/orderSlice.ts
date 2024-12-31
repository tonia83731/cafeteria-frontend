import { CartItemProps } from "@/types/cart-type";
import { DefaultOptionType } from "@/types/default-input";
import { UserProfileType } from "@/types/user-auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  cartLists: CartItemProps[];
  // editProduct: {
  //   id: number | null;
  //   quantity: number;
  //   sizeId: number | null;
  //   iceId: number | null;
  //   sugarId: number | null;
  //   item_total: number;
  // };
  price: {
    productPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  };
  formSteps: number;
  orderersInfo: UserProfileType | null;
  basicInfo: {
    shipping: DefaultOptionType | null;
    payment: DefaultOptionType | null;
    discountId: number | null;
    discount: string;
    [key: string]: any;
  };
  couponAvailable: null | boolean;
  recipientInfo: {
    name: string;
    phone: string;
    address: string;
    [key: string]: any;
  };
  // 收貨人是否與訂購人相同
  syncChecked: boolean;
  cardInfo: {
    cardName: string;
    cardNumber: string;
    cardDate: string;
    cardCVC: string;
    [key: string]: any;
  };
  validation: {
    basicInfo: boolean;
    recipientInfo: boolean;
    cardInfo: boolean;
  };
}

const initialState: OrderState = {
  cartLists: [],
  price: {
    productPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  formSteps: 0,
  orderersInfo: null,

  basicInfo: {
    shipping: null,
    payment: null,
    discountId: null,
    discount: "",
  },
  couponAvailable: null,
  recipientInfo: {
    name: "",
    phone: "",
    address: "",
  },
  syncChecked: false,
  cardInfo: {
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCVC: "",
  },

  validation: {
    basicInfo: false,
    recipientInfo: false,
    cardInfo: false,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updatedFormSteps(state, actions) {
      const { type } = actions.payload;
      if (type === "prev") {
        state.formSteps = state.formSteps - 1;
      }
      if (type === "next") {
        state.formSteps = state.formSteps + 1;
      }
    },
    updatedCouponStatus(state, actions) {
      const { status } = actions.payload;
      state.couponAvailable = status;
    },
    updatedSyncChecked(state) {
      state.syncChecked = !state.syncChecked;
      if (state.syncChecked) {
        state.recipientInfo = {
          name: "",
          phone: "",
          address: "",
        };
      } else if (state.orderersInfo) {
        state.recipientInfo = {
          name: state.orderersInfo.name || "",
          phone: state.orderersInfo.phone || "",
          address: state.orderersInfo.address || "",
        };
      }
    },
    updatedFormInfo(
      state,
      actions: PayloadAction<{
        formType: "basicInfo" | "recipientInfo" | "cardInfo";
        name: string;
        value: any;
      }>
    ) {
      const { formType, name, value } = actions.payload;

      if (state[formType] && typeof state[formType] === "object") {
        state[formType][name] = value;
      } else {
        console.warn(`Invalid formType: ${formType}`);
      }
    },
    updatedOrderPrice(
      state,
      actions: PayloadAction<{
        name: "productPrice" | "shippingPrice" | "taxPrice" | "totalPrice";
        value: number;
      }>
    ) {
      const { name, value } = actions.payload;
      state.price[name] = value;
    },
    updatedFormValidation(
      state,
      actions: PayloadAction<{
        type: "basicInfo" | "recipientInfo" | "cardInfo";
        value: boolean;
      }>
    ) {
      const { type, value } = actions.payload;
      state.validation[type] = value;
    },
    getOrderersInfo(state, actions) {
      const { info } = actions.payload;
      state.orderersInfo = info;
    },
    getCartLists(state, actions) {
      const { data } = actions.payload;
      state.cartLists = data;
    },
  },
});

export const {
  updatedFormSteps,
  updatedCouponStatus,
  updatedSyncChecked,
  updatedFormInfo,
  updatedOrderPrice,
  updatedFormValidation,
  getOrderersInfo,
  getCartLists,
} = orderSlice.actions;
export default orderSlice.reducer;
