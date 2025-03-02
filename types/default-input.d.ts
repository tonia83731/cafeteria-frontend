export type ErrorProps = {
  status: boolean;
  message: string;
};

export type MultiLangProps = {
  zh: string;
  en: string;
};

export type DefaultInputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  icon?: ReactNode;
  placeholder: string;
  value: any;
  isDisabled?: boolean;
  className?: string;
  onInputChange: (name: string, value: any) => void;
};

export type DefaultOptionType = { label: string; value: any };

export type DefaultSelectProps = {
  label: string;
  type: string;
  //   name: string;
  isHidden?: boolean;
  selectOptions: PaymentProps[];
  selectValue: {
    value: number;
    label: string;
  } | null;
  dropdownToggle: boolean;
  onDropdownToggle: (type: string) => void;
  onOptionClick: (option: { value: number; label: string }) => void;
};

export type FileInputProps = {
  accept?: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type QuantityBoxProps = {
  quantity: number;
  onQuantityClick: (type: "plus" | "minus") => void;
};

export type ReactSelectProps = {
  label: string;
  value: any;
};

// export type DefaultCustomProps = {
//   id: number;
//   title: MultiLangProps;
// };
// export type SizeCustomProps = DefaultCustomProps & {
//   price: number;
// };
// export type CategoryProps = {
//   id: number;
//   code: string;
// };
