import { MultiLangProps } from "./default";

export type CategoryOptionProps = CategoryProps & {
  title: MultiLangProps;
};

export type MenuProductsProps = {
  id: number;
  title: MultiLangProps;
  description: MultiLangProps;
  price: number;
  image: string;
  categoryId: number;
  locale: "en" | "zh";
  //   sizes: SizeCustomProps[];
  //   sugars: DefaultCustomProps[];
  //   ices: DefaultCustomProps[];
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
