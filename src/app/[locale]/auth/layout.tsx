import { ReactNode } from "react";
import FrontHeader from "@/components/common/header/Header";
const AuthLayout = ({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  return (
    <div>
      <FrontHeader locale={locale} />
      <div className="pt-[100px] pb-[60px] md:pt-24 md:mx-auto md:w-[calc(100%-60px)] md:pl-[60px] lg:w-[calc(100%-240px)] lg:pl-[240px]">
        <div className="w-11/12 mx-auto max-w-[900px] md:w-1/2 xl:w-1/3">
          <div className="flex flex-col gap-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
