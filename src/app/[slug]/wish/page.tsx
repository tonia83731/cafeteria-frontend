import FrontTitleLayout from "@/components/common/layout/FrontTitleLayout";
import WishProduct from "@/components/wish/WishProduct";
import { wish_dummy } from "@/dummy/wish_dummy";
const WishPage = () => {
  return (
    <FrontTitleLayout title="WISHLIST">
      <div className="grid grid-cols-2 gap-4 md:w-2/3 text-xs md:text-sm">
        <button className="bg-apricot text-white px-4 py-2 md:h-full rounded-lg hover:drop-shadow-sm">
          Move All to Cart
        </button>
        <button className="bg-moss-60 text-white px-4 py-2 md:h-full rounded-lg hover:drop-shadow-sm">
          Remove All from Wishlist
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {wish_dummy.map((product) => {
          return <WishProduct locale={""} {...product} key={product.id} />;
        })}
      </div>
    </FrontTitleLayout>
  );
};

export default WishPage;
