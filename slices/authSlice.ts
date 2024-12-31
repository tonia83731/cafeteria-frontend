// https://www.youtube.com/watch?v=ss-_S1Vyxa0
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SigninInputProps,
  SignupInputProps,
  UserInputProps,
} from "@/types/user-auth.type";
import { ErrorProps } from "@/types/default-input";
import { deleteCookie } from "cookies-next";
import { LangOptionType } from "@/types/custom-type";

interface AuthState {
  isAuth: boolean;
  userId: number | null;
  userLanguage: "en" | "zh";
  signinInput: SigninInputProps;
  signupInput: SignupInputProps;
  userInput: UserInputProps;
  isError: ErrorProps;
}

const initialState: AuthState = {
  isAuth: false,
  userId: null,
  userLanguage: "zh",
  signinInput: {
    email: "",
    password: "",
  },
  signupInput: {
    name: "",
    password: "",
    email: "",
    account: "",
    phone: "",
  },
  userInput: {
    name: "",
    account: "",
    password: "",
    email: "",
    phone: null,
    address: null,
    language: {
      value: "zh",
      label: "中文",
    },
    invoice: "",
  },
  isError: {
    status: false,
    message: "",
  },
};

const authSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
    resetForm(state) {
      state.signinInput = initialState.signinInput;
      state.signupInput = initialState.signupInput;
      state.userInput = initialState.userInput;
      state.isError = initialState.isError;
    },
    updatedAuthStatus(
      state: AuthState,
      action: PayloadAction<{
        isAuth: boolean;
        user: {
          id: number | null;
          language: LangOptionType;
        };
      }>
    ) {
      const { isAuth, user } = action.payload;
      state.isAuth = isAuth;
      state.userId = user?.id;
      state.userLanguage = user?.language;
    },
    updatedInputChange(
      state: AuthState,
      action: PayloadAction<{
        type: "signinInput" | "signupInput" | "userInput";
        name: string;
        value: any;
      }>
    ) {
      const { type, name, value } = action.payload;

      if (name in state[type]) {
        (state[type] as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
    updatedInputError(
      state: AuthState,
      action: PayloadAction<{ error: ErrorProps }>
    ) {
      const { error } = action.payload;
      state.isError = error;
    },
    userSignOut() {
      deleteCookie("authToken");
    },
    getUserInput(
      state: AuthState,
      action: PayloadAction<{ inputValue: UserInputProps }>
    ) {
      const { inputValue } = action.payload;
      state.userInput = inputValue;
    },
  },
});

export const {
  resetForm,
  updatedAuthStatus,
  // updatedSignupChange,
  updatedInputChange,
  updatedInputError,
  userSignOut,
  getUserInput,
} = authSlice.actions;

export default authSlice.reducer;
