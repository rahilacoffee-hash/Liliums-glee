import { lazy, Suspense } from "react";
import DashboardCards from "./DashboardCards";
import RecentOrders from "./RecentOrders";
import LowStock from "./LowStock";
import DeferredChart from "./DeferredChart";

const RevenueChart = lazy(() => import("./RevenueChart"));
const SalesByCategory = lazy(() => import("./SalesByCategory"));

function ChartFallback() {
  return <div className="h-[420px] animate-pulse rounded-2xl bg-white" />;
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Welcome back! Here's what's happening in your store today.
          </p>
        </div>
      </div>

      <DashboardCards />

      <Suspense fallback={<ChartFallback />}>
        <DeferredChart>
          <RevenueChart />
        </DeferredChart>
        <DeferredChart>
          <SalesByCategory />
        </DeferredChart>
      </Suspense>

      <div className="grid gap-8 xl:grid-cols-2">
        <RecentOrders />
        <LowStock />
      </div>
    </div>
  );
}

export default Dashboard;
