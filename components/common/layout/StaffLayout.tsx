import { ReactNode } from "react";
import StaffHeader from "@/components/staff/StaffHeader";

const StaffLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-noto_sans">
      <StaffHeader />
      <div className="pt-[150px] pb-6 w-11/12 xl:w-full mx-auto max-w-[1200px]">
        {children}
      </div>
    </div>
  );
};

export default StaffLayout;
