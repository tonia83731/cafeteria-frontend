import Link from "next/link";
import { useRouter } from "next/router";
import { PiCoffeeBeanFill } from "react-icons/pi";

const LogoLink = () => {
  const { pathname } = useRouter();
  return (
    <Link
      href="/"
      className="text-2xl sm:text-3xl flex items-center gap-1.5 md:px-4 md:w-full h-[75px] leading-[75px]"
    >
      <div className="md:text-natural md:flex md:justify-center md:items-center md:text-3xl">
        <PiCoffeeBeanFill />
      </div>
      <div
        className={`md:hidden ${
          pathname !== "/signin" &&
          pathname !== "/signup" &&
          pathname !== "/" &&
          "lg:block"
        }`}
      >
        THE CAFE
      </div>
    </Link>
  );
};

export default LogoLink;
