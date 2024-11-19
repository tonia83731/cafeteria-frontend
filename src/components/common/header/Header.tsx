import TopBar from "./TopBar";
import SideBar from "./SideBar";
const FrontHeader = ({ locale }: { locale: string }) => {
  return (
    <header>
      <div className="md:hidden">
        <TopBar locale={locale} />
      </div>
      <div className="hidden md:block">
        <SideBar locale={locale} />
      </div>
    </header>
  );
};

export default FrontHeader;
