import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { serverFetch_unauth, clientFetch } from "@/lib/fetch";
import FrontLayout from "@/components/layout/FrontLayout";
import MenuCategory from "@/components/menu-page/MenuCategory";
import MenuSearch from "@/components/menu-page/MenuSearch";
import MenuProduct from "@/components/menu-page/MenuProduct";
import { MenuPageData } from "@/types/menu-type";
import { CategoryProps } from "../types/default";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const MenuPage = ({ categories, products }: MenuPageData) => {
  const t = useTranslations("Menu");
  const token = getCookie("authToken");
  const { locale } = useRouter();
  const [selectCategory, setSelectCategory] = useState<number | null>(null);
  const [productLists, setProductLists] = useState(products);
  const [inputValue, setInputValue] = useState("");

  const handleCategorySelect = async (categoryId: number) => {
    setSelectCategory(categoryId);
    if (!categoryId) {
      setProductLists(products);
      return;
    }
    try {
      const response = await clientFetch(`/products?categoryId=${categoryId}`);
      //   console.log(response);
      if (response.success) {
        setProductLists(response.data);
        setSelectCategory(categoryId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchClick = () => {
    const filter_products = products.filter(
      (item: any) =>
        item.title.zh.includes(inputValue) ||
        item.title.en.toLowerCase().includes(inputValue.toLowerCase())
    );
    setProductLists(filter_products);
  };
  const handleClearClick = () => {
    setInputValue("");
    setProductLists(products);
  };

  const handleWishClick = async (productId: number, isWished: boolean) => {
    if (!token) {
      return;
    }

    const updatedProductList = [...productLists];
    const productIndex = updatedProductList.findIndex(
      (p) => p.id === productId
    );

    // console.log(productId, isWished, productIndex);

    if (!isWished) {
      try {
        const response = await clientFetch(`/wishes/${productId}/add`, {
          method: "POST",
          token,
        });
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
        const response = await clientFetch(`/wishes/${productId}/remove`, {
          method: "DELETE",
          token,
        });
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
    if (!token) return;
    const fetchWishes = async () => {
      try {
        const response = await clientFetch("/wishes/products", {
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
  }, [token]);

  // useEffect(() => {
  //   if (!query.productId || !query.categoryId) return;
  // }, [query]);

  return (
    <FrontLayout title={t("title")}>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <MenuCategory
          category_arr={categories}
          locale={locale as string as "zh" | "en"}
          selectCategory={selectCategory}
          onSelectChange={handleCategorySelect}
        />
        <MenuSearch
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
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
              locale={locale as string as "zh" | "en"}
              onWishClick={handleWishClick}
            />
          );
        })}
      </div>
    </FrontLayout>
  );
};

export default MenuPage;

export async function getStaticProps(context: any) {
  try {
    const categories_res = await serverFetch_unauth("/api/categories");
    const products_res = await serverFetch_unauth("/api/products");

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
    // let sizes;
    // let sugars;
    // let ices;
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
        products: products_res.success ? products_res.data : [],
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        comments: null,
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
}
