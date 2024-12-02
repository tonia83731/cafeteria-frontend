import { category_dummy } from "@/dummy/category_dummy";
import StaffLayout from "@/components/common/layout/StaffLayout";
import StaffProductModals from "@/components/staff/StaffProductModals";
import StaffProductCategory from "@/components/staff/StaffProductCategory";
import StaffSearch from "@/components/staff/StaffSearch";
const DashboardProductsPage = () => {
  return (
    <StaffLayout>
      <div className="flex flex-col gap-6">
        <div className="mb-4 gap-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">產品列表</h1>
          <StaffProductModals type="create" />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <StaffProductCategory category_arr={category_dummy} />
          <StaffSearch
            placeholder="請輸入產品名稱"
            className="md:justify-self-end md:w-4/5"
          />
        </div>
        <div className=""></div>
      </div>
    </StaffLayout>
  );
};

export default DashboardProductsPage;
