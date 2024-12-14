import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import FrontLayout from "@/components/layout/FrontLayout";
import WishProduct from "@/components/wish-page/WishProduct";
import { clientFetch, serverFetch } from "@/lib/fetch";
import { toast } from "react-toastify";

interface WishPageData {
  wishes: any[];
}

const WishPage = ({ wishes }: WishPageData) => {
  const t = useTranslations("Wish");
  const token = getCookie("authToken");
  const { locale } = useRouter();
  const [wishProducts, setWishProducts] = useState(wishes);

  const handleWishRemove = async (productId: number) => {
    try {
      const response = await clientFetch(`/wishes/${productId}/remove`, {
        method: "DELETE",
        token,
      });
      if (response.success) {
        toast.success(t("message.removed-wish-success"));
        const updated_products = wishProducts.filter(
          (product) => product.id !== productId
        );
        setWishProducts(updated_products);
      } else {
        toast.error(t("message.removed-wish-failed"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FrontLayout title={`${t("title")}`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {wishProducts.map((wish, index) => {
          return (
            <WishProduct
              {...wish}
              key={`wishproduct-${index}`}
              locale={locale}
              onWishClick={handleWishRemove}
            />
          );
        })}
      </div>
    </FrontLayout>
  );
};

export default WishPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await serverFetch(
      context,
      "/api/wishes/all-products",
      "GET"
    );

    return {
      props: {
        wishes: response.success ? response.data : [],
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        wishes: [],
        messages: (await import(`../messages/${context.locale}.json`)).default,
      },
    };
  }
};
