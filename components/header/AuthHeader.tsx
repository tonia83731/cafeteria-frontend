import LogoLink from "./LogoLink";
import LanguageLink from "./LanguageLink";
const AuthHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[75px] leading-[75px] px-4 flex justify-between items-center bg-ivory text-natural md:h-full md:min-h-screen md:w-[60px] md:flex-col md:px-0 md:pb-8">
      <LogoLink />
      <LanguageLink />
    </header>
  );
};

export default AuthHeader;
