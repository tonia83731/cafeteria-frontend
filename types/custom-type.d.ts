import { MultiLangProps } from "./default-input";

export type SizeCustomProps = {
  id: number;
  title: MultiLangProps;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type SugarCustomProps = {
  id: number;
  title: MultiLangProps;
  createdAt: string;
  updatedAt: string;
};

export type IceCustomProps = {
  id: number;
  title: MultiLangProps;
  createdAt: string;
  updatedAt: string;
};

export type SizeOptionProps = {
  id: number;
  title: MultiLangProps;
  price: number;
};

export type OtherOptionProps = {
  id: number;
  title: MultiLangProps;
};

export type PaymentProps = {
  id: number;
  title: MultiLangProps;
  createdAt: string;
  updatedAt: string;
};
export type ShippingProps = PaymentProps & {
  price: number;
};

export type LangOptionType = "zh" | "en";
