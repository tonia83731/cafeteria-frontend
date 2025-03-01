import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type WishProductsProps = {
  id: number;
  title: string;
  title_en: string;
  price: number;
  image: string;
  categoryId: number;
  locale: string;
  isWished: boolean;
  onWishClick: (productId: number) => void;
};

const WishProduct = ({
  id,
  title,
  title_en,
  price,
  image,
  locale,
  isWished,
  onWishClick,
}: WishProductsProps) => {
  const t = useTranslations("Wish");
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col gap-2">
      <div className="grid grid-cols-[100px_2fr] gap-4 items-center">
        <div className="w-[100px] h-[100px] relative justify-self-center">
          <Image
            src={image}
            alt={locale === "en" ? title_en : title}
            width={200}
            height={200}
            className="w-[100px] h-[100px] opacity-90 object-cover"
          ></Image>
          <button
            disabled={!isAuth && !isWished}
            onClick={() => onWishClick(id)}
            className={`absolute top-1 left-1 text-xl ${
              isWished ? "text-heart" : "text-fern-60"
            } hover:text-heart-60 disabled:hover:text-fern-60`}
          >
            <FaHeart />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="text-lg font-bold flex justify-between">
            <h5>{locale === "en" ? title_en : title}</h5>
            <div className="text-apricot">${price}</div>
          </div>
          <div className="w-full flex justify-end">
            <Link
              href={`/menu`}
              className="bg-apricot text-white px-4 h-9 leading-9 rounded-lg hover:shadow-md"
            >
              {t("purchase")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishProduct;
