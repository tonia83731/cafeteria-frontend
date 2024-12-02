import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import MenuCategory from "@/components/menu/MenuCategory";
import MenuSearch from "@/components/menu/MenuSearch";
import MenuProduct from "@/components/menu/MenuProduct";
import Pagination from "@/components/common/Pagination";
import { useTranslations } from "next-intl";
// import { category_dummy } from "@/dummy/category_dummy";
// import { product_dummy } from "@/dummy/product_dummy";
import { useLocale } from "next-intl";
import { InferGetStaticPropsType } from "next";
import { defaultfetch } from "@/lib/fetch";

export type ProductAPIData = {
  id: number;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  image: string;
  price: string;
  categoryCode: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoryAPIData = {
  title: {
    en: string;
    zh: string;
  };
  code: string;
};

const MenuPage = ({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const locale = useLocale() as "en" | "zh";
  const t = useTranslations("Menu");
  console.log(products);
  // console.log(categories);

  // const category_options = []
  return (
    <FrontTitleLayout title={t("title")}>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <MenuCategory category_arr={categories} locale={locale} />
        <MenuSearch />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((product: ProductAPIData) => {
          return <MenuProduct {...product} key={product.id} locale={locale} />;
        })}
      </div>
      <Pagination />
    </FrontTitleLayout>
  );
};

export default MenuPage;

export async function getStaticProps(context: any) {
  try {
    const [categoriesResponse, productsResponse] = await Promise.all([
      defaultfetch("/api/categories"),
      defaultfetch("/api/products"),
    ]);

    const cate_matched = [
      null,
      null,
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

    let category_data = categoriesResponse.data.map(
      ({ id, code }: { id: number; code: string }) => ({
        title: cate_matched[id - 1],
        code,
      })
    );

    category_data = [
      {
        title: {
          zh: "全部",
          en: "All",
        },
        code: "ALL",
      },
      ...category_data,
    ];

    const messages = (await import(`../../messages/${context.locale}.json`))
      .default;

    return {
      props: {
        products: productsResponse.data,
        categories: category_data,
        messages,
      },
    };
  } catch (error) {
    console.error("Error fetching data for static props:", error);
    return {
      props: {
        products: [],
        categories: [],
        messages: {},
      },
    };
  }
}
