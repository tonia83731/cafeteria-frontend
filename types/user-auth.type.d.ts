export type SigninInputProps = {
  email: string;
  password: string;
};

export type SignupInputProps = {
  name: string;
  password: string;
  email: string;
  account: string;
};

export type UserInputProps = {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string | null;
  address: string | null;
  language: DefaultOptionType;
  invoice: string;
};

export type UserProfileType = {
  id: number;
  name: string;
  account: string;
  email: string;
  language: LangOptionType;
  password: string;
  address: string | null;
  phone: string | null;
  invoice: string | null;
};

export type UserProps = UserProfileType & {
  password: string;
  address: string | null;
  phone: string | null;
  isAdmin: boolean;
  invoice: string | null;
  createdAt: string;
  updatedAt: string;
};
