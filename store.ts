import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import customReducer from "@/slices/customSlice";
import orderReducer from "@/slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    custom: customReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
