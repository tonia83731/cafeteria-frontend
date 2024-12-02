import StaffLayout from "@/components/common/layout/StaffLayout";
const DashboardOrdersPage = () => {
  return (
    <StaffLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">訂單列表</h1>
      </div>
    </StaffLayout>
  );
};

export default DashboardOrdersPage;
