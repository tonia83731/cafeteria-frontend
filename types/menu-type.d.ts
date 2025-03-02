import { MultiLangProps } from "./default-input";

export type CategoryProps = {
  id: number;
  title: MultiLangProps;
  code: string;
  hasOpts: boolean;
};

export type MenuProductsProps = {
  id: number;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  price: number;
  image: string;
  categoryId: number;
  locale: "en" | "zh";
  optionToggle: boolean;
  sizeOption: number;
  sugarOption: number;
  iceOption: number;
  isWished: boolean | null;
  hasOpts?: boolean;
  onWishClick: (productId: number, isWished: boolean | null) => void;
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
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  price: number;
  categoryId: number;
  image: string;
  isWished: boolean;
  createdAt: string;
  updatedAt: string;
};
