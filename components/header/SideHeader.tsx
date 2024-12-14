import { useRouter } from "next/router";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import LogoLink from "./LogoLink";
import LanguageLink from "./LanguageLink";
import { HeaderProps } from "@/types/header";

const SideHeader = ({ navlinks, onSignOut }: HeaderProps) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`hidden md:block fixed top-0 left-0 z-[100] md:w-1/2 md:max-w-[60px] ${
        pathname !== `/` && "lg:w-1/3 lg:max-w-[240px]"
      } h-screen bg-ivory text-natural font-italiana text-xl`}
    >
      <nav className="h-screen">
        <LogoLink />
        <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-between">
          <div className="flex flex-col">
            {navlinks.map((nav) => {
              if (nav.position === 2 || nav.isHidden) return;
              return <NavLink {...nav} key={nav.title} />;
            })}
          </div>
          <div className="flex flex-col">
            {navlinks.map((nav) => {
              if (nav.position === 1 || nav.isHidden) return;
              if (nav.href === "#") {
                return (
                  <NavButton
                    {...nav}
                    key={nav.title}
                    onButtonClick={onSignOut}
                  />
                );
              }
              return <NavLink {...nav} key={nav.title} />;
            })}
            <div className="flex items-center gap-2 px-4 py-2">
              <LanguageLink />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideHeader;
