import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import FrontLayout from "@/components/layout/FrontLayout";
import WishProduct from "@/components/wish-page/WishProduct";
import { clientFetch, authFetch } from "@/lib/fetch";
import { toast } from "react-toastify";
import { WishProductProps } from "@/types/menu-type";

interface WishPageData {
  wishes: WishProductProps[];
  userId: number | null;
}

const WishPage = ({ wishes, userId }: WishPageData) => {
  const t = useTranslations("Wish");
  const token = getCookie("authToken");
  const { locale } = useRouter();
  const [wishProducts, setWishProducts] = useState(wishes);

  const handleWishRemove = async (productId: number) => {
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
  const { user_id } = context.query;

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
      `/wishes/${user_id}/all-products`,
      "GET"
    );

    return {
      props: {
        wishes: response.success ? response.data : [],
        userId: user_id,
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        wishes: [],
        userId: null,
        messages: (await import(`../../messages/${context.locale}.json`))
          .default,
      },
    };
  }
};
