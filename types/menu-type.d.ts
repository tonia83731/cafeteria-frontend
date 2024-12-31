import { MultiLangProps } from "./default-input";

export type CategoryProps = {
  id: number;
  title: MultiLangProps;
  code: string;
};

export type MenuProductsProps = {
  id: number;
  title: MultiLangProps;
  description: MultiLangProps;
  price: number;
  image: string;
  categoryId: number;
  locale: "en" | "zh";
  optionToggle: boolean;
  sizeOption: number;
  sugarOption: number;
  iceOption: number;
  isWished: boolean;
  onWishClick: (productId: number, isWished: boolean) => void;
};

export interface MenuPageData {
  categories: CategoryOptionProps[];
  products: MenuProductsProps[];
  sizes: SizeCustomProps[];
  sugars: DefaultCustomProps[];
  ices: DefaultCustomProps[];
}

export type WishProductProps = {
  id: number;
  title: MultiLangProps;
  description: MultiLangProps;
  price: number;
  categoryId: number;
  image: string;
  isWished: boolean;
  createdAt: string;
  updatedAt: string;
};
