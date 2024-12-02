import StaffLayout from "@/components/common/layout/StaffLayout";
import StaffCouponModals from "@/components/staff/StaffCouponModals";
import StaffSearch from "@/components/staff/StaffSearch";
const DashboardCouponsPage = () => {
  return (
    <StaffLayout>
      <div className="flex flex-col gap-6">
        <div className="mb-4 gap-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">優惠券列表</h1>
          <StaffCouponModals type="create" />
        </div>
        <div className="w-full md:flex md:justify-end">
          <StaffSearch
            placeholder="請輸入優惠券名稱或code"
            className="md:w-2/5"
          />
        </div>
        <div className=""></div>
      </div>
    </StaffLayout>
  );
};

export default DashboardCouponsPage;
