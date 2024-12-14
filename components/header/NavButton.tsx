import { useRouter } from "next/router";
import { NavLinkProps } from "@/types/header";

type NavButtonProps = NavLinkProps & {
  onButtonClick: () => void;
};
const NavButton = ({ title, icon, onButtonClick }: NavButtonProps) => {
  const { pathname } = useRouter();
  return (
    <button
      onClick={onButtonClick}
      className="flex items-center gap-2 px-4 py-2"
    >
      <div
        className={`bg-natural text-ivory hover:bg-ivory hover:text-natural w-6 h-6 rounded-full flex justify-center items-center text-lg`}
      >
        {icon}
      </div>
      <div
        className={`text-natural hover:text-ivory md:hidden ${
          pathname !== "/" && "lg:block"
        }`}
      >
        {title}
      </div>
    </button>
  );
};

export default NavButton;
