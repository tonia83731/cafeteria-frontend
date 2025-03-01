import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import FrontLayout from "@/components/layout/FrontLayout";
import WishProduct from "@/components/wish-page/WishProduct";
import { WishProductProps } from "@/types/menu-type";
import { authFetch } from "@/lib/server-fetch";
import { clientFetch } from "@/lib/client-fetch";

interface WishPageData {
  wishes: WishProductProps[];
  userId: number | null;
}

const WishPage = ({ wishes }: WishPageData) => {
  const t = useTranslations("Wish");
  const { locale, query } = useRouter();
  const { account } = query;
  const [wishProducts, setWishProducts] = useState<WishProductProps[]>(wishes);

  const handleWishRemove = async (productId: number) => {
    try {
      const response = await clientFetch(
        `/wishes/${account}/${productId}/remove`,
        "DELETE",
        true
      );

      if (response?.success) {
        const updatedWishProducts = wishProducts.filter(
          (product) => product.id !== productId
        );
        setWishProducts(updatedWishProducts);
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
              locale={locale as string}
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
  const { account } = context.query;

  try {
    const authChecked = await authFetch(context, `/users/checked-auth`, "GET");

    if (!authChecked.isAuth) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const response = await authFetch(
      context,
      `/wishes/${account}/products`,
      "GET"
    );

    let wishes = [];
    if (response.success) {
      const data = response.data;

      wishes = data.map((wish: any) => {
        return { ...wish, isWished: true };
      });
    }

    return {
      props: {
        wishes,
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        wishes: [],
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
