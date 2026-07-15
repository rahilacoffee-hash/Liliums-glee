import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import axiosInstance from "../../api/axiosInstance";

function RevenueChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  async function fetchRevenue() {
    try {
      const { data } = await axiosInstance.get("/admin/revenue-chart");

      if (data.success) {
        setChartData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-[420px] animate-pulse rounded-2xl bg-white" />
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monthly revenue generated this year
          </p>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => `₦${value / 1000}k`}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) =>
                `₦${Number(value).toLocaleString()}`
              }
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#C8A96A"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#C8A96A",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;