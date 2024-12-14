export type MultiLangProps = {
  zh: string;
  en: string;
};
export type DefaultCustomProps = {
  id: number;
  title: MultiLangProps;
};
export type SizeCustomProps = DefaultCustomProps & {
  price: number;
};
export type CategoryProps = {
  id: number;
  code: string;
};
export type OptionType = { label: string; value: number };
