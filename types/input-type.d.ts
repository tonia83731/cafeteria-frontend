export type QuantityBoxProps = {
  quantity: number;
  onQuantityClick: (type: "plus" | "minus") => void;
};

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

export type InputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  icon?: ReactNode;
  placeholder: string;
  value: any;
  isDisabled?: boolean;
  className?: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FileInputProps = {
  accept?: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
