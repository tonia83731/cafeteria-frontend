import { ReactNode } from "react";
import FrontHeader from "@/components/common/header/Header";
// import LocaleSwitcher from "@/components/common/LocaleSwitcher";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <FrontHeader />
      <div className="pt-[100px] pb-[60px] md:py-12 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px] lg:w-[calc(100%-240px)] lg:pl-[240px]">
        <div className="mx-auto max-w-[1200px] w-11/12 md:w-full">
          <div className="pb-12 w-full flex justify-end">
            <div className="w-1/3 max-w-[120px]">
              {/* <LocaleSwitcher direction="down" /> */}
            </div>
          </div>
          <div className="flex flex-col gap-8 md:w-1/2 max-w-[900px] mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
