import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import FrontLayout from "@/components/layout/FrontLayout";
import MenuCategory from "@/components/menu-page/MenuCategory";
import MenuSearch from "@/components/menu-page/MenuSearch";
import MenuProduct from "@/components/menu-page/MenuProduct";
import { CategoryProps, MenuProductsProps } from "@/types/menu-type";
import { PaginationProps } from "@/types/page";
import { getCookie } from "cookies-next";
import Pagination from "@/components/common/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  LangOptionType,
  OtherOptionProps,
  SizeOptionProps,
} from "@/types/custom-type";
import { serverFetch } from "@/lib/server-fetch";
import { clientFetch } from "@/lib/client-fetch";

export interface MenuPageData {
  categories: CategoryProps[];
  products: MenuProductsProps[];
  sizes: SizeOptionProps[];
  ices: OtherOptionProps[];
  sugars: OtherOptionProps[];
  pagination: PaginationProps;
}

const MenuPage = ({ categories, products, pagination }: MenuPageData) => {
  const t = useTranslations("Menu");
  const token = getCookie("authToken");
  const { locale } = useRouter();
  const { isAuth, userAccount } = useSelector((state: RootState) => state.auth);

  const [selectCategory, setSelectCategory] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currPage, setCurrPage] = useState(pagination?.currentPage | 1);
  const [totalPage, setTotalPage] = useState(pagination?.totalPages | 1);
  const [productLists, setProductLists] = useState(products);

  const handleCategorySelect = async (categoryId: number | null) => {
    if (!categoryId) {
      setProductLists(products);
      setCurrPage(1);
      setTotalPage(pagination?.totalPages);
      setSelectCategory(categoryId);
      return;
    }

    const url = isAuth
      ? `/products-with-wishes?page=1&categoryId=${categoryId}`
      : `/products?page=1&categoryId=${categoryId}`;

    try {
      const response = await clientFetch(url, "GET", isAuth);
      if (response.success) {
        const { products, pagination } = response.data;
        setProductLists(products);
        setSelectCategory(categoryId);
        setTotalPage(pagination.totalPages);
        setCurrPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArrowClick = async (type: "prev" | "next") => {
    const page = type === "prev" ? currPage - 1 : currPage + 1;
    let url = isAuth
      ? `/products-with-wishes?page=${page}`
      : `/products?page=${page}`;
    if (selectCategory) url += `&categoryId=${selectCategory}`;
    try {
      const response = await clientFetch(url, "GET", isAuth);
      if (response.success) {
        setProductLists(response.data.products);
        setCurrPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumClick = async (num: number) => {
    let url = isAuth
      ? `/products-with-wishes?page=${num}`
      : `/products?page=${num}`;
    if (selectCategory) url += `&categoryId=${selectCategory}`;
    try {
      const response = await clientFetch(url, "GET", isAuth);
      if (response.success) {
        setProductLists(response.data.products);
        setCurrPage(num);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = () => {
    const filter_products = products.filter(
      (item: any) =>
        item.title.zh.includes(searchValue) ||
        item.title.en.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductLists(filter_products);
  };
  const handleClearClick = () => {
    setSearchValue("");
    setProductLists(products);
  };

  const handleWishClick = async (
    productId: number,
    isWished: boolean | null
  ) => {
    console.log("click");
    console.log(productId, isWished);

    if (!isWished) {
      await addToWish(productId);
    } else {
      await removeFromWish(productId);
    }
  };

  const addToWish = async (productId: number) => {
    if (!userAccount) return;
    try {
      const response = await clientFetch(
        `/wishes/${userAccount}/${productId}/add`,
        "POST",
        true
      );

      if (response?.success) {
        const updatedProducts = productLists.map((product) => {
          return product.id === productId
            ? { ...product, isWished: true }
            : product;
        });
        setProductLists(updatedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWish = async (productId: number) => {
    if (!userAccount) return;
    try {
      const response = await clientFetch(
        `/wishes/${userAccount}/${productId}/remove`,
        "DELETE",
        true
      );
      if (response?.success) {
        const updatedProducts = productLists.map((product) => {
          return product.id === productId
            ? { ...product, isWished: false }
            : product;
        });
        setProductLists(updatedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchProductWithWish = async () => {
      try {
        const res = await clientFetch(`/products-with-wishes`, "GET", true);
        if (res?.success) {
          const data = res?.data.products;
          setProductLists(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductWithWish();
  }, [token]);

  return (
    <FrontLayout title={t("title")}>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <MenuCategory
          category_arr={categories}
          locale={locale as string as LangOptionType}
          selectCategory={selectCategory}
          onSelectChange={handleCategorySelect}
        />
        <MenuSearch
          inputValue={searchValue}
          onInputChange={(e) => setSearchValue(e.target.value)}
          onSearchClick={handleSearchClick}
          onClearClick={handleClearClick}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {productLists.map((product) => {
          const category = categories.find(
            (cate) => cate.id === product.categoryId
          );
          const hasOpts = category && category.hasOpts;
          return (
            <MenuProduct
              {...product}
              hasOpts={hasOpts}
              key={product.id}
              locale={locale as string as LangOptionType}
              onWishClick={handleWishClick}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <Pagination
          currPage={currPage}
          totalPage={totalPage}
          onArrowClick={handleArrowClick}
          onNumClick={handleNumClick}
        />
      </div>
    </FrontLayout>
  );
};

export default MenuPage;

export async function getStaticProps(context: any) {
  const cate_matched = [
    {
      zh: "咖啡",
      en: "Coffee",
    },
    {
      zh: "茶飲",
      en: "Tea",
    },
    {
      zh: "冰品",
      en: "Frozen",
    },
    {
      zh: "甜點",
      en: "Dessert",
    },
  ];

  try {
    const categoryRes = await serverFetch("/categories", "GET");
    const productsRes = await serverFetch("/products", "GET");

    let categories;
    if (categoryRes.success) {
      categories = categoryRes.data.map(
        ({ id, code, hasOpts }: CategoryProps) => ({
          id,
          title: cate_matched[id - 3],
          code,
          hasOpts,
        })
      );

      categories = [
        {
          id: null,
          title: {
            zh: "全部",
            en: "All",
          },
          code: "ALL",
        },
        ...categories,
      ];
    }

    return {
      props: {
        categories,
        products: productsRes.success ? productsRes.data.products : [],
        pagination: productsRes.success ? productsRes.data.pagination : null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        categories: [],
        products: [],
        pagination: null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
}
