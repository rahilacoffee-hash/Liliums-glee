import DashboardCards from "./DashboardCards";
import RevenueChart from "./RevenueChart";
import RecentOrders from "./RecentOrders";
import LowStock from "./LowStock";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back! Here's what's happening in your store today.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <DashboardCards />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Recent Orders & Low Stock */}
      <div className="grid gap-8 xl:grid-cols-2">
        <RecentOrders />

        <LowStock />
      </div>
    </div>
  );
}

export default Dashboard;