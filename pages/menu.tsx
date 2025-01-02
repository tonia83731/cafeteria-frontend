import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { serverFetch, clientFetch } from "@/lib/fetch";
import FrontLayout from "@/components/layout/FrontLayout";
import MenuCategory from "@/components/menu-page/MenuCategory";
import MenuSearch from "@/components/menu-page/MenuSearch";
import MenuProduct from "@/components/menu-page/MenuProduct";
import { CategoryProps, MenuProductsProps } from "@/types/menu-type";
import { PaginationProps } from "@/types/page";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  IceCustomProps,
  LangOptionType,
  OtherOptionProps,
  SizeCustomProps,
  SizeOptionProps,
  SugarCustomProps,
} from "@/types/custom-type";
import { updatedCustomOptions } from "@/slices/customSlice";

export interface MenuPageData {
  categories: CategoryProps[];
  products: MenuProductsProps[];
  sizes: SizeOptionProps[];
  ices: OtherOptionProps[];
  sugars: OtherOptionProps[];
  pagination: PaginationProps;
}

const MenuPage = ({
  categories,
  products,
  sizes,
  ices,
  sugars,
  pagination,
}: MenuPageData) => {
  const t = useTranslations("Menu");
  const token = getCookie("authToken");
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const { userId } = useSelector((state: RootState) => state.auth);

  const [selectCategory, setSelectCategory] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currPage, setCurrPage] = useState(pagination?.currentPage | 1);
  const [totalPage, setTotalPage] = useState(pagination?.totalPages | 1);
  const [productLists, setProductLists] = useState(products);
  console.log(products);

  const handleCategorySelect = async (categoryId: number | null) => {
    if (!categoryId) {
      setProductLists(products);
      setCurrPage(1);
      setTotalPage(pagination?.totalPages);
      setSelectCategory(categoryId);
      return;
    }

    const url = `/products?page=1&categoryId=${categoryId}`;

    try {
      const response = await clientFetch(url);
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
    let url = `/products?page=${page}`;
    if (selectCategory) url += `&categoryId=${selectCategory}`;
    try {
      const response = await clientFetch(url);
      if (response.success) {
        setProductLists(response.data.products);
        setCurrPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumClick = async (num: number) => {
    let url = `/products?page=${num}`;
    if (selectCategory) url += `&categoryId=${selectCategory}`;
    try {
      const response = await clientFetch(url);
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

  const handleWishClick = async (productId: number, isWished: boolean) => {
    if (!token || !userId) {
      return;
    }

    const updatedProductList = [...productLists];
    const productIndex = updatedProductList.findIndex(
      (p) => p.id === productId
    );

    if (!isWished) {
      try {
        const response = await clientFetch(
          `/wishes/${userId}/${productId}/add`,
          {
            method: "POST",
            token,
          }
        );
        if (response.success) {
          toast.success(t("message.added-wish-success"));
          updatedProductList[productIndex].isWished = true;
        } else {
          toast.error(t("message.added-wish-failed"));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await clientFetch(
          `/wishes/${userId}/${productId}/remove`,
          {
            method: "DELETE",
            token,
          }
        );
        if (response.success) {
          toast.success(t("message.removed-wish-success"));
          updatedProductList[productIndex].isWished = false;
        } else {
          toast.error(t("message.removed-wish-failed"));
        }
      } catch (error) {
        console.log(error);
      }
    }
    setProductLists(updatedProductList);
  };

  useEffect(() => {
    if (!token || !userId) return;
    const fetchWishes = async () => {
      try {
        const response = await clientFetch(`/wishes/${userId}/products`, {
          token,
        });
        if (response.success) {
          const data = response.data;
          const updatedProductList = productLists.map((product) => ({
            ...product,
            isWished: data.some((wish: any) => wish.productId === product.id),
          }));
          setProductLists(updatedProductList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishes();
  }, [token, userId]);

  useEffect(() => {
    if (sizes.length === 0 || sugars.length === 0 || ices.length === 0) return;
    dispatch(
      updatedCustomOptions({
        sizes,
        ices,
        sugars,
      })
    );
  }, [sizes, sugars, ices]);

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
          return (
            <MenuProduct
              {...product}
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
  try {
    const [categories_res, products_res] = await Promise.all([
      serverFetch("/categories"),
      serverFetch("/products?page=1"),
    ]);

    const [sizes_res, ices_res, sugars_res] = await Promise.all([
      clientFetch("/sizes", {
        method: "GET",
      }),
      clientFetch("/ices", {
        method: "GET",
      }),
      clientFetch("/sugars", {
        method: "GET",
      }),
    ]);

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
    let categories;
    if (categories_res.success) {
      categories = categories_res.data.map(({ id, code }: CategoryProps) => ({
        id,
        title: cate_matched[id - 3],
        code,
      }));

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
        sizes: sizes_res.success
          ? sizes_res.data.map(({ id, title, price }: SizeCustomProps) => {
              return { id, title, price };
            })
          : [],
        sugars: sugars_res.success
          ? sugars_res.data.map(({ id, title }: SugarCustomProps) => {
              return { id, title };
            })
          : [],
        ices: ices_res.success
          ? ices_res.data.map(({ id, title }: IceCustomProps) => {
              return { id, title };
            })
          : [],
        products: products_res.success ? products_res.data.products : [],
        pagination: products_res.success ? products_res.data.pagination : null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        categories: [],
        sizes: [],
        sugars: [],
        ices: [],
        products: [],
        pagination: null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
}
