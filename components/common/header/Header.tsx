import TopBar from "./TopBar";
import SideBar from "./SideBar";
const FrontHeader = () => {
  return (
    <header>
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="hidden md:block">
        <SideBar />
      </div>
    </header>
  );
};

export default FrontHeader;
