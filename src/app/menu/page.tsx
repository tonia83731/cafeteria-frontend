import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import MenuCategory from "@/components/menu/MenuCategory";
import MenuSearch from "@/components/menu/MenuSearch";
import MenuProduct from "@/components/menu/MenuProduct";
import Pagination from "@/components/common/Pagination";
import { useTranslations } from "next-intl";
import { category_dummy } from "@/dummy/category_dummy";
import { product_dummy } from "@/dummy/product_dummy";
import { useLocale } from "next-intl";

const MenuPage = () => {
  const locale = useLocale();
  const t = useTranslations("Menu");
  return (
    <FrontTitleLayout title={t("title")}>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <MenuCategory category_arr={category_dummy} locale={locale} />
        <MenuSearch />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {product_dummy.map((product) => {
          return <MenuProduct {...product} key={product.id} locale={locale} />;
        })}
      </div>
      <Pagination />
    </FrontTitleLayout>
  );
};

export default MenuPage;
